import React from 'react';

import Header from '../partials/Header';
import AdminUserList from '../partials/AdminUserList';
import Footer from '../partials/Footer';

function AdminUser() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <AdminUserList />
        
      {/* TODO: Tab 기능 가져다쓰기 */}
        {/* <FeaturesHome /> */}

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default AdminUser;