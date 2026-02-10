export default function Input({label ,invalid, ...props}){

  let labelclasses ="block mb-2 text-xs font-bold tracking-wide uppercase";

  let inputclasses = "w-full px-3 py-2 leading-tight border rounded shadow";
  
  if(invalid){
    labelclasses += " text-red-400";
    inputclasses += " bg-red-100 text-red-500 border-red-300";
  }else{
    labelclasses += " text-stone-300";
    inputclasses += " bg-stone-300 text-gray-700";
  }

  return(
      <p>
          <label className={labelclasses}>{label}</label>
          <input className={inputclasses} {...props}/>
      </p>
  )
};