import React, { useState } from 'react';
import { render } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { Listbox, RadioGroup, Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from '../utils/Modal';

import HeroImage from '../images/hero-image.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Home() {
  // const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm();
  // const onSubmit = (data, e) => console.log(data, e);
  const onSubmit = data => {
    alert(JSON.stringify(data, undefined, 2));
    console.log(data);
  }
  const onError = (errors, e) => console.log(errors, e);

  const [dataTypes, setDatatypes] = useState(false);
  const [species, setSpecies] = useState(false);
  const [selectDogs, setSelectDogs] = useState("")
  const [selectCats, setSelectCats] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const dateReceived = watch("birth");

  const selectbox = {
    dogs: [
      { id: 1, name: '불로그', unavailable: true },
      { id: 2, name: '저먼 셰퍼드', unavailable: true },
      { id: 3, name: '래브라도 리트리버', unavailable: true },
      { id: 4, name: '골든 리트리버', unavailable: true },
      { id: 5, name: '푸들', unavailable: true },
      { id: 6, name: '시베리안 허스키', unavailable: true },
      { id: 7, name: '포메라니안', unavailable: true },
      { id: 8, name: '프렌치 불도그', unavailable: true },
    ],
    cats: [
      { id: 1, name: '페르시안', unavailable: true },
      { id: 2, name: '메인쿤', unavailable: true },
      { id: 3, name: '브리티시 쇼트헤어', unavailable: true },
      { id: 4, name: '뱅갈 고양이', unavailable: true },
      { id: 5, name: '샴고양이', unavailable: true },
      { id: 6, name: '스핑크스', unavailable: true },
      { id: 7, name: '랙돌', unavailable: true },
    ],
    sex: [
      { id: 1, fullname: 'IM(수컷)', name: 'IM', unavailable: true },
      { id: 2, fullname: 'IF(암컷)', name: 'IF', unavailable: true },
      { id: 3, fullname: 'CM(증성화수컷)', name: 'CM', unavailable: true },
      { id: 4, fullname: 'SF(중성화암컷)', name: 'SF', unavailable: true },
    ],
    menu: [
      { type: "number", en: "weight", ko: "체중", subtitle: "text", place: "체중을 입력하세요" },
      { type: "number", en: "shoulderHeight", ko: "견갑부 높이", subtitle: "text", place: "견갑부 높이를 입력하세요" },
      { type: "number", en: "neckSize", ko: "목둘레", subtitle: "text", place: "목둘레를 입력하세요" },
      { type: "number", en: "backLength", ko: "등허리 길이", subtitle: "text", place: "등허리 길이를 입력하세요" },
      { type: "number", en: "chestSize", ko: "흉곽둘레", subtitle: "text", place: "흉곽둘레를 입력하세요" },      
      { type: "number", en: "BCS", ko: "신체 충실 지수", subtitle: "text", place: "신체 충실 지수를 입력하세요" },      
      { type: "number", en: "exercise", ko: "운동강도", subtitle: "text", place: "운동강도를 입력하세요" },
      { type: "number", en: "foodCount", ko: "생활 환경", subtitle: "text", place: "생활 환경을 입력하세요" },
      { type: "number", en: "environment", ko: "배변 상태", subtitle: "text", place: "배변상태를 입력하세요" },
      { type: "number", en: "defecation", ko: "식이 횟수", subtitle: "text", place: "식이 횟수를 입력하세요" },
      { type: "number", en: "foodAmount", ko: "식사량", subtitle: "text", place: "식사량을 입력하세요" },
      { type: "number", en: "snackAmount", ko: "식이간식량", subtitle: "text", place: "식이간식량을 입력하세요" },
      { type: "number", en: "foodKind", ko: "식사 종류", subtitle: "text", place: "식사 종류를 입력하세요" },
      { type: "text", en: "disease", ko: "질병유무", subtitle: "text", place: "질병유무를 입력하세요" },
      { type: "text", en: "diseaseName", ko: "질병명", subtitle: "text", place: "질병명을 입력하세요" },
      { type: "number", en: "foodKind", ko: "식사 종류", subtitle: "text", place: "식사 종류를 입력하세요" },
    ],
    file: [
      { en: "imgAllFront", ko: "전신-전면" },
      { en: "imgAllTop", ko: "전신-윗면" },
      { en: "imgAllLeft", ko: "전신-좌측" },
      { en: "imgAllRight", ko: "전신-우측" },
      { en: "imgAllBack", ko: "전신-후면" },
      { en: "imgHeadFront", ko: "두상-후면" },
      { en: "imgHeadTop", ko: "두상-윗면" },
      { en: "imgHeadLeft", ko: "두상-좌측" },
      { en: "imgHeadRight", ko: "두상-우측" },
      { en: "imgHeadBottom", ko: "두상-하위측" },
      { en: "imgNoseFront", ko: "비문-전면" },
    ]
  }

  
  const [values, setValues] = useState({ refer: "", dataTypes: "", species: "" }); 

  const handleChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  // const handleSubmit = async (event) => {
  //   console.log("event is ", event)
  //   event.preventDefault();
  //   // return fetch('http://localhost:8000/api/Data/', {
  //   //   method: 'POST',
  //   //   headers: {
  //   //   'Accept': 'application/json',
  //   //   'Content-Type': 'application/json'
  //   //   },
  //   await new Promise((r) => setTimeout(r, 1000));
  //   body: JSON.stringify({
  //       title: this.state.itemtitle,
  //       tag:[
  //         {name:this.state.tagtitle,
  //         taglevel:this.state.taglevel}
  //        ],
  //       info:[]
  //    })
  //   console.log("event is ", event.state.refer)
  //   alert(JSON.stringify(body, null, 2));
  // };

  function onChangeDogBreed(e) {
    console.log(e);
    setSelectDogs(e);
    setValue("breed", e);
  }

  function onChangeCatBreed(e) {
    console.log(e);
    setSelectCats(e);
    setValue("breed", e);
  }

  function onChangeBirth(e) {
    console.log(e);
    setStartDate(e);
    setValue("birth", e);
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">업로드</span></h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">다음 폼에 맞춰 정보를 입력하세요</p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">제공처</legend>
                      {/* <div className="mt-1" onChange={handleChange}> */}
                      <div className="mt-1">
                        <textarea
                          {...register("refer", { required: true })}
                          id="refer"
                          name="refer"
                          rows={1}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="제공처를 입력하세요"
                          defaultValue={''}
                          required
                        />
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">데이터 타입</legend>
                      {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              {...register("dataTypes", { required: true })}
                              id="A"
                              value="A"
                              name="dataTypes"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="A" className="font-medium text-gray-700">
                              A 타입
                            </label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              {...register("dataTypes", { required: true })}
                              id="B"
                              value="B"
                              name="dataTypes"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="B" className="font-medium text-gray-700">
                              B 타입
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">종별구분</legend>
                      {/* <p className="text-sm text-gray-500">Text</p> */}
                      {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              {...register("species", { required: true })}
                              id="dog"
                              value="dog"
                              name="species"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="dog" className="font-medium text-gray-700">
                              반려견
                            </label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              {...register("species", { required: true })}
                              id="cat"
                              value="cat"
                              name="species"
                              type="radio"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="cat" className="font-medium text-gray-700">
                              반려묘
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>


                    
                    {watch('species') == "dog" && (
                      <>
                      <fieldset>
                          <legend className="contents text-base font-medium text-gray-900">반려견 품종</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}

                            {/* <RadioGroup value={selectDogs} onChange={onChangeDogBreed} className="mt-4"> */}

                            <RadioGroup value={selectDogs} onChange={onChangeDogBreed} className="mt-4">
                              {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                              <div className="grid grid-cols-4 gap-4">
                                {selectbox.dogs.map((breed) => (
                                  <RadioGroup.Option
                                    key={breed.id}
                                    value={breed.name}
                                    disabled={!breed.unavailable}
                                    className={({ active }) =>
                                      classNames(
                                        breed.unavailable
                                          ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                          : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="span">{breed.name}</RadioGroup.Label>
                                        {breed.unavailable ? (
                                          <span
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked ? 'border-indigo-500' : 'border-transparent',
                                              'absolute -inset-px rounded-md pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <span
                                            aria-hidden="true"
                                            className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                          >
                                            <svg
                                              className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                      </fieldset>
                      </>
                    )}

                    
                    {watch('species') == "cat" && (
                      <>
                      <fieldset>
                          <legend className="contents text-base font-medium text-gray-900">반려묘 품종</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}

                            {/* <RadioGroup value={selectDogs} onChange={onChangeDogBreed} className="mt-4"> */}

                            <RadioGroup value={selectCats} onChange={onChangeCatBreed} className="mt-4">
                              {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                              <div className="grid grid-cols-4 gap-4">
                                {selectbox.cats.map((breed) => (
                                  <RadioGroup.Option
                                    key={breed.id}
                                    value={breed.name}
                                    disabled={!breed.unavailable}
                                    className={({ active }) =>
                                      classNames(
                                        breed.unavailable
                                          ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                          : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                        active ? 'ring-2 ring-indigo-500' : '',
                                        'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                      )
                                    }
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label as="span">{breed.name}</RadioGroup.Label>
                                        {breed.unavailable ? (
                                          <span
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked ? 'border-indigo-500' : 'border-transparent',
                                              'absolute -inset-px rounded-md pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <span
                                            aria-hidden="true"
                                            className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                          >
                                            <svg
                                              className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                            </svg>
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                      </fieldset>
                      </>
                    )}


                    {watch('dataTypes') == "A" && (
                      <>

                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">생년월일</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <div className="mt-4 space-y-4">
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                              <Controller
                                name="birth"
                                control={control}
                                // rules={{ required: true }}
                                render={({ onChange, value, test }) => (
                                    <ReactDatePicker
                                        dateFormat="yyyy/MM/dd"
                                        selected={startDate}
                                        onChange={date => onChangeBirth(date)}
                                        monthsShown={2}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                )}
                              />
                                {/* <ReactDatePicker
                                  control={control}
                                  rules={{ required: true }}
                                  name="birth"
                                  dateFormat="yyyy/MM/dd"
                                  selected={startDate}
                                  onChange={date => setStartDate(date)}
                                  monthsShown={2}
                                /> */}
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        {/* 성별 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">성별</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <div className="mt-4 space-y-4">
                                {selectbox.sex.map((items) => (
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  {...register("sex", { required: true })}
                                  id={items.id}
                                  value={items.name}
                                  name="sex"
                                  type="radio"
                                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                  required
                                />
                                <div className="ml-3 text-sm">
                                  <label htmlFor={items.name} className="font-medium text-gray-700">
                                  {items.fullname}
                                  </label>
                                </div>
                              </div>
                              </div>
                                ))}
                          </div>
                        </fieldset>

                        {/* 테스트 */}
                        {selectbox.menu.map((item) => (
                          <fieldset>
                            <legend className="contents text-base font-bold text-gray-900">{item.ko}</legend>
                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                            {/* <div className="mt-1" onChange={handleChange}> */}
                            <div className="mt-1">
                              <input
                                type={item.type}
                                {...register( item.en, { required: true })}
                                id={item.en}
                                name={item.en}
                                rows={1}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder={item.place}
                                defaultValue={''}
                                required
                              />
                            </div>
                          </fieldset>
                        ))}

                        {/* 파일 업로드 */}

                        {selectbox.file.map((item) => (
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-700">{item.ko}</legend>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor={item.en} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                  <span>Upload a file</span>
                                  <input
                                    {...register(item.en)}
                                    id={item.en}
                                    name={item.en}
                                    type="file"
                                    className="sr-only"
                                    multiple>    
                                  </input>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </fieldset>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      제출하기
                    </button>
                  </div>
                </div>
              </form>


              {/* TODO: 버튼 기능 가져다 쓰기 */}
              {/* <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0" href="#0">Start free trial</a>
                </div>
                <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div>
              </div> */}
            </div>
          </div>

          {/* Hero image */}
          <div>
            <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
              {/* <div className="flex flex-col justify-center">
                <img className="mx-auto" src={HeroImage} width="768" height="432" alt="Hero" />
                <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto" width="768" height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="hero-ill-a">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="77.402%" />
                      <stop stopColor="#DFDFDF" offset="100%" />
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="99.24%" id="hero-ill-b">
                      <stop stopColor="#FFF" offset="0%" />
                      <stop stopColor="#EAEAEA" offset="48.57%" />
                      <stop stopColor="#DFDFDF" stopOpacity="0" offset="100%" />
                    </linearGradient>
                    <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="hero-ill-e">
                      <stop stopColor="#4FD1C5" offset="0%" />
                      <stop stopColor="#81E6D9" offset="25.871%" />
                      <stop stopColor="#338CF5" offset="100%" />
                    </radialGradient>
                    <circle id="hero-ill-d" cx="384" cy="216" r="64" />
                  </defs>
                  <g fill="none" fillRule="evenodd">
                    <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216" r="128" />
                    <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216" r="96" />
                    <g fillRule="nonzero">
                      <use fill="#000" xlinkHref="#hero-ill-d" />
                      <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d" />
                    </g>
                  </g>
                </svg>
              </div> */}


              {/* TODO: modal 가져다 쓰기 (팝업) */}
              {/* <button className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
                <svg className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Watch the full video (2 min)</span>
              </button> */}
            </div>

            {/* Modal */}
            {/* <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
              <div className="relative pb-9/16">
                <iframe className="absolute w-full h-full" src="https://player.vimeo.com/video/174002812" title="Video" allowFullScreen></iframe>
              </div>
            </Modal> */}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;