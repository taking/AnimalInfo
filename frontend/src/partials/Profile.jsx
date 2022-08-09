import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { useForm } from "react-hook-form";
import AuthService from "../api/authService";
import UserService from "../api/userService";
import "react-datepicker/dist/react-datepicker.css";

function ProfilePage() {
  const { register, handleSubmit } = useForm();
  // const onSubmit = (data, e) => console.log(data, e);
  const onSubmit = data => {
    // alert(JSON.stringify(data, undefined, 2));
    alert('작업 중');
    console.log(data);
  }
  const onError = (errors, e) => console.log(errors, e);
  
  const importData = () => {
    const myData = AuthService.getCurrentUser();
    setMyProfile({
      name: myData.name,
      email: myData.email,
      contact: myData.contact,
      refer: myData.refer,
      created_at: myData.created_at
    });
  }

  useEffect(() => {
    if (AuthService.getCurrentUser() != null) {
      importData();
    } else {
      console.log("Not Logined")
    }
  },[]);

  const [myProfile, setMyProfile] = useState({ name: "", email: "", contact: "", refer: "", created_at: "" }); 
  const [values, setValues] = useState({ name: "" }); 

  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">마이 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">페이지</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">내 정보를 확인해보세요</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">


                    {/* 이름 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">이름</legend>
                              <div className="mt-1">
                                <input
                                  {...register( "name", { required: true })}
                                  type="text"
                                  id="name"
                                  name="name"
                                  defaultValue={myProfile.name}
                                  rows={1}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                        </div>       
                      </div>
                    </fieldset>


                    {/* 이메일 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">이메일</legend>
                              <div className="mt-1">
                                <input
                                  {...register( "email", { required: true })}
                                  type="text"
                                  id="email"
                                  name="email"
                                  defaultValue={myProfile.email}
                                  rows={1}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                        </div>       
                      </div>
                    </fieldset>

                    {/* 연락처 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">연락처</legend>
                              <div className="mt-1">
                                <input
                                  {...register( "contact", { required: true })}
                                  type="text"
                                  id="contact"
                                  name="contact"
                                  defaultValue={myProfile.contact}
                                  rows={1}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                        </div>       
                      </div>
                    </fieldset>

                    {/* 제공처 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">제공처</legend>
                              <div className="mt-1">
                                <input
                                  {...register( "refer", { required: true })}
                                  type="text"
                                  id="refer"
                                  name="refer"
                                  defaultValue={myProfile.refer}
                                  rows={1}
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  required
                                />
                              </div>
                        </div>       
                      </div>
                    </fieldset>        

                    {/* 가입일 */}
                    <fieldset>
                      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                            <legend className="contents text-base font-bold text-gray-900">가입일</legend>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="created_at"
                                  name="created_at"
                                  defaultValue={myProfile.created_at}
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
        </div>

      </div>
    </section>
  );
}

export default ProfilePage;