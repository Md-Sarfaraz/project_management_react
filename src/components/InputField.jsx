import React, { useEffect, useState, useRef } from 'react'


export const InputField = ({ value, onChange, placeholder, type, name, id, color }) => {
  const inref = useRef();
  const [input, setInput] = useState({ focus: false, blur: true });

  useEffect(() => {

  }, [input])

  const onblur = () => {
    let value = inref.current.value;
    if (value === "") {
      setInput({ focus: false, blur: true });
    }
  }

  const borderColor = () => {
    switch (color) {
      case "blue":
        return "after:border-blue-500";
      case "purple":
        return "after:border-purple-500";
      case "sky":
        return "after:border-sky-500";
      case "red":
        return "after:border-red-500";
      case "green":
        return "after:border-green-500";
      case "cyan":
        return "after:border-cyan-500";
      case "teal":
        return "after:border-teal-500";
      case "amber":
        return "after:border-amber-500";
      case "indigo":
        return "after:border-indigo-500";
      default:
        return "";
    }
  }




  return (
    <div className="w-full  overflow-x-hidden  relative h-11 ">
      <input type={type} name={name} id={id} autoComplete='off' ref={inref}
        onFocus={() => { setInput({ ...input, focus: true, blur: false }) }} onBlur={onblur} value={value} onChange={onChange}
        className={(input.focus ? '' : "") + ' w-full h-full pt-4 text-gray-800 border-none outline-none bg-transparent'} />
      <label htmlFor="name" className={` absolute bottom-0 left-0 w-full h-full  pointer-events-none  after:-translate-x-full ${borderColor()} ` +
        'border-b border-gray-300  after:absolute after:h-full after:w-full   after:border-b-2 after:transition-all  after:duration-300 ' +
        '  after:-left-0 after:-bottom-[1px] ' + (input.blur ? "" : "after:translate-x-0")
      }>
        <span className={(input.focus ? 'text-xs  -translate-y-[125%]  ' : " text-base ") + " text-gray-400 absolute bottom-[5px] left-0 transition-all "}>
          {placeholder}</span>
      </label>
    </div>


    // <div className="w-full relative h-11 ">
    //   <input type={type} name={name} id={id} value={value} onChange={onChange}
    //     className={`w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none '
    //       + '  focus:ring-0 focus:text-gray-800 px-0  mt-input-teal-500  mt-input bg-transparent border-none`} />
    //   <label className="text-gray-400  absolute left-0 -top-0.5 w-full h-full border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300 pointer-events-none">
    //     <span className=" absolute top-1/4 transition-all duration-300">{placeholder} </span>
    //   </label>
    // </div>


  )
}
