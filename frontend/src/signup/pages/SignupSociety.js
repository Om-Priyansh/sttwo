import React, { useState, useEffect } from "react";
// import "./SignupSociety.css";

import Form from "../components/Form";
import Form_1 from "./Form_1.js";
import Form_2 from "./Form_2.js";
import Form_3 from "./Form_3.js";
import Form_4 from "./Form_4.js";
// import SignupSociety2 from "./SignupSociet2.js";

const SignupSociety = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    societyInformation:{
        name: '',
        dateOfEstablishment: '',
        emailAddress: '',
        password:'',
        phoneNumber: '', //need to add phonenumber input
        address: '',
        city: '',
        state: '',
        pincode: '',
        numberOfWings: '1',
        registrationNumber: '',
       },
       wingInformation:{
            wingNumber:{
              wingName:'',
              wingFloors:'',
              wingRoomsPerFloor:'',//need input
              wingRoomDetails:{
                roomIndex:{
                  roomNumber:'',
                  roomSize:'',
                  maintenanceAmount:'',
                  maintenanceHeadAmount:{
                    landTax:'',
                    waterTax:'',
                    parkingCharges:''
                  }
                }
              }
            }
        }
      });

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);

  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  console.log(formData);

  return (
    <div className="signup-container">
          <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Society Registration Form</h1>
      
      <div className="flex justify-between mb-6">
        {['Basic Information', 'Wing Information', 'Maintenance Heads', 'Maintenance amount'].map((label, index) => (
          <div key={index} className={`flex items-center ${index + 1 === step ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${index + 1 === step ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              {index + 1}
            </div>
            {label}
          </div>
        ))}
      </div>

      

      <div className="form-page">
        {step === 1 && <Form_1 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData}/>}
        {step === 2 && <Form_2 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData}/>}
        {step === 3 && <Form_3 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData}/>}
        {step === 4 && <Form_4 step = {step} setStep = {setStep} formData = {formData} setFormData = {setFormData}/>}
        
        </div>

        <div className={`button-row flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
          {
            step === 1 &&
            <>
            <button className="next-button px-12 py-2 my-4  bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>Next</button>
            
            </>
          }
          {step > 1 && step < 4 &&
          <>
          <button className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handlePrevious}>Previous</button>
          <button className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>Next</button>
          
          </>
          }
          {
            step === 4 &&
            <>
            <button className="previous-button px-12 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={handlePrevious}>Previous</button>
            {/* submit button */}
            <button className="next-button px-12 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleNext}>Register</button>
            </>
          }
          
        </div>

      </div>
      {/* <Form /> */}
    </div>
  );
};

export default SignupSociety;