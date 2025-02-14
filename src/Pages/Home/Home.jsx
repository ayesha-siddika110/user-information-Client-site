import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Card from './Card';

const Home = () => {
    const axiosPublic = useAxiosPublic()
    const [data, setData] = useState([])

    useEffect(() => {
        axiosPublic.get("/users")
            .then(res => {
                setData(res.data);
            })
    }, [axiosPublic])
    return (
        <div className='bg-slate-200 min-h-screen py-10'>
            <label className="input input-bordered w-[300px] flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
            <div className='grid grid-cols-4 w-[90%]  m-auto  gap-4'>
                {
                    data?.map((item, index) => <Card item={item} key={index}></Card>)
                }
            </div>

        </div>
    );
};

export default Home;