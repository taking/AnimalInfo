import React from 'react';

import Header from '../partials/Header';
import Home from '../partials/Home';
import Footer from '../partials/Footer';

function Index() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <Home />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Index;