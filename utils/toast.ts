import { toast, ToastOptions } from "react-toastify";

type ToastStatus = "success" | "error";

const toastOption: ToastOptions = {
  position: "bottom-center",
  autoClose: 2000,
};

export const customToast = ({
  status,
  message,
}: {
  status: ToastStatus;
  message: string;
}) => {
  switch (status) {
    case "success":
      toast.success(message, toastOption);
    case "error":
      toast.error(message, toastOption);
  }
};
