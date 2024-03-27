import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useToast = () => {
  const resolveToast = (message, time = 1000) => {
    const options = {
      position: toast.POSITION.TOP_CENTER,
      autoClose: time,
      toastId: "myToast",
    };
    if (toast.isActive("myToast")) {
      // if there is an active toast, update it with the new message
      toast.update("myToast", {
        render: message,
        ...options,
      });
    } else {
      // otherwise, create a new toast
      toast.success(message, options);
    }
  };
  const rejectToast = (message, time = 1000) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: time,
      onClose: () => toast.clearWaitingQueue(),
    });
  };
  return { resolveToast, rejectToast };
};
