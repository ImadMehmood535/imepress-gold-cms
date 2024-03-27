const Select3 = ({
  register,
  label,
  name,
  errors,
  options,
  value,
  customClass,
  disabled,
  onChange,
  bool,
}) => {
  return (
    <div className={`mt-4 px-4 py-2 rounded-lg bg-gray-200/95 ${customClass}`}>
      <label
        htmlFor={name}
        className="relative flex flex-1 py-2 items-center  text-sm"
      >
        {label}
        {errors && errors[name]?.message && (
          <span className="ml-2 text-red-500 text-xs">
            {errors[name]?.message}
          </span>
        )}
      </label>
      <div className="flex items-center border py-3 px-4 rounded-lg bg-white/90">
        <select
          {...register(name)}
          id={name}
          defaultValue={value}
          className={
            "flex-1 bg-transparent align-middle text-sm w-fit outline-none accent-green-600 break-words text-blue-600 "
          }
          disabled={disabled}
          onChange={onChange}
        >
          {options?.map((i) => {
            return (
              <option
                value={`${i?.value}+${i?.name}`}
                key={i?.name}
                disabled={bool == i?.value}
              >
                {`${i?.name}`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select3;
