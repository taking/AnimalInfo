import React, { useCallback, useState, useEffect } from 'react';
import AuthService from "../api/authService";
import DataService from "../api/dataService";
import "react-datepicker/dist/react-datepicker.css";

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Modal
import Modal from '../utils/Modal';

//css
import "../css/style.css";

function AdminData() {
	const [rowData, setRowData] = useState();
  const [role, setRole] = useState();
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
  const [reRender, setreRender] = useState(0);    
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onDeleteModalAlert = () => {
    setOpenDeleteModal(!openDeleteModal);
  }

  const getData = () => {
    DataService.list().then(res => {
      setRowData(res)
    })
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log("user data : ", user);
    if(user) {
      console.log("user.role is : ", user.role);
      setRole(user.role);
    }
  },[]);

  useEffect(() => {
    if (AuthService.getCurrentUser() != null) {
      getData();
    } else {
      console.log("Not Logined")
    }
  },[]);


	const defaultColumnDef = {
		sortable: true,
		// resizable: true,
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

	const columnDefs = [
    {
      headerName: 'check',
      checkboxSelection: true,
      width: 70,
      cellClass: 'checkCell'
    },
		{
			headerName: '회원 정보',
			children: [
				{ headerName: 'userId', field: 'userId', width: 70 },
				{ headerName: '제공처', field: 'refer', width: 120 },
			]
		},
		{
			headerName: '데이터 정보',
			children: [
				{ headerName: '데이터 번호', field: 'id', width: 100 },
				{ headerName: '단가', field: 'price', width: 80 },
				{ headerName: '데이터 타입', field: 'data_type', width: 100 },
				{ headerName: '종', field: 'species', width: 80 },
				{ headerName: '품종', field: 'dogRace', width: 80 },
				// { headerName: '강아지 품종', field: 'catRace', width: 80 },
				// { headerName: '고양이 품종', field: 'catRace', width: 80 },
				{ headerName: '생성 시간', field: 'created_at', width: 140 },
				{ headerName: 'imageAllFront', field: 'imgAllFront', flex: 1 },
				{ headerName: 'imageAllTop', field: 'imgAllTop', flex: 1 },
			],
		}
	];


  const dataDelete = () => {
    const selectedData = gridApi.getSelectedRows();
    var dataId = "";
    // console.log(selectedData)

    const fileListArr = (selectedData || []).length;
    // console.log("fileListArr is  : ", fileListArr);
    for (let i = 0; i < fileListArr; i++) {
      if (i > 0 && i < fileListArr) {
        dataId += ","
      }
      dataId += '"' + selectedData[i].id + '"';
    }

    // console.log("dataid is ", dataId);
    DataService.delete(dataId);

    setreRender(curr => curr + 1);
    window.location.reload();
  }


	const onGridReady = useCallback((params) => {
		console.log(params);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
		params.api.setDomLayout('autoHeight'); //set full height
		params.api.sizeColumnsToFit();
	}, []);

  const onBtnExport = () => {
    var params = {
        columnKeys: ['userId', 'refer', 'price', 'data_type', 'species']
    };
    gridApi.exportDataAsCsv(params);
  };

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* pirce content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">관리</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">전체 사용자 데이터 관리 페이지입니다.</p>
            </div>
          </div>

        {role && (
        <>
          {/* 가격 히스토리 Div */}
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  
                  <fieldset>
                    <legend className="contents text-base font-bold text-gray-900">Data Management</legend>
                    <div className="ag-theme-balham mt-4" style={{ height: '100%', width: '100%', paddingLeft: 20 }}>
                      <div className="frame">
                      <button className="user-btn btn2" href="#" type="button"  onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBtnExport();}}>CSV Export</button>
                      <button className="data-btn btn2" href="#" type="button"  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenDeleteModal(true);}} aria-controls="DeleteModal">삭제
                      </button>
                      </div>
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColumnDef}
                        onGridReady={onGridReady}
                        paginationPageSize="50"
                        pagination={true}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                        // localeText={{
                        //   filterOoo: 'Filter'
                        // }}
                        enableColResize
                      ></AgGridReact>
                    </div>
                  </fieldset>                                   


                  <Modal id="DeleteModal" ariaLabel="modal-headline" show={openDeleteModal} handleClose={() => onDeleteModalAlert(false)}>
                    <div className="fade h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center w-full h-full outline-none overflow-x-hidden overflow-y-auto inline-block align-middle">
                      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <button onClick={onDeleteModalAlert} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                          <div className="p-6 text-center">
                            <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">정말 해당 데이터를 삭제하시겠습니까?</h3>
                              <button type="button" onClick={dataDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        삭제</button>
                              <button type="button" onClick={onDeleteModalAlert} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">취소</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    </Modal>  


                </div>
              </div>
            </div>
          </div>
        </>
        )}

        {!role && (
        <>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="contents text-base font-bold text-gray-900">권한이 없습니다.</legend>
                  </fieldset>         
                </div>
              </div>
            </div>
          </div>
        </>
        )}      

        </div>
      </div>
    </section>
  );
}

export default AdminData;