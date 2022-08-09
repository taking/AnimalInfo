import React from 'react';

import Header from '../partials/Header';
import AdminDataPage from '../partials/AdminData';
import Footer from '../partials/Footer';

function AdminData() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <AdminDataPage />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default AdminData;