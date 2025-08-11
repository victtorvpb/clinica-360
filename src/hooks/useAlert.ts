import { toast, ToastOptions } from 'react-toastify';

// Configuração padrão para todos os toasts
const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

export const useAlert = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultToastOptions, ...options });
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultToastOptions, ...options });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultToastOptions, ...options });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultToastOptions, ...options });
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, { ...defaultToastOptions, ...options });
  };

  const dismiss = (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    dismiss,
  };
};
