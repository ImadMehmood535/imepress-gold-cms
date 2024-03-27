/** @format */

const Input2 = ({
  register,
  label,
  placeholder,
  name,
  errors,
  customClass,
  required,
}) => {
  return (
    <div
      className={`${customClass} mt-4 px-4 relative py-2 rounded-lg bg-gray-200/95`}
    >
      {label && (
        <label
          htmlFor={name}
          className="relative flex flex-1 py-2 items-center  text-sm"
        >
          {label}
          {required && (
            <span className="text-red-500 absolute text-xl top-0 -left-3">
              *
            </span>
          )}
          {errors && errors[name]?.message && (
            <span className="ml-2 text-red-500 text-xs">
              {errors[name]?.message}
            </span>
          )}
        </label>
      )}
      <div className="flex items-center border py-2 px-4 rounded-lg bg-white/90 ">
        <input
          id={name}
          type="file"
          {...register(name)}
          className={
            "flex-1 bg-transparent align-middle text-sm w-fit outline-none accent-green-600 break-words text-blue-600 "
          }
          // placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input2;
