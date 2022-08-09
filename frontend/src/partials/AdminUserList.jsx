import React, { useCallback, useState, useEffect } from 'react';

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Service
import UserService from "../api/userService";


function AdminUserList() {
	const [rowData, setrowData] = useState();
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
  // const [openEnabledModal, setOpenEnabledModal] = useState(false)
  const [reRender, setreRender] = useState(0);

  const importData = () => {
    UserService.userList().then(res => {
      setrowData(res)
   })
  }

  useEffect(() => {
    importData();
  },[reRender]);


  const userenable = () => {
    const selectedData = gridApi.getSelectedRows();
    console.log(selectedData)
    
    UserService.enabled(selectedData[0].id)

    setreRender(curr => curr + 1);
  }

  // 활성화/비활성화 팝업
  // const onEnabledModalAlert = () => {
  //   const selectedData = gridApi.getSelectedRows();
  //   document.querySelector('#selectedRowsId').innerHTML =
  //   selectedData.length === 1 ? selectedData[0].id : '';
  //   document.querySelector('#selectedRowsName').innerHTML =
  //   selectedData.length === 1 ? selectedData[0].name : '';
  //   setOpenEnabledModal(!openEnabledModal);
  // }
  // const closeEnabledModalAlert = () => {
  //   setOpenEnabledModal(!openEnabledModal);
  // }

	const defaultColumnDef = {
		sortable: true,
		resizable: true,
    editable: true,
    cellEditorPopup: true,
		// filter: true,
		// floatingFilter: true,
		// floatingFilterComponentParams: {
		// 	suppressFilterButton: true
		// }
	};

	const columnDefs = [
    {headerName: 'check', checkboxSelection: true, width: 70, cellClass: 'checkCell'},
		{
			headerName: '회원 정보',
			children: [
				{ headerName: 'userID', field: 'id' },
				{ headerName: '회원명', field: 'name' },
				{ headerName: '이메일', field: 'email' },
				{ headerName: '연락처', field: 'contact' },
				{ headerName: '제공처', field: 'refer' },
				{ headerName: '권한', field: 'role' },
				{ headerName: '활성여부', field: 'enabled' },
				{ headerName: '생성일', field: 'created_at' },
			]
		}
	];

	const onGridReady = useCallback((params) => {
		console.log(params);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
		params.api.setDomLayout('autoHeight'); //set full height
		params.api.sizeColumnsToFit();
	}, []);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">사용자 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">목록</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">사용자 관리 페이지입니다.</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="contents text-base font-bold text-gray-900">사용자 목록</legend>
                  </fieldset>                                   
                  <fieldset>
                    <div className="ag-theme-balham mt-4" style={{ height: '100%', width: '100%', paddingLeft: 20 }}>
                    <div className="frame">
                        <button className="user-btn btn2" href="#" type="button"  onClick={(e) => { e.preventDefault(); e.stopPropagation(); userenable();}}>활성화 / 비활성화
                        </button>
                      </div>
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColumnDef}
                        onGridReady={onGridReady}
                        // rowSelection="multiple"
                        // localeText={{
                        //   filterOoo: 'Filter'
                        // }}
                        enableColResize
                      ></AgGridReact>
                    </div>

                  </fieldset>
                  {/* <Modal id="UserModal" ariaLabel="modal-headline" show={openEnabledModal} handleClose={() => onEnabledModalAlert(false)}>
                      <div className="fade h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center w-full h-full outline-none overflow-x-hidden overflow-y-auto">
                      <div className="modal-content bg-white rounded w-10/12 md:w-1/3">
                          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                              <h5 className="userModal">
                                선택한 회원의 ID는 "
                                  <span id="selectedRowsId">
                                  </span>
                                "이며,<br/> 회원명은 "
                                <span id="selectedRowsName">
                                  </span>
                                " 입니다.
                              </h5>
                              <button type="button" onClick={closeEnabledModalAlert} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                          </div>                          
                          <div className="updateData"> */}
                                {/* {updateData} */}
                          {/* </div>
                          <div className="modal-footer flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                              <button type="submit" onClick={onEnabledModalAlert} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">수정</button>
                              <button type="button" onClick={closeEnabledModalAlert} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">취소</button>
                          </div>
                      </div>
                  </div>
                      </Modal> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AdminUserList;