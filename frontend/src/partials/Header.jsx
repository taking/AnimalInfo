import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../api/authService";
import jwtDecode from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [top, setTop] = useState(true);
  const [role, setRole] = useState();
  const [reRender, setReRender] = useState(false);


  function checkJwtExpired() {
    var currentDate = new Date();
    const token = localStorage.getItem('token');
    // console.log("token is ", token);
    var decodedToken = jwtDecode(token);
    // console.log("decodedToken is ", decodedToken);
    // console.log("expired time : ", decodedToken.exp * 1000);
    // console.log("current time : ", currentDate.getTime());

    if(decodedToken.exp * 1000 < currentDate.getTime()) {
      // console.log("토큰이 만료되었습니다.");
      return true;
    } else {
      // console.log("토큰 인증 완료");
      return false;
    }

  }


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // const currentToken = localStorage.getItem('token');
    
    // const tokenCheck = AuthService.getToken(localStorage.getItem('userId')).then(res => {
    //   // console.log("res is ; ", res);
    //   setDbToken(`"` + res + `"`);
    // })
    
  
    if (!user) {
      console.log("로그인 정보가 없어, signin 페이지로 이동합니다.");
      navigate("/signin");
    }
    if (user) {
      if (user.role) {
        // Admin
        setRole(true);
        // setRole(true);
      } else {
        // User
        setRole(false);
      }
      if (checkJwtExpired()) {
        AuthService.logout();
        navigate("/signin");
      }
    }
    
    // setTimeout(() => {
    //   console.log("######### currentToken : ",currentToken);
    //   console.log("######### DBtoken : ",DbToken);

    //   if(currentToken != undefined && DbToken != undefined) {
    //     if(DbToken != currentToken) {
    //       console.log("중복 로그인으로 인해 재로그인이 필요합니다.");
    //       AuthService.logout();
    //       navigate("/signin");
    //     }
    //   }

    //   }, 100);
  },[]);   

  // let interval;
  // setTimeout(()=>{
  
  //   APiResponse(); // first time zero
  
  //  interval = setInterval(() => {
  //   APiResponse(); // after 30 second
  
  //  } ,  30000);
  // }, 0)

  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const currentToken = localStorage.getItem('token');
    var dbToken = "";
    
    const tokenCheck = AuthService.getToken(localStorage.getItem('userId')).then(res => {
      // console.log("res is ; ", res);
      dbToken = `"` + res + `"`;
    })
    
    
    setTimeout(() => {
      // console.log("######### currentToken : ",currentToken);
      // console.log("######### DBtoken : ",dbToken);

      if(currentToken != undefined && dbToken != undefined) {
        if(dbToken != currentToken) {
          // console.log("중복 로그인으로 인해 재로그인이 필요합니다.");
          AuthService.logout();
          navigate("/signin");
        }
      }

      }, 1000);
  },[]);   

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  


  return (
    <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
              </svg>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              
              {/* TODO: 로그인한 경우 표시 */}
              {role && (
                <>
                <li>
                  <Link to="/" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">업로드</Link>
                </li>
                <li>
                  <Link to="/list" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">목록</Link>
                </li>
                </>
              )}
              { role == 1 && (
                <li>
                  <Link to="/adm/users" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                    <span>관리자</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </Link>
                </li>
              )}
            </ul>

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
