import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import SummaryApi from '../ApiRoute/SummaryApi';
import Axios from '../utlis/Axios';
import AxiosToastError from '../utlis/AxiosToastError';

// Axios Requests Register
export const registerUser = async (data) => {
  const response = await Axios({
    ...SummaryApi.register,
    data
  });
  return response.data;
}; 
// login
export const loginUser = async (data) => {
  const response = await Axios({
    ...SummaryApi.login,
    data
  });
  return response.data;
}; 

// signup cache register 
export const useRegisterUser = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      if (response.error) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      // Optionally refetch other queries or reset caches here
      queryClient.invalidateQueries(['authList']);

    if (onSuccessCallback) onSuccessCallback(response);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";

      toast.error(errorMessage);

      if (error && "isAxiosError" in error && error.isAxiosError && !error.response) {
        // Handle network error
        toast.error("Network error. Please check your internet connection.");
      }

      AxiosToastError(error);
    },
    onSettled: (error) => {
      if (error && "isAxiosError" in error && error.isAxiosError && !error.response) {
        toast.error("Network error. Please check your internet connection.");
      }
    },
    retry: false, // Optional: disable retries for registration
  });
};

// Login cache register 
export const useLoginUser = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.error) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      // Optionally refetch other queries or reset caches here
      queryClient.invalidateQueries(['authList']);

if (onSuccessCallback) onSuccessCallback(response);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";

      toast.error(errorMessage);

      if (error && "isAxiosError" in error && error.isAxiosError && !error.response) {
        // Handle network error
        toast.error("Network error. Please check your internet connection.");
      }

      AxiosToastError(error);
    },
    onSettled: (error) => {
      if (error && "isAxiosError" in error && error.isAxiosError && !error.response) {
        toast.error("Network error. Please check your internet connection.");
      }
    },
    retry: false, // Optional: disable retries for registration
  });
};
