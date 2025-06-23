import   { useContext, useEffect, useRef, useState } from 'react'
 
import { useLocation, useNavigate } from 'react-router-dom';
import SuccessModal from './modalPopup';
import SummaryApi from '../../ApiRoute/SummaryApi';
import Axios from '../../utlis/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../../utlis/AxiosToastError';
import { AuthContext } from '../../context/authContext';
// import SuccessModal from '../../components/modals/authSucces/sucessModal/successpopup';
// import { setUserDetails } from '../store/userSlice';

const OTPPAge = () => {
    const [data, setData] = useState(["","","",""])
    const [modalVisible,setModalVisible]= useState(false)
     const navigate = useNavigate()
   const {userDetails, setUserDetails} = useContext(AuthContext)
   
    const inputRef = useRef([])
    const location = useLocation()
    console.log('location',location);
    
    useEffect(()=>{
      if(!location?.state?.email){
        navigate('/signup')
      }
    },[])
    const valideValue = Object.values(data).every(el => el)

   const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.otp_verify, 
                data :{
                  otp : data.join(""),
                  email : location?.state?.email
                }
            })
            console.log("solved",response)
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                  // Save user details to context
                 setUserDetails(response?.user);
                // setUserDetails(userDetails.data)
                 setData(["","","",""])

                 navigate("/login",{
                  state : {
                    data: response.data,
                    email : location?.state?.email
                  }
                 })
 
            }
        } catch (error) {
            AxiosToastError(error)
        }
        
    }
    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
              <h2 className='text-center font-bold'>Otp</h2>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                    <div className='grid gap-1'>
                        <label htmlFor='email'>OTP :</label>
                        <div className='flex items-center gap-2 justify-around'>
                          {
                            data.map((otp,index)=>{
                              return(
                            <input
                            key={'otp'+index}
                            type='text'
                            id='otp'
                            ref={(ref)=>{
                              inputRef.current[index] = ref
                              return ref
                            }}
                            value={data[index]}
                            onChange={(e)=>{
                              const value = e.target.value
                              console.log('valie',value);
                              
                              const newData = [ ...data]
                              newData[index]= value
                              setData(newData)

                              if(value && index < 3){
                                inputRef.current[index+1].focus()
                              }
                            }}
                            maxLength={1}
                            className='bg-blue-50 w-full max-w-16 p-2 
                            border rounded outline-none 
                            focus:border-primary-200 text-center font-normal'
                           />
                              )
                            })
                          }
                        </div>
                        
                    </div>
                    
    
                    <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }   
                       text-white py-2 rounded font-semibold my-3 tracking-wide`}>
                        verify OTP</button>

                </form>

               
            </div>
            {/* popup */}
                  <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            
        </section>
    )
}

export default OTPPAge
