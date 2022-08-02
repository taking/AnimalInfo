import React from 'react';

import Header from '../partials/Header';
import Home from '../partials/Home';
import FeaturesHome from '../partials/Features';
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
        
      {/* TODO: Tab 기능 가져다쓰기 */}
        {/* <FeaturesHome /> */}


      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Index;