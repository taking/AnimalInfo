import React from 'react';

import Header from '../partials/Header';
import AdminUserPage from '../partials/AdminUser';
import Footer from '../partials/Footer';

function AdminUser() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <AdminUserPage />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default AdminUser;