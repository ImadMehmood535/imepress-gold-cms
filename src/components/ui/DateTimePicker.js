/** @format */
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import React from "react";
import { Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker";
const CustomDateTimePicker = ({
  control,
  label,
  name,
  value,
  errors,
  register,
  bool,
  placeholder,
  disabled,
}) => {
  return (
    <div className="mt-4 py-4 px-4 rounded-lg bg-gray-200/95">
      <label htmlFor={name} className="flex items-center text-sm">
        {label}
        {errors && errors[name]?.message && (
          <span className="ml-2 text-red-500 text-xs">
            {errors[name]?.message}
          </span>
        )}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DateTimePicker
            value={field?.value || value}
            placeholderText={value?.slice(0, 10) || placeholder || "7/14/2023"}
            {...register(name)}
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            className="bg-white/90 w-fit px-4 py-2 rounded-lg text-blue-700 "
            dateFormat={bool ? "MM/yy" : "dd/MM/yyy"}
            showMonthYearPicker={bool}
            disabled={disabled}
            minDate={new Date()}
          />
        )}
      />
    </div>
  );
};

export default CustomDateTimePicker;
