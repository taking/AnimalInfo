import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import moment from "moment";

import AuthService from "../api/authService";
import DataService from "../api/dataService";
import dataService from "../api/dataService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) == null) {
      console.log("로그인 정보가 없어, signin 페이지로 이동합니다.");
      navigate("/signin");
    } else {
      const user = AuthService.getCurrentUser();
      setValue("refer", user.refer);
    }
  }, []);

  const listUp = {
    dataA: [
      "userId",
      "refer",
      // "price",
      "data_type",
      "species",
      "race",
      "birth",
      "sex",
      "weight",
      "shoulderHeight",
      "neckSize",
      "backLength",
      "chestSize",
      "BCS",
      "exercise",
      "environment",
      "defecation",
      "foodCount",
      "foodAmount",
      "snackAmount",
      "foodKind",
      "disease",
      "upload_at",
    ],
    dataB: ["CPR", "lgG", "IL6", "AFP", "heartRate", "breatingRate", "bodyHeat", "stress"],
    file: [
      "01", // 전면
      "02", // 후면
      "03", // 좌측면중앙
      "04", // 좌측면좌45도
      "05", // 좌측면우45도
      "06", // 좌측면상45도
      "07", // 좌측면하45도
      "08", // 우측면중앙
      "09", // 우측면좌45도
      "10", // 우측면우45도
      "11", // 우측면상45도
      "12", // 우측면하45도
      "13", // 상측면
      "14", // 두상전면중앙
      "15", // 두상전면좌45도
      "16", // 두상전면우45도
      "17", // 두상전면상45도
      "18", // 두상전면하45도
      "19", // 두상상측면
      "20", // 비문전면
    ],
  };

  const selectbox = {
    data_type: [
      { id: "dataTypes_A", fullname: "A 타입", name: "A", value: "A", unavailable: true },
      { id: "dataTypes_B", fullname: "B 타입", name: "B", value: "B", unavailable: true },
    ],
    species: [
      { id: "species_dog", fullname: "반려견", name: "dog", value: "10", unavailable: true },
      { id: "species_cat", fullname: "반려묘", name: "cat", value: "20", unavailable: true },
    ],
    dogs: [
      { id: "dogBreed_1", name: "몰티즈", value: "01", unavailable: true },
      { id: "dogBreed_2", name: "푸들", value: "02", unavailable: true },
      { id: "dogBreed_3", name: "포메라니안", value: "03", unavailable: true },
      { id: "dogBreed_4", name: "치와와", value: "04", unavailable: true },
      { id: "dogBreed_5", name: "시추", value: "05", unavailable: true },
      { id: "dogBreed_6", name: "골든리트리버", value: "06", unavailable: true },
      { id: "dogBreed_7", name: "진돗개", value: "07", unavailable: true },
      { id: "dogBreed_8", name: "믹스견", value: "08", unavailable: true },
    ],
    cats: [
      { id: "catBreed_1", name: "코리안숏헤어", value: "01", unavailable: true },
      { id: "catBreed_2", name: "러시아블루", value: "02", unavailable: true },
      { id: "catBreed_3", name: "페르시안", value: "03", unavailable: true },
      { id: "catBreed_4", name: "샴", value: "04", unavailable: true },
      { id: "catBreed_5", name: "터키시앙고라", value: "05", unavailable: true },
      { id: "catBreed_6", name: "스핑크스", value: "06", unavailable: true },
      { id: "catBreed_7", name: "랙돌", value: "07", unavailable: true },
    ],
    sex: [
      { id: "sex_IM", fullname: "IM(수컷)", name: "IM", unavailable: true },
      { id: "sex_IF", fullname: "IF(암컷)", name: "IF", unavailable: true },
      { id: "sex_CM", fullname: "CM(증성화수컷)", name: "CM", unavailable: true },
      { id: "sex_SF", fullname: "SF(중성화암컷)", name: "SF", unavailable: true },
    ],
    bcs: [
      { id: "bcs_1", name: "1", unavailable: true },
      { id: "bcs_2", name: "2", unavailable: true },
      { id: "bcs_3", name: "3", unavailable: true },
      { id: "bcs_4", name: "4", unavailable: true },
      { id: "bcs_5", name: "5", unavailable: true },
    ],
    dimensions: [
      { type: "number", en: "shoulderHeight", ko: "견갑부 높이(cm)", subtitle: "text", place: "견갑부 높이를 입력하세요" },
      { type: "number", en: "neckSize", ko: "목둘레(cm)", subtitle: "text", place: "목둘레를 입력하세요" },
      { type: "number", en: "backLength", ko: "등허리 길이(cm)", subtitle: "text", place: "등허리 길이를 입력하세요" },
      { type: "number", en: "chestSize", ko: "흉곽둘레(cm)", subtitle: "text", place: "흉곽둘레를 입력하세요" },
    ],
    exercise: [
      { id: "exercise_1", fullname: "저(1주일 1시간 이하)", name: "1", unavailable: true },
      { id: "exercise_2", fullname: "중(매일 30분 이하)", name: "2", unavailable: true },
      { id: "exercise_3", fullname: "고(매일 1시간 이상)", name: "3", unavailable: true },
    ],
    foodCount: [
      { id: "foodcount_1", fullname: "1회", name: "1", unavailable: true },
      { id: "foodcount_2", fullname: "2회", name: "2", unavailable: true },
      { id: "foodcount_3", fullname: "3회", name: "3", unavailable: true },
      { id: "foodcount_free", fullname: "자율급식", name: "free", unavailable: true },
    ],
    environment: [
      { id: "environment_indoor", fullname: "실내", name: "0", unavailable: true },
      { id: "environment_outdoor", fullname: "실외", name: "1", unavailable: true },
    ],
    defecation: [
      { id: "environment_normal", fullname: "정상", name: "0", unavailable: true },
      { id: "environment_abnormal", fullname: "이상", name: "1", unavailable: true },
    ],
    foodKind: [
      { id: "foodkind_1", fullname: "반려동물 전용 사료", name: "0", unavailable: true },
      { id: "foodkind_2", fullname: "전용사료 + 사람 음식(혼용)", name: "1", unavailable: true },
      { id: "foodkind_3", fullname: "사람 음식", name: "2", unavailable: true },
    ],
    food: [
      { type: "number", en: "foodAmount", ko: "식사량", subtitle: "1회 식사량 (종이컵 기준)", place: "식사량을 입력하세요" },
      {
        type: "number",
        en: "snackAmount",
        ko: "식이간식량",
        subtitle: "1회 식사량 대비 간식량 표기 (사료의 X%로 표기)",
        place: "식이간식량을 입력하세요",
      },
    ],
    disease: [
      { id: "disease_true", fullname: "Y", name: "Y", unavailable: true },
      { id: "disease_false", fullname: "N", name: "N", unavailable: true },
    ],
    diseaseName: [
      { id: "diseaseName_1", name: "DER", value: "01", unavailable: true },
      { id: "diseaseName_2", name: "MUS", value: "02", unavailable: true },
      { id: "diseaseName_3", name: "NEU", value: "03", unavailable: true },
      { id: "diseaseName_4", name: "OCU", value: "04", unavailable: true },
      { id: "diseaseName_5", name: "RES", value: "05", unavailable: true },
      { id: "diseaseName_6", name: "CAR", value: "06", unavailable: true },
      { id: "diseaseName_7", name: "HEM", value: "07", unavailable: true },
      { id: "diseaseName_8", name: "GAS", value: "08", unavailable: true },
      { id: "diseaseName_9", name: "URI", value: "09", unavailable: true },
      { id: "diseaseName_10", name: "REP", value: "10",  unavailable: true },
      { id: "diseaseName_11", name: "END", value: "11", unavailable: true },
      { id: "diseaseName_12", name: "INF", value: "12", unavailable: true },
      { id: "diseaseName_13`", name: "ETC", value: "13",unavailable: true },
    ],
    typeB: [
      { type: "number", en: "CPR", ko: "C-반응성 단백질", subtitle: "text", place: "C-반응성 단백질를 입력하세요" },
      { type: "number", en: "lgG", ko: "면역글로블린 G", subtitle: "text", place: "면역글로블린 G를 입력하세요" },
      { type: "number", en: "IL6", ko: "인터류킨-6", subtitle: "text", place: "인터류킨-6를 입력하세요" },
      { type: "number", en: "AFP", ko: "알파 태아 단백질", subtitle: "text", place: "알파 태아 단백질를 입력하세요" },
      { type: "number", en: "heartRate", ko: "심박수", subtitle: "text", place: "심박수를 입력하세요" },
      { type: "number", en: "breatingRate", ko: "호흡수", subtitle: "text", place: "호흡수를 입력하세요" },
      { type: "number", en: "bodyHeat", ko: "체온", subtitle: "text", place: "체온을 입력하세요" },
      { type: "number", en: "stress", ko: "스트레스 지수", subtitle: "text", place: "스트레스 지수를 입력하세요" },
    ],
    file: [
      { en: "01", ko: "전면" },
      { en: "02", ko: "후면" },
      { en: "03", ko: "좌측면중앙" },
      { en: "04", ko: "좌측면좌45도" },
      { en: "05", ko: "좌측면우45도" },
      { en: "06", ko: "좌측면상45도" },
      { en: "07", ko: "좌측면하45도" },
      { en: "08", ko: "우측면중앙" },
      { en: "09", ko: "우측면좌45도" },
      { en: "10", ko: "우측면우45도" },
      { en: "11", ko: "우측면상45도" },
      { en: "12", ko: "우측면하45도" },
      { en: "13", ko: "상측면" },
      { en: "14", ko: "두상전면중앙" },
      { en: "15", ko: "두상전면좌45도" },
      { en: "16", ko: "두상전면우45도" },
      { en: "17", ko: "두상전면상45도" },
      { en: "18", ko: "두상전면하45도" },
      { en: "19", ko: "두상상측면" },
      { en: "20", ko: "비문전면" },
    ],
  };

  var [files, setFiles] = useState([]);

  const onSubmit = data => {
    var formData = new FormData();
    console.log("data is :", data);

  // const [checkedItems, setCheckedItems] = useState(new Set());

  // const checkedItemHandler = (id, isChecked) => {
  //   if (isChecked) {
  //     checkedItems.add(id);
  //     scheckedItemHandleretCheckedItems(checkedItems);
  //   } else if (!isChecked && checkedItems.has(id)) {
  //     checkedItems.delete(id);
  //     setCheckedItems(checkedItems);
  //   }
  // };

  // const [bChecked, setChecked] = useState(false);

  // const checkHandler = ({ target }) => {
  //   setChecked(!bChecked);
  //   (issue.id, target.checked);
  // };

    var diseaseList = "";
    for (let i = 0; i < selectbox.diseaseName.length; i++) {
      // diseaseList 가 "" 가 아닐 때 "/" 추가
      if (getValues(selectbox.diseaseName[i].name) != undefined) {
        diseaseList += selectbox.diseaseName[i].name + "/";
      }
    }
    
    diseaseList = diseaseList.slice(0, -1)

    formData.append("diseaseName", diseaseList);
                     


    for (let i = 0; i < listUp.dataA.length; i++) {
      console.log("value is :", getValues(listUp.dataA[i]));
      formData.append(listUp.dataA[i], getValues(listUp.dataA[i]));
    }

    for (let i = 0; i < listUp.dataB.length; i++) {
      console.log("value is :", getValues(listUp.dataB[i]));

      if(getValues(listUp.dataB[i]) === undefined) {
        setValue(listUp.dataB[i], 0)
      }

      formData.append(listUp.dataB[i], getValues(listUp.dataB[i]));
    }

    for (let i = 0; i < listUp.file.length; i++) {
      console.log("file value is :", getValues(listUp.file[i]));
      // formData.append('file', getValues(listUp.file[i]))
      // formData.append(listUp.file[i], getValues(listUp.file[i]));

      // [ multi ]
      const fileListArr = (getValues(listUp.file[i]) || []).length;
      for (var j = 0; j < fileListArr; j++) {
        formData.append(listUp.file[i], getValues(listUp.file[i])[j]);
      }
    }

    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(JSON.stringify(pair[0]) + ", " + JSON.stringify(pair[1]));
    }

    DataService.create(formData).then(
      () => {
        alert("Upload Success!");
        navigate("/");
        DataService.getDataId().then(data =>{
          alert("데이터 번호를 확인해주세요. B Tpye 입력 시 필요합니다.\n데이터 ID : "+data)
        });
      },
      error => {
        console.log("response msg : ", error.response);
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        alert(resMessage);
      },
    );
  };

  const handleChangeForm = (name, data) => {
    console.log("name : ", name);
    console.log("data : ", data);
    setValue(name, data);
  };


  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              데이터 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">업로드</span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                다음 폼에 맞춰 정보를 입력하세요
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit, onError)} encType="multipart/form-data">
                {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    {/* <fieldset> */}
                    <legend className="contents text-base font-bold text-gray-900">제공처</legend>
                    {/* <div className="mt-1" onChange={handleChange}> */}
                    <div className="mt-1">
                      <input
                        type="text"
                        id="refer"
                        name="refer"
                        defaultValue={watch("refer")}
                        onChange={e => handleChangeForm("refer", e)}
                        rows={1}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="제공처를 입력하세요"
                        required
                      />
                    </div>
                    {/* </fieldset> */}

                    {/* 데이터 타입 */}
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">데이터 타입</legend>
                      <div className="mt-4 space-y-4">
                        {selectbox.data_type.map(item => (
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                {...register("data_type", { required: true })}
                                id={item.id}
                                value={item.value}
                                name="data_type"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                required
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={item.name} className="font-medium text-gray-700">
                                {item.fullname}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    {/* 종별구분 */}
                    <fieldset>
                      <legend className="contents text-base font-bold text-gray-900">종별구분</legend>
                      <div className="mt-4 space-y-4">
                        {selectbox.species.map(item => (
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                {...register("species", { required: true })}
                                id={item.id}
                                value={item.value}
                                name="species"
                                type="radio"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                required
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor={item.name} className="font-medium text-gray-700">
                                {item.fullname}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    {/* 10 == 'dog' */}
                    {watch("species") == "10" && (
                      <>
                        <fieldset>
                          <legend className="contents text-base font-medium text-gray-900">반려견 품종</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}
                          <RadioGroup value={watch("race")} onChange={e => handleChangeForm("race", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-4 gap-4">
                              {selectbox.dogs.map(breed => (
                                <RadioGroup.Option
                                  key={breed.id}
                                  value={breed.value}
                                  disabled={!breed.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      breed.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{breed.name}</RadioGroup.Label>
                                      {breed.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                    {/* 20 == 'cat' */}
                    {watch("species") == "20" && (
                      <>
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">반려묘 품종</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}

                          <RadioGroup value={watch("race")} onChange={e => handleChangeForm("race", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-4 gap-4">
                              {selectbox.cats.map(breed => (
                                <RadioGroup.Option
                                  key={breed.id}
                                  value={breed.value}
                                  disabled={!breed.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      breed.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{breed.name}</RadioGroup.Label>
                                      {breed.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                    {watch("data_type") != null && (
                      <>
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">생년월일</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <div className="mt-1">
                            {/* <div className="flex items-start">
                              <div className="flex items-center h-5"> */}
                            <input
                              {...register("birth", { required: true })}
                              id="birth"
                              name="birth"
                              type="number"
                              placeholder="YYYYMMDD"
                              min="10000000"
                              max="21001230"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                            {/* </div>
                            </div> */}
                          </div>
                        </fieldset>

                        {/* 성별 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">성별</legend>
                          {/* <p className="text-sm text-gray-500">Text</p> */}

                          <RadioGroup value={watch("sex")} onChange={e => handleChangeForm("sex", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-4">
                              {selectbox.sex.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 체중 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">체중(kg)</legend>
                          {/* <p className="text-sm text-gray-500">test</p> */}
                          <div className="mt-1">
                            <input
                              type="number"
                              {...register("weight", { required: true })}
                              id="weight"
                              name="weight"
                              rows={1}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              placeholder="체중을 입력하세요"
                              defaultValue={""}
                              min="1"
                              max="100"
                              required
                            />
                          </div>
                        </fieldset>

                        {/* 신체 충실 지수(BCS) */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">신체 충실 지수(BCS)</legend>
                          <p className="text-sm text-gray-500">
                            신체 충실 지수 또는 비만 판정 지표로 불리우며, 1에 가까울수록 마름에 해당하고 5에 가까울수록 비만에 해당합니다.
                          </p>

                          <RadioGroup value={watch("BCS")} onChange={e => handleChangeForm("BCS", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-5">
                              {selectbox.bcs.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.name}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 운동량 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">운동량</legend>
                          {/* <p className="text-sm text-gray-500">text</p> */}

                          <RadioGroup value={watch("exercise")} onChange={e => handleChangeForm("exercise", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-1 gap-5">
                              {selectbox.exercise.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 식이 횟수 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">식이 횟수</legend>
                          {/* <p className="text-sm text-gray-500">text</p> */}

                          <RadioGroup value={watch("foodCount")} onChange={e => handleChangeForm("foodCount", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-5 flex-row">
                              {selectbox.foodCount.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 생활 환경 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">생활 환경</legend>
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <RadioGroup value={watch("environment")} onChange={e => handleChangeForm("environment", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-5 flex-row">
                              {selectbox.environment.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 배변 상태 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">배변 상태</legend>
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <RadioGroup value={watch("defecation")} onChange={e => handleChangeForm("defecation", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-5 flex-row">
                              {selectbox.defecation.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 식사 종류 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">삭사 종류</legend>
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <RadioGroup value={watch("foodKind")} onChange={e => handleChangeForm("foodKind", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-1 gap-5 flex-row">
                              {selectbox.foodKind.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {/* 식사 메뉴 */}
                        {selectbox.food.map(item => (
                          <fieldset>
                            <legend className="contents text-base font-bold text-gray-900">{item.ko}</legend>
                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                            {/* <div className="mt-1" onChange={handleChange}> */}
                            <div className="mt-1">
                              <input
                                type={item.type}
                                {...register(item.en, { required: true })}
                                id={item.en}
                                name={item.en}
                                rows={1}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder={item.place}
                                defaultValue={""}
                                min="1"
                                max="20"
                                required
                              />
                            </div>
                          </fieldset>
                        ))}

                        {/* 질병 유무 */}
                        <fieldset>
                          <legend className="contents text-base font-bold text-gray-900">질병 유무</legend>
                          {/* <div className="mt-4 space-y-4" onChange={handleChange}> */}
                          <RadioGroup value={watch("disease")} onChange={e => handleChangeForm("disease", e)} className="mt-4">
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}
                            <div className="grid grid-cols-2 gap-5 flex-row">
                              {selectbox.disease.map(item => (
                                <RadioGroup.Option
                                  key={item.id}
                                  value={item.name}
                                  disabled={!item.unavailable}
                                  className={({ active }) =>
                                    classNames(
                                      item.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{item.fullname}</RadioGroup.Label>
                                      {item.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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

                        {watch("disease") == "Y" && (
                          <>
                            <fieldset>
                              <legend className="contents text-base font-bold text-gray-900">질병코드</legend>
                              <div className="grid grid-cols-4 gap-4">
                              {selectbox.diseaseName.map(disease => (
                              <RadioGroup value={watch(disease.name)} onChange={e => handleChangeForm(disease.name, e)}  className="mt-4">
                                <RadioGroup.Option 
                                  key={disease.id}
                                  value={disease.value}
                                  disabled={!disease.unavailable}
                                  className={({ active }) =>
                                   classNames(
                                      disease.unavailable
                                        ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                        : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1",
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">{disease.name}</RadioGroup.Label>
                                      {disease.unavailable ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked ? "border-indigo-500" : "border-transparent",
                                            "absolute -inset-px rounded-md pointer-events-none",
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
                                </RadioGroup>
                              ))}
                            </div>
                          {/* <p className="text-sm text-gray-500">Text</p> */}
                         
                            {/* <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label> */}

                          
                              {/* <div className="mt-1" onChange={handleChange}> */}
                              {/* <div className="mt-1">
                                <textarea
                                  {...register("diseaseName", { required: true })}
                                  id="diseaseName"
                                  name="diseaseName"
                                  rows={1}
                                  type="text"
                                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                  placeholder="질병 코드를 입력하세요"
                                  defaultValue={""}
                                  required
                                />
                              </div> */}
                            </fieldset>
                          </>
                        )}

                        {/* 데이터 타입이 B가 선택될 때 */}
                        {watch("data_type") == "B" && (
                          <>
                            <fieldset>
                              <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {selectbox.typeB.map(item => (
                                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <legend className="contents text-base font-bold text-gray-900">{item.ko}</legend>
                                    {/* <p className="text-sm text-gray-500">{item.subtitle}</p> */}
                                    <div className="mt-1">
                                      <input
                                        type={item.type}
                                        {...register(item.en, { required: true })}
                                        id={item.en}
                                        name={item.en}
                                        rows={1}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder={item.place}
                                        defaultValue={""}
                                        min="1"
                                        max="100"
                                        required
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </fieldset>
                          </>
                        )}

                        {/* 신체 치수 */}
                        <fieldset>
                          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {selectbox.dimensions.map(item => (
                              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                <legend className="contents text-base font-bold text-gray-900">{item.ko}</legend>
                                {/* <p className="text-sm text-gray-500">{item.subtitle}</p> */}
                                <div className="mt-1">
                                  <input
                                    type={item.type}
                                    {...register(item.en, { required: true })}
                                    id={item.en}
                                    name={item.en}
                                    rows={1}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    placeholder={item.place}
                                    defaultValue={""}
                                    min="1"
                                    max="100"
                                    required
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </fieldset>

                        {/* 파일 업로드 */}
                        {selectbox.file.map(item => (
                          <fieldset>
                            <label className="block">
                              <legend className="block text-sm font-medium text-gray-700">{item.ko}</legend>
                              <span className="sr-only">Upload a file</span>
                              <input
                                {...register(item.en)}
                                id={item.en}
                                name={item.en}
                                type="file"
                                className="form-control
                          block
                          w-full
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                accept="image/jpg,image/jpeg"
                                required
                              ></input>
                            </label>
                          </fieldset>
                        ))}
                      </>
                    )}

                    <fieldset>
                      <input {...register("upload_at")} type="hidden" value={moment(new Date()).format("YYYYMMDD")}></input>
                      <input {...register("userId")} type="hidden" value={localStorage.getItem("userId")}></input>
                    </fieldset>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
