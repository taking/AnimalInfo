import React from 'react';

import Header from '../partials/Header';
import UserDataPage from '../partials/UserData';
import Footer from '../partials/Footer';

function UserData() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <UserDataPage />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default UserData;