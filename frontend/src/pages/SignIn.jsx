import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthService from "../api/authService";

function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  
  
  function onSubmit(e) {
    // alert(JSON.stringify(e, undefined, 2));
    console.log("[Form Value]: ", e);
    AuthService.login(e.email, e.password).then(
      () => {
        if (AuthService.getCurrentUser().enabled === 0) {
          alert("비활성 계정입니다. 관리자에게 문의하세요.");
        } else {
          alert("Login Success!");
          navigate("/");
        }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage);
      }
    )}
  const onError = (errors, e) => console.log(errors, e);
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Animalinfo <br />Login</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">이메일</label>
                      <input
                        {...register("email", { required: true })}
                        id="email" type="email" className="form-input w-full text-gray-800" placeholder="이메일을 입력하세요" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">비밀번호</label>
                      </div>
                      <input
                        {...register("password", { required: true })}

                        id="password" type="password" className="form-input w-full text-gray-800" placeholder="비밀번호를 입력하세요" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">로그인 유지</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">로그인</button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                </div>
                <div className="text-gray-600 text-center mt-6">
                  계정이 없으신가요? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">회원가입</Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

    </div>
  );
}

export default SignIn;