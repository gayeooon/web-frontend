import useIsMounted from "@/hooks/useIsMounted";
import { BadgeAlert, BadgeCheck } from "lucide-react";
import { useState, createContext, useContext } from "react";

function Toast({ type, message, onClick }) {
  const isMounted = useIsMounted(100);

  const baseClassName =
    "flex rounded-lg px-6 py-3 justify-center items-center gap-2 relative transition-all duration-500 ease-in-out opacity-0 -top-2";

  const typeStyles = {
    info: "bg-green-400 text-white font-bold ",
    error: "bg-red-400 text-white font-bold",
  };

  const visibilityClass = isMounted ? "opacity-100 top-0" : "";

  return (
    <div
      className={`${baseClassName} ${typeStyles[type]} ${visibilityClass}`}
      onClick={onClick}
    >
      {type === "info" ? <BadgeCheck /> : <BadgeAlert />}
      <span>{message}</span>
    </div>
  );
}

const ToasterContext = createContext();

function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(type, message) {
    const newToast = {
      id: Date.now(),
      type,
      message,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
    return newToast;
  }

  function removeToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function toaster(type, message) {
    const newToast = addToast(type, message);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 1500);
  }

  return (
    <ToasterContext.Provider value={{ toaster }}>
      {children}
      <div className="fixed flex flex-col-reverse gap-3 z-50 top-12 left-1/2 -translate-x-1/2 transition-[height] duration-500 ease-in-out">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const { toaster } = useContext(ToasterContext);
  if (!toaster) {
    throw new Error("ToastContext 안에서만 사용할 수 있습니다.");
  }
  return toaster;
}

export default ToasterProvider;
