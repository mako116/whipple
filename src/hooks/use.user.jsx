import toast from "react-hot-toast";
import SummaryApi from "../ApiRoute/SummaryApi"
import Axios from "../utlis/Axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AxiosToastError from "../utlis/AxiosToastError";
 
const fetchUserDetails =  async()=>{
    try {
        const response = await Axios({ 
            ...SummaryApi.userDetails
        })
        return response.data
    } catch (error) {
        console.log(error);
          
    } 
}

export default fetchUserDetails

// Login cache register 
export const useUserDetailsUser = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUserDetails,
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