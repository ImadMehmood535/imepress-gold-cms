import Image from "next/image";
import {
  CheckCircle,
  CheckCircleIcon,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const RadioButton = ({
  register,
  label,
  name,
  errors,
  imageUrl,
  setCheck,
  check,
  disabled,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        {...register(name)}
        id={name}
        disabled={disabled}
        onClick={() => {
          setCheck(!check);
        }}
        className="peer hidden [&:checked_+_label_svg]:block"
      />
      <label
        htmlFor={name}
        className="block cursor-pointer rounded-lg border border-gray-100 bg-gray-100 py-2 px-4 shadow-sm hover:border-gray-200 peer-checked:border-gray-500 peer-checked:ring-1 peer-checked:ring-gray-500"
      >
        <div className="flex items-center justify-between">
          <p className="text-gray-700">
            {label}{" "}
            {errors?.name?.message ? (
              <span className="text-red-500">*</span>
            ) : (
              ""
            )}
          </p>
          {/* <svg
            className={`h-5 w-5 ${check ? "text-green-500" : "text-gray-500"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg> */}
          <div className={`${check ? "text-white" : "text-white"}`}>
            <CheckCircle2 fill={`${!check ? "gray" : "green"}`} size={30} />
          </div>
        </div>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={label + " Logo"}
            width={1000}
            height={1000}
          />
        )}
      </label>
    </div>
  );
};

export default RadioButton;
