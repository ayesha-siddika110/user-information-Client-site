
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { FaArrowLeft } from 'react-icons/fa';
import animation from "../../assets/login-regis.json";
import Lottie from 'lottie-react';

const Login = () => {

    const navigate = useNavigate()
    const { signInUser } = useAuth()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {
        signInUser(data?.email, data?.password)
            .then(response => {
                // console.log(response)
                toast.success("successfully Login")
                navigate("/")
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)

            })}
    return (
        <div>

        <div
            className='py-10 bg-sky-100 flex flex-col justify-center items-center'

        >

            <div className='w-[90%] h-full m-auto flex justify-center items-center'>

                <form onSubmit={handleSubmit(onSubmit)} className=' bg-sky-200  lg:m-6 md:w-[50%] w-[90%] lg:w-[40%]  lg:p-10 p-5 space-y-3 border'>
                    <div className=' pl-[5%]'>

                        <Link className='cursor-pointer w-20  bg-sky-700 flex items-center py-2 px-2 gap-2' to="/"> <FaArrowLeft /> Home</Link>
                    </div>
                    <p className='text-4xl text-center text-black font-semibold'>Login Now!</p>
                  
                    
                   
                    
                    {/* email */}
                    <div className='form-control'>
                        <p className='text-black'>Email *</p>

                        <input type="email" {...register("email", { required: true })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                    </div>
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                    <div className='form-control'>
                        <p className='text-black'>Password *</p>

                        <input type="password" {...register("password", {
                            required: true,
                        })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                    </div>
                    {errors.password && <span className='text-red-600'>This field is required</span>}

                    <div>
                        <button className='bg-sky-700 w-full text-center py-3 text-white mt-3'>Login</button>

                    </div>
                    {/* <SocialLogin></SocialLogin> */}
                    <Link to="/register" className='hover:underline text-black flex'>New User ? please  <p className='pl-2 font-semibold'> Register</p></Link>
                </form>
                <div className='w-[50%] hidden lg:flex'>
                <Lottie animationData={animation} loop={true} />
                </div>


            </div>
        </div>
    </div>
    );
};

export default Login;