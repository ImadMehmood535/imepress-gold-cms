/** @format */

const TextArea = ({
  register,
  label,
  placeholder,
  name,
  type,
  errors,
  customClass,
  show,
  setShow,
  cols,
  rows,
  maxLength,
}) => {
  return (
    <div className={`${customClass} mt-4 py-2 px-4 rounded-lg bg-gray-200/95`}>
      <label htmlFor={name} className="flex flex-1 py-2 items-center  text-sm">
        {label}
        {/* {errors[name]?.message? "" :
          <span className="ml-2 text-xs">
            {maxLength} word limit
          </span>
        } */}
        {errors && errors[name]?.message && (
          <span className="ml-2 text-red-500 text-xs">
            {errors[name]?.message}
          </span>
        )}
      </label>
      <div className="flex">
        <textarea
          id={name}
          cols={cols || 1}
          rows={rows || 2}
          // maxLength={maxLength}
          {...register(name)}
          step="any"
          type={(!show && type) || "text"}
          className={
            "flex-1 bg-white/90 px-4 py-2 rounded-lg text-lg w-full outline-none accent-green-600 text-blue-600 "
          }
          // placeholder={placeholder}
        />
        {type == "password" && (
          <p className="cursor-pointer" onClick={() => setShow(!show)}>
            {!show ? "show" : "hide"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
