const ColorPicker = ({
  register,
  label,
  placeholder,
  name,
  type,
  errors,
  customClass,
  show,
  setShow,
  required,
  disabled,
}) => {
  return (
    <div className={`${customClass} mt-4 px-4 py-2 rounded-lg bg-gray-200/95`}>
      <label
        htmlFor={name}
        className="relative flex flex-1 py-2 items-center  text-sm"
      >
        {label}
        {required && (
          <span className="text-red-500 absolute text-xl top-0 -left-3">*</span>
        )}
        {errors && errors[name]?.message && (
          <span className="ml-2 text-red-500 text-xs">
            {errors[name]?.message}
          </span>
        )}
      </label>
      <div className="flex items-center border px-4 py-2 rounded-lg bg-white/90">
        <input
          disabled={disabled}
          id={name}
          {...register(name)}
          step="any"
          type={"color"}
          className={
            "flex-1 bg-transparent align-middle text-lg w-fit outline-none accent-green-600 break-words text-blue-600 "
          }
          placeholder={placeholder}
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

export default ColorPicker;
