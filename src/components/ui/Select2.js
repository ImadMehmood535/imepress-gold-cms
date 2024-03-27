const SelectTwo = ({ label, name, options, value, handleChange }) => {
  return (
    <div className="flex mt-4 py-4 px-4 rounded-lg max-w-[20rem]">
      <label htmlFor={name} className="flex items-center text-sm px-2 py-2 ">
        {label}
      </label>
      <select
        defaultValue={value}
        className={
          "ml-2 bg-transparent text-lg outline-none text-black border border-gray-300 rounded-lg px-2 min-w-[10rem]"
        }
        onChange={handleChange}
      >
        {options?.map((i) => {
          return (
            <option value={i?.id} key={i?.tab_name}>
              {`${i?.tab_name}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectTwo;
