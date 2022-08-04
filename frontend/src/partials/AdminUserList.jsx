import React, { useCallback, useState, useEffect } from 'react';
import { render } from "react-dom";
import { useForm } from "react-hook-form";

// AgGrid
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Modal
import Modal from '../utils/Modal';

// Service
import UserService from "../api/userService";


function AdminUserList() {
	const [rowData, setRowData] = useState();
	const [rowData2, setRowData2] = useState({});
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

  const importData = () => {
    setRowData2(UserService.userList());
    // const rowData2 = UserService.userList();
    // setMyProfile({
    //   name: myData.name,
    //   email: myData.email,
    //   contact: myData.contact,
    //   refer: myData.refer,
    //   created_at: myData.created_at
    // });
  }

  useEffect(() => {
    importData();
    // if (UserService.userList() != null) {
    // } else {
    //   console.log("user not found")
    // }
  },[]);


  const onEditModalAlert = () => {
    setOpenEditModal(!openEditModal);
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

	const onButtonClick = (e) => {
		const selectedNodes = gridApi.getSelectedNodes();
		const selectedData = selectedNodes.map((node) => node.data);
		const selectedDataStringPresentation = selectedData
			.map((node) => node.firstName + ' ' + node.lastName)
			.join(', ');
		alert(`Selected nodes: ${selectedDataStringPresentation}`);
	};

	const onGridReady = useCallback((params) => {
		console.log(params);
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
		params.api.setDomLayout('autoHeight'); //set full height
		params.api.sizeColumnsToFit();

    console.log("######### : ", rowData2);
    // setRowData2(UserService.userList());
    alert(JSON.stringify(rowData2));
    // const test = UserService.userList();
    // alert(JSON.stringify(UserService.userList()));
    // setRowData(JSON.stringify(UserService.userList()));




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
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">사용자 관리 페이지입니다.</p>
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
                      {/* <button onClick={onButtonClick} style={{ marginBottom: '5px' }}>
                        Get selected rows
                      </button> */}
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