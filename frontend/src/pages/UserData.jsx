import React from 'react';

import Header from '../partials/Header';
import UserDataList from '../partials/UserDataList';
import Footer from '../partials/Footer';

function UserData() {

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <UserDataList />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default UserData;