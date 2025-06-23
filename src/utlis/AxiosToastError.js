import toast from 'react-hot-toast'

const AxiosToastError = (error) => {
    toast.error(
 error?.response?.data?.message || "An unknown error occurred"    )
}

export default AxiosToastError
   