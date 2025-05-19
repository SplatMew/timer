import React from 'react'

export default function InputField({label, value, onChange, placeHolder} ) {
  
  const handleInputChange = (e)=>{
    const inputValue = e.target.value;
    if(inputValue === "" || (/^\d+$/.test(inputValue) && inputValue < 60)){
      if(inputValue === ""){
        e.target.value = 0;
        onChange(e)
      }else{
        onChange(e)
      }
     
    }
  }

  return (
    <div className='text-slate-200'>
        <label>{label}:</label>
        <input
          type='number'
          inputMode='numeric'
          value={value}
          onChange={handleInputChange}
          placeholder={placeHolder}
          maxLength={2}
          className='bg-transparent pl-2 w-10'
          ></input>
    </div>
  )
}
