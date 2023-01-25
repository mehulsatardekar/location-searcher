import { toast } from "react-hot-toast";

const useToast = () => {
  const notifySuccess = (successMsg: string) =>
    toast(successMsg, {
      icon: "👏",
      duration: 5000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

  return { notifySuccess };
};

export { useToast };
