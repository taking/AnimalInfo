import React, { useCallback, useState, useEffect } from 'react';
import AuthService from "../api/authService";
import DataService from "../api/dataService";
import "react-datepicker/dist/react-datepicker.css";

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function AdminData() {
	const [rowData, setRowData] = useState();
  const [role, setRole] = useState();
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
  const [reRender, setreRender] = useState(0);    

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
		resizable: true,
    editable: true,
    cellEditorPopup: true,
    flex: 1,
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
			headerName: '데이터 정보',
			children: [
				{ headerName: 'id', field: 'id', width: 100 },
				{ headerName: '사용자', field: 'userId', width: 100 },
				{ headerName: '제공처', field: 'refer'},
				{ headerName: '가격', field: 'price'},
				{ headerName: '데이터 타입', field: 'data_type'},
				{ headerName: '종 ', field: 'species'},
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
                      </div>
                      <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColumnDef}
                        onGridReady={onGridReady}
                        paginationPageSize="10"
                        pagination={true}
                        // rowSelection="multiple"
                        // localeText={{
                        //   filterOoo: 'Filter'
                        // }}
                        enableColResize
                      ></AgGridReact>
                    </div>
                  </fieldset>                                   

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