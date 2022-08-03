import React, { useCallback, useState } from 'react';
import { render } from "react-dom";
import { useForm } from "react-hook-form";

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Modal
import Modal from '../utils/Modal';


function DataList() {
	const [rowData, setRowData] = useState();
	const [gridApi, setGridApi] = useState(null);
	const [gridColumnApi, setGridColumnApi] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const onSubmit = data => {
    alert(JSON.stringify(data, undefined, 2));
    console.log(data);
  }
  const onError = (errors, e) => console.log(errors, e);



  // const onEditModalAlert = () => {
  //   setOpenEditModal(!openEditModal);
  // }

  
  const onEditModalAlert = (e = SelectionChangedEvent) => {
    const selectedData = gridApi.getSelectedRows();
    console.log('Selection updated');
    alert(JSON.stringify(selectedData));
  }
  const onDeleteModalAlert = () => {
    setOpenDeleteModal(!openDeleteModal);
  }

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
    {headerName: 'check', checkboxSelection: true, width: 70},
		{
			headerName: '회원 정보',
			children: [
				{ headerName: '회원명', field: 'name', width: 100, selection: true },
				{ headerName: '이메일', field: 'email', width: 170 },
				{ headerName: '제공처', field: 'refer', width: 170 },
			]
		},
		{
			headerName: '데이터 정보',
			children: [
				{ headerName: '데이터 번호', field: 'dataNum', width: 100 },
				{ headerName: '단가', field: 'money', width: 110 },
				{ headerName: '생성 시간', field: 'created_at', width: 140 },
				{ headerName: '수정 시간', field: 'updated_at', width: 140 },
        {
          headerName: "액션",
          field: "button",
          cellRendererFramework:(params)=>
            <div>
              <a href="#" type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenEditModal(true); }}
                aria-controls="EditModal">수정</a>
              <a> | </a>
              <a href="#" type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenDeleteModal(true); }}
                aria-controls="DeleteModal">삭제</a>
            </div>
        , width: 100 },
			],
		}
	];

  const rowData2 = [
    {
      name: "박형탁",
      refer: "건국대학교 동물병원",
      email: "consine2c@innogrid.com",
      dataNum: Math.floor(Math.random() * 30),
      money: Math.floor(Math.random() * 3000) + " 원",
      created_at: "2022-08-01 14:00",
      updated_at: "2022-08-01 15:00",
      button: true
    },
    {
      name: "박형탁",
      refer: "건국대학교 동물병원",
      email: "consine2c@innogrid.com",
      dataNum: Math.floor(Math.random() * 30),
      money: Math.floor(Math.random() * 3000) + " 원",
      created_at: "2022-08-01 15:00",
      updated_at: "-",
      button: true
    },
    {
      name: "김승한",
      refer: "건국대학교 동물병원",
      email: "consine2c@innogrid.com",
      dataNum: Math.floor(Math.random() * 30),
      money: Math.floor(Math.random() * 3000) + " 원",
      created_at: "2022-08-01 14:00",
      updated_at: "2022-08-01 15:00",
      button: true
    },
  ]

	// const onButtonClick = (e) => {
	// 	const selectedNodes = gridApi.getSelectedNodes();
	// 	const selectedData = selectedNodes.map((node) => node.data);
	// 	const selectedDataStringPresentation = selectedData
	// 		.map((node) => node.firstName + ' ' + node.lastName)
	// 		.join(', ');
	// 	alert(`Selected nodes: ${selectedDataStringPresentation}`);
	// };

  const getAllRows = (e) => {
    let rowData = [];
    gridApi.forEachNode(node => rowData.push(node.data));
    alert(JSON.stringify(rowData));
  }

  const getSelectedRowData = (e) => {
    const selectedData = gridApi.getSelectedRows();
    alert(JSON.stringify(selectedData));
  }

	const onGridReady = useCallback((params) => {
		console.log(params);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
		params.api.setDomLayout('autoHeight'); //set full height
		params.api.sizeColumnsToFit();
    setRowData(rowData2);

    // fetch('http://local:8888/api/accounts')
    // .then((result) => result.json())
    // .then((data) => setRowData(data));

		// Array.from(document.querySelectorAll('.ag-floating-filter-input input[type=text]')).forEach(
		// 	(obj) => {
		// 		if (obj.attributes['disabled']) {
		// 			// skip columns with disabled filter
		// 			return;
		// 		}
		// 		obj.setAttribute('placeholder', 'Search..');
		// 	}
		// );
	}, []);



  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">목록</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">업로드한 데이터를 보여줍니다</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="contents text-base font-bold text-gray-900">데이터 목록</legend>
                  </fieldset>
                  <fieldset>
                    <div className="ag-theme-balham mt-4" style={{ height: '100%', width: '100%', paddingLeft: 20 }}>
                      <button onClick={getSelectedRowData} style={{ marginBottom: '5px' }}>
                        Get selected rows
                      </button>
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
{/*                     
                  <Modal id="EditModal" ariaLabel="modal-headline" show={openEditModal} handleClose={() => onEditModalAlert(false)} >
                      <div className="fade h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70 text-center w-full h-full outline-none overflow-x-hidden overflow-y-auto">
                      <div className="modal-content bg-white rounded w-10/12 md:w-1/3">
                          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                              <h5 className="text-xl font-medium leading-normal text-gray-800">
                                  데이터 수정
                              </h5>
                              <button type="button" onClick={onEditModalAlert} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                          </div>
                          <div className="modal-body relative p-4">

                          <form onSubmit={handleSubmit(onSubmit, onError)}>  
                          <fieldset>
                              <div className="grid gap-6 mb-6 md:grid-cols-2">
                                <div>
                                <legend className="contents mb-2 text-base font-medium text-gray-900">제공처</legend>
                                  <div className="mt-1">
                                    <input
                                      {...register("refer", { required: true })}
                                      type="text"
                                      id="refer"
                                      name="refer"
                                      rows={1}
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                      placeholder="제공처를 입력하세요"
                                      defaultValue={''}
                                      required
                                    />
                                  </div>
                                </div>
                                <div>
                                <legend className="contents text-base font-medium text-gray-900">제공처</legend>
                                  <div className="mt-1">
                                    <input
                                      {...register("refer", { required: true })}
                                      type="text"
                                      id="refer"
                                      name="refer"
                                      rows={1}
                                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                      placeholder="제공처를 입력하세요"
                                      defaultValue={''}
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                          </fieldset>
                              <div className="mb-6">
                                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                  <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required="">
                                  </input>
                              </div> 
                              <div className="mb-6">
                                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                  <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required="">
                                  </input>
                              </div> 
                              <div className="mb-6">
                                  <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
                                  <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required="">
                                  </input>
                              </div>
                          </form>
                          </div>
                          <div className="modal-footer flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">수정</button>
                              <button type="button" onClick={onEditModalAlert} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">취소</button>
                          </div>
                      </div>
                  </div>
                      </Modal> */}

                  <Modal id="EditModal" ariaLabel="modal-headline" show={openEditModal} handleClose={() => onEditModalAlert(false)} ></Modal>
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
                                  <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                      삭제
                                  </button>
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
        </div>

      </div>
    </section>
  );
}

export default DataList;