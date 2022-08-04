import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../api/authService";

function Footer() {
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    alert("logout Success!")
    navigate("/signin");
  }
  const profile = () => {
    navigate("/profile");
  }


  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">

        <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
                <a href ="#" onClick={profile} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">프로필</a>
            </li>
            <li>
                <a href ="#" onClick={logout} className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">로그아웃</a>
            </li>
        </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">Made by <a className="text-blue-600 hover:underline" href="#">Innogrid</a>. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
