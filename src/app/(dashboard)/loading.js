import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Loader size={20} className="animate-spin" />
    </div>
  );
};

export default Loading;
