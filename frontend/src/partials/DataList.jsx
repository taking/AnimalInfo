import React, { useState } from 'react';
import { render } from "react-dom";

function DataList() {
  const [state, setState] = useState(false);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">목록</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">업로드한 데이터를 보여줍니다</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <legend className="contents text-base font-bold text-gray-900">help</legend>
                    <div className="mt-1">
                      <p>me</p>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DataList;