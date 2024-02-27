import React from 'react'

function InputBox({placeholder,label,onChange}) {
  return (
    <div className='text-sm font-medium text-left py-2'>
      <label  className='text-md font-mono font-medium text-left py-2'>
      {label}

      </label>
      <input onChange={onChange} type="text" placeholder={placeholder} className='w-full px-2 py-1 border text-md rounded border-slate-200' />
      
    </div>
  )
}

export default InputBox
