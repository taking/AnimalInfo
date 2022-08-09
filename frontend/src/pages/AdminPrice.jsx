import React from 'react';

import Header from '../partials/Header';
import AdminPricePage from '../partials/AdminPrice';
import Footer from '../partials/Footer';

function AdminPrice() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <AdminPricePage />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default AdminPrice;