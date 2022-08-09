import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from "../api/authService";
import PriceService from "../api/priceService";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function AdminPrice() {
  const navigate = useNavigate();
	const [rowData, setRowData] = useState();
	const [currentTime, setCurrentTime] = useState();
	const [lastPrice, setLastPrice] = useState();
  const [role, setRole] = useState();
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
  const [reRender, setreRender] = useState(0);
  const [values, setValues] = useState({}); 
  
  const { register, watch, setValue, getValues, handleSubmit } = useForm();
  // const onSubmit = (data, e) => console.log(data, e);
  const onSubmit = data => {
    if(data.price === '') {
      alert('price 값이 입력되지 않았습니다.');
    } else {
      console.log("data is : ", data);
      
      PriceService.update(data.price).then(
        () => {
          alert("가격 변경 완료")
          window.location.reload();
        },
        error => {
          console.log("response msg : ", error.response);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          alert(resMessage);
        }
      )
    }
  }
  const onError = (errors, e) => console.log(errors, e);
    

  const getPriceData = () => {
    setCurrentTime(moment(new Date()).format("YYYY-MM-DD HH:mm"));
    PriceService.history().then(res => {
      setRowData(res)
    })
    PriceService.last().then(res => {
      setLastPrice(res.price)
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
      getPriceData();
    } else {
      console.log("Not Logined")
    }
  },[reRender]);


	const defaultColumnDef = {
		sortable: true,
		resizable: true,
    // editable: true,
    cellEditorPopup: true,
		// filter: true,
		// floatingFilter: true,
		// floatingFilterComponentParams: {
		// 	suppressFilterButton: true
		// }
	};

	const columnDefs = [
		{
			headerName: '가격 히스토리',
			children: [
				{ headerName: 'id', field: 'id', width: 100 },
				{ headerName: '가격', field: 'price', width: 100 },
				{ headerName: '업데이트일', field: 'updated_at', sort: 'desc' },
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
    gridApi.exportDataAsCsv();
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    // setValues({ ...values, [name]: value });
    setValue(name, value);
  };

  
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* pirce content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">가격 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">관리</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">가격 관리 페이지입니다.</p>
            </div>
          </div>

        {role && (
        <>
          {/* 가격 Div */}
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    
                    {/* 가격 */}
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">Price Management</legend>
                        <p className="text-sm text-gray-500">수정 전 새로고침하여, 최신 데이터로 업데이트 후 진행하세요.</p>
                    </fieldset>  
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">가격</legend>
                              <div className="mt-1">
                                <input
                                  {...register("price")}
                                  type="text"
                                  id="price"
                                  name="price"
                                  defaultValue={lastPrice}
                                  onChange={handleChange}
                                  rows={1}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                        </div>       
                      </div>
                    </fieldset>

                    {/* 현재 시간 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">현재시간</legend>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="currentTime"
                                  name="currentTime"
                                  defaultValue={currentTime}
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
                      수정
                    </button>
                  </div>
                </div>
              </form>
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


        {role && (
        <>
        {/* history content */}
        <div>
          {/* 가격 히스토리 Div */}
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">History View</legend>
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
              </form>
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
    </section>
  );
}

export default AdminPrice;