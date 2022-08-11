import React from 'react';

import Header from '../partials/Header';
import ProfilePage from '../partials/Profile';
import Footer from '../partials/Footer';

function Profile() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <ProfilePage />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Profile;