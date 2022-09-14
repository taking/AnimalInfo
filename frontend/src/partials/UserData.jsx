import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthService from "../api/authService";
import moment from "moment";

// AgGrid
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Service
import DataService from "../api/dataService";

// Modal
import Modal from "../utils/Modal";

//css
import "../css/style.css";

function UserDataList() {
  const [userId, setUserId] = useState();
  const [rowData, setRowData] = useState();
  const [currentTime, setCurrentTime] = useState("");
  const initTime = moment(new Date()).format("YYYY-MM");
  const [dateTime, setDateTime] = useState("");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [updateData, setupdateData] = useState();
  const [reRender, setreRender] = useState(0);

  const { register, handleSubmit, watch, setValue, getValues } = useForm();

  const onSubmit = data => {
    if (data.time === "") {
      alert("time 값이 입력되지 않았습니다.");
    } else {
      console.log("data is : ", data);
      console.log("data.time is : ", data.time);

      // const user = AuthService.getCurrentUser();

      setCurrentTime(data.time);
      setreRender(curr => curr + 1);
      redrawAllRows();

      // DataService.listId(user.id, data.time).then(res => {
      //   setRowData(res);
      //   redrawAllRows();
      // });

      // DataService.checkPrice(user.id, data.time).then(res => {
      //   setValue("totalPrice", res);
      // });

      // setCurrentTime = data.time;

      // PriceService.update(data.price).then(
      //   () => {
      //     alert("가격 변경 완료");
      //     window.location.reload();
      //   },
      //   error => {
      //     console.log("response msg : ", error.response);
      //     const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      //     alert(resMessage);
      //   },
      // );
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  const importData = (userId, time) => {
    DataService.listId(userId, time).then(res => {
      if (res != "notfound") {
        setRowData(res);
      } else {
        noRows();
      }
    });

    DataService.checkPrice(userId, time).then(res => {
      setValue("totalCount", res.count);
      setValue("totalPrice", res.totalPrice);
    });
  };

  useEffect(() => {
    if (AuthService.getCurrentUser() != null) {
      const user = AuthService.getCurrentUser();

      console.log("currentTime is : ", currentTime);
      console.log("initTime is : ", initTime);

      if (currentTime == "") {
        importData(user.id, initTime);
      } else {
        importData(user.id, currentTime);
      }
    } else {
      console.log("Not Logined");
    }
  }, [reRender]);

  const updateClick = () => {
    const selectedData = gridApi.getSelectedRows();
    console.log("[#Update Data] is " + JSON.stringify(selectedData));
    const jsonselectedData = JSON.stringify(selectedData);

    console.log("selectedData id ", selectedData[0].id)
    console.log("selectedData data ", selectedData[0])

    DataService.update(selectedData[0].id, selectedData[0]).then(
        () => {
          alert("업데이트 완료");
          setupdateData(jsonselectedData);
          setOpenEditModal(false);
          // window.location.reload();
        },
        error => {
          console.log("response msg : ", error.response);
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          alert(resMessage);
        },
      );
  };

  const closeEditModalAlert = () => {
    setOpenEditModal(!openEditModal);
  };

  const onDeleteModalAlert = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const defaultColumnDef = {
    sortable: true,
    resizable: true,
    editable: true,
    cellEditorPopup: true,
    suppressSizeToFit: true,
    // flex: 1,
    // filter: true,
    // floatingFilter: true,
    // floatingFilterComponentParams: {
    // 	suppressFilterButton: true
    // }
  };

  // const totalPrice = value => {
  //   console.log("value is :", value);
  //   var sum = 0;
  //   value.forEach(function (value) {
  //     sum += Number(value);
  //   });
  //   console.log("sum is :", sum);
  // };

  const columnDefs = [
    { headerName: "check", checkboxSelection: true, width: 70, cellClass: "checkCell" },
    {
      headerName: "데이터 번호",
      field: "id",
      width: 110,
    },
    {
      headerName: "수집 데이터 제공처",
      field: "refer",
      width: 110,
    },
    {
      headerName: "단가",
      field: "price",
      width: 110,
      editable: false,
    },
    {
      headerName: "데이터 타입",
      field: "data_type",
      width: 110,
    },
    {
      headerName: "종",
      field: "species",
      width: 110,
    },
    {
      headerName: "품종",
      field: "race",
      width: 110,
    },
    {
      headerName: "생년월일",
      field: "birth",
      width: 110,
    },
    {
      headerName: "성별",
      field: "sex",
      width: 110,
    },
    {
      headerName: "체중",
      field: "weight",
      width: 110,
    },
    {
      headerName: "견갑부 높이",
      field: "shoulderHeight",
      width: 110,
    },
    {
      headerName: "목둘레",
      field: "neckSize",
      width: 110,
    },
    {
      headerName: "등허리 길이",
      field: "backLength",
      width: 110,
    },
    {
      headerName: "흉곽둘레",
      field: "chestSize",
      width: 110,
    },
    {
      headerName: "신체 충실 지수",
      field: "BCS",
      width: 110,
    },
    {
      headerName: "운동강도",
      field: "exercise",
      width: 110,
    },
    {
      headerName: "생활 환경",
      field: "environment",
      width: 110,
    },
    {
      headerName: "배변 상태",
      field: "defecation",
      width: 110,
    },
    {
      headerName: "식이 횟수",
      field: "foodCount",
      width: 110,
    },
    {
      headerName: "식사량",
      field: "foodAmount",
      width: 110,
    },
    {
      headerName: "식이간식량",
      field: "snackAmount",
      width: 110,
    },
    {
      headerName: "식사 종류",
      field: "foodKind",
      width: 110,
    },
    {
      headerName: "질병유무",
      field: "disease",
      width: 110,
    },
    {
      headerName: "질병명",
      field: "diseaseName",
      width: 110,
    },
    {
      headerName: "C-반응성 단백질",
      field: "CPR",
      width: 110,
    },
    {
      headerName: "면역글로블린 G",
      field: "lgG",
      width: 110,
    },
    {
      headerName: "인터류킨-6",
      field: "IL6",
      width: 110,
    },
    {
      headerName: "알파 태아 단백질",
      field: "AFP",
      width: 110,
    },
    {
      headerName: "심박수",
      field: "heartRate",
      width: 110,
    },
    {
      headerName: "호흡수",
      field: "breatingRate",
      width: 110,
    },
    {
      headerName: "체온",
      field: "bodyHeat",
      width: 110,
    },
    {
      headerName: "스트레스 지수",
      field: "stress",
      width: 110,
    },
    {
      headerName: "생성 시간",
      field: "created_at",
      width: 110,
      editable: false,
    },
  ];

  const getAllRows = e => {
    let rowData = [];
    gridApi.forEachNode(node => rowData.push(node.data));
    alert(JSON.stringify(rowData));
  };

  const redrawAllRows = () => {
    gridApi.redrawRows();
  };

  
  const dataDelete = () => {
    const selectedData = gridApi.getSelectedRows();
    var dataId = "";
    // console.log(selectedData)

    const fileListArr = (selectedData || []).length;
    // console.log("fileListArr is  : ", fileListArr);
    for (let i = 0; i < fileListArr; i++) {
      if (i > 0 && i < fileListArr) {
        dataId += ",";
      }
      dataId += '"' + selectedData[i].id + '"';
    }

    // console.log("dataid is ", dataId);
    DataService.delete(dataId);

    setreRender(curr => curr + 1);
    // window.location.reload();
  };

  const onGridReady = useCallback(params => {
    console.log(params);
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.setDomLayout("autoHeight"); //set full height
  }, []);

  const onFilterTextBoxChanged = () => {
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  const onBtnExport = () => {
    var params = {
      columnKeys: ["userId", "refer", "price", "data_type", "species"],
    };
    gridApi.exportDataAsCsv(params);
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">목록</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                업로드한 데이터를 보여줍니다
              </p>
            </div>
          </div>

          <div>
            {/* 정산 Div */}
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      {/* 정산 */}
                      <fieldset>
                        <legend className="contents text-base font-bold text-gray-900">Total Price</legend>
                        <p className="text-sm text-gray-500">현재 업로드한 데이터의 총 개수와 단가에 따른 예상 정산 가격을 표시합니다.</p>
                      </fieldset>

                      {/* 현재 시간 */}
                      <fieldset>
                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">날짜 설정 (YYYY-MM)</legend>
                            <div className="mt-1">
                              <input
                                {...register("time", { required: true })}
                                type="text"
                                // id="filter-text-box"
                                id="time"
                                name="time"
                                defaultValue={initTime}
                                values={currentTime}
                                // onInput={() => onFilterTextBoxChanged()}
                                rows={1}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset>
                        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">총 개수</legend>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="count"
                                name="count"
                                defaultValue={watch("totalCount")}
                                // values={getValues("totalCount")}
                                rows={1}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">정산 예상 금액</legend>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="totalPrice"
                                name="totalPrice"
                                defaultValue={watch("totalPrice")}
                                rows={1}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <br />

          {/* dataList content */}
          <div>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">데이터 목록</legend>
                      <p className="text-sm text-gray-500">표 안 데이터를 더블클릭하여 값 변경이 가능하며 체크박스 체크 후 수정하실 수 있습니다. ※단가는 수정할 수 없습니다.
                       </p>
                    </fieldset>

                    {watch("totalCount") != "0" && (
                      <>
                        <fieldset>
                          <div className="ag-theme-balham mt-4" style={{ height: "100%", width: "100%", paddingLeft: 20 }}>
                            <div className="frame">
                              <button
                                className="data-btn btn2"
                                href="#"
                                type="button"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setOpenEditModal(true);
                                }}
                                aria-controls="EditModal"
                              >
                                수정
                              </button>
                              <button
                                className="data-btn btn2"
                                href="#"
                                type="button"
                                onClick={e => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setOpenDeleteModal(true);
                                }}
                                aria-controls="DeleteModal"
                              >
                                삭제
                              </button>
                              {/* <button className="user-btn btn2" href="#" type="button"  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBtnExport();}}>CSV Export
                        </button> */}
                            </div>
                            <AgGridReact
                              rowData={rowData}
                              columnDefs={columnDefs}
                              defaultColDef={defaultColumnDef}
                              onGridReady={onGridReady}
                              paginationPageSize="50"
                              pagination={true}
                              cacheQuickFilter={true}
                              rowSelection="multiple"
                              rowMultiSelectWithClick={true}
                              // localeText={{
                              //   filterOoo: 'Filter'
                              // }}
                              enableColResize
                            ></AgGridReact>
                          </div>
                        </fieldset>
                      </>
                    )}

                    {watch("totalCount") == "0" && (
                      <>
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">데이터가 없습니다.</legend>
                        </fieldset>
                      </>
                    )}

                    <Modal id="EditModal" ariaLabel="modal-headline" show={openEditModal} handleClose={() => onEditModalAlert(false)}>
                      <div className="fade h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center w-full h-full outline-none overflow-x-hidden overflow-y-auto inline-block align-middle">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                              type="button"
                              onClick={closeEditModalAlert}
                              // className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          <div className="p-6 text-center">
                          <svg
                                aria-hidden="true"
                                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                          <h5 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">선택된 데이터를 수정하시겠습니까?</h5>
                          {/* <div className="updateData">{updateData}</div> */}
                          {/* <div className="modal-footer flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"> */}
                            <button
                              type="submit"
                              onClick={updateClick}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              onClick={closeEditModalAlert}
                              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                              취소
                            </button>
                          </div>
                         </div>
                        </div>
                      </div>
                    </Modal>

                    <Modal id="DeleteModal" ariaLabel="modal-headline" show={openDeleteModal} handleClose={() => onDeleteModalAlert(false)}>
                      <div className="fade h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center w-full h-full outline-none overflow-x-hidden overflow-y-auto inline-block align-middle">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                              onClick={onDeleteModalAlert}
                              type="button"
                              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                              <svg
                                aria-hidden="true"
                                className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">정말 해당 데이터를 삭제하시겠습니까?</h3>
                              <button
                                type="button"
                                onClick={dataDelete}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-6 py-2.5 text-center mr-2"
                              >
                                삭제
                              </button>
                              <button
                                type="button"
                                onClick={onDeleteModalAlert}
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDataList;
