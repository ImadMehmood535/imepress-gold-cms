import { Loader } from "lucide-react";

const FullScreenLoader = () => {
  return (
    <div className="bg-white w-full fixed h-screen left-0 top-0 z-[10] flex flex-col items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
};

export default FullScreenLoader;
