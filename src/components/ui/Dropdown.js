const Dropdown = ({ name, register, options, label, errors }) => {
  return (
    <div className="mt-4 py-2 px-4 rounded-lg bg-gray-100">
      <label className="flex items-center">
        {label}{" "}
        <span className="ml-2 text-red-500 text-xs">
          {errors[name]?.message}
        </span>
      </label>
      <select
        {...register(name)}
        className={"bg-transparent text-xl w-full outline-none"}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
