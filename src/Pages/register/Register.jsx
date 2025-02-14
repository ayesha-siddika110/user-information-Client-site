

// import SocialLogin from '../../Share/SocialLogin/SocialLogin';
import { FaArrowLeft } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import animation from '../../assets/login-regis.json'
import Lottie from 'lottie-react';

// import useAuth from '../../Hooks/useAuth';

const Register = () => {


    const image_hosting_key = import.meta.env.VITE_ImageBB_apiKey;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic()

    const { signUpUser, updateProfileData } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = async (data) => {

        // image hosting 
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        signUpUser(data?.email, data?.password)
            .then(response => {
                // console.log(response)

                const updateDatas = {
                    displayName: data?.name,
                    photoURL: res.data.data.display_url
                }
                // console.log(updateDatas);

                updateProfileData(updateDatas)
                    .then(response => {
                        const userData = {
                            fullName: data.name,
                            userName: data?.userName,
                            Gender: data?.Gender,
                            country: data?.country,
                            email: data?.email,
                            dateOfBirth: data?.dateOfBirth,
                            photo: res.data.data.display_url,

                        }
                        console.log(userData);

                        axiosPublic.post(`/users`, userData)
                            .then(res => {
                                console.log(res.data);
                                if (res.data.insertedId) {
                                    toast.success('Successfully Register & save to database')
                                    navigate("/")
                                }
                                

                            })


                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message)

                    })
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)

            })

    }
    return (
        <div>

            <div
                className='py-10 bg-sky-100 flex flex-col justify-center items-center'

            >

                <div className='w-[90%] h-full m-auto flex justify-center items-center'>

                    <form onSubmit={handleSubmit(onSubmit)} className=' bg-sky-200  lg:m-6 md:w-[50%] w-[90%] lg:w-[40%]  lg:p-10 p-5 space-y-3 border'>
                        <div className=' pl-[5%]'>

                            <Link className='cursor-pointer w-20  bg-[#0693be48] flex items-center py-2 px-2 gap-2' to="/"> <FaArrowLeft /> Home</Link>
                        </div>
                        <p className='text-4xl text-center text-black font-semibold'>Register Now!</p>
                        {/* name */}
                        <div className='form-control'>
                            <p className='text-black'>Full Name *</p>

                            <input {...register("name", { required: true })} type="text" placeholder="Type your name" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                        </div>
                        {errors.name && <span className='text-red-600'>This field is required</span>}
                        {/* username */}
                        <div className='form-control'>
                            <p className='text-black'>User Name *</p>

                            <input {...register("userName", { required: true })} type="text" placeholder="Type your name" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                        </div>
                        {errors.userName && <span className='text-red-600'>This field is required</span>}
                        {/* photo & gender */}
                        <div className='md:flex items-center gap-4'>
                            <div className='form-control'>
                                <label htmlFor="" className="text-black   pb-2" >Upload Image *</label>
                                <input
                                    type="file"
                                    className="file-input bg-white text-black file-input-bordered w-full max-w-xs" {...register("image")} />
                            </div>
                            <div className='form-control'>
                                <label htmlFor="" className="font-semibold text-gray-700  pb-2">Gender *</label>

                                <select className="select bg-sky-100 text-black select-bordered w-full" {...register("Gender")}>
                                    <option disabled selected>Select Gender?</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Others</option>
                                </select>
                                {errors.Gender && <span className='text-red-600'>This field is required</span>}
                            </div>

                            {errors.image && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className='md:flex items-center gap-4'>
                            {/* date of birth */}
                            <div className='form-control'>
                                <p className='text-black'>Date Of birth *</p>

                                <input type="date" {...register("dateOfBirth", { required: true })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                            </div>
                            {errors.dateOfBirth && <span className='text-red-600'>This field is required</span>}
                            {/* country */}
                            <div className='form-control'>
                                <p className='text-black'>Country Name *</p>

                                <input type="text" {...register("country", { required: true })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                            </div>
                            {errors.country && <span className='text-red-600'>This field is required</span>}
                        </div>
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
                                pattern: {
                                    value:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/,
                                    message:
                                        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
                                },
                            })} placeholder="Type here" className=" py-3 px-4 input-bordered w-full bg-white text-black" />
                        </div>
                        {errors.password && <span className='text-red-600'>This field is required</span>}
                        {errors.password && <span className='text-red-600'>{errors.password.message}</span>}

                        <div>
                            <button className='bg-sky-700 w-full text-center py-3 text-white mt-3'>Register</button>

                        </div>
                        {/* <SocialLogin></SocialLogin> */}
                        <Link to="/login" className='hover:underline text-black flex'>Already have an Account ? please  <p className='pl-2 font-semibold'> Login</p></Link>
                    </form>
                    <div className='w-[50%] hidden lg:flex'>
                    <Lottie animationData={animation} loop={true} />
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Register;