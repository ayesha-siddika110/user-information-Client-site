import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Card from "./Card";

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState();
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);

    useEffect(() => {
        if (search.trim() !== "") {
            axiosPublic.get(`/users?search=${search}`).then((res) => {
                setData(res.data);
                
                setSuggestions(res.data); 
            });
        } else {
            axiosPublic.get(`/users?search=${search}`).then((res) => {
                setData(res.data);
            setSuggestions([]);
            });
            
        }
    }, [axiosPublic, search]);

    const handleSelectSuggestion = (value) => {
        setSearch(value);
        setShowSuggestions(false);
    };

    return (
        <div className="bg-slate-200 min-h-screen py-10">
            <p className="text-center text-3xl font-semibold py-3">| All Users</p>
            <div className="relative w-[300px] mx-auto">
                <label className="input input-bordered w-full flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowSuggestions(true);
                        }}
                        placeholder="Search User"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>

                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white w-full shadow-lg rounded-lg mt-1">
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="p-2 text-black hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelectSuggestion(item.fullName)}
                            >
                                {item.fullName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="grid grid-cols-4 w-[90%] m-auto gap-4 mt-5">
                {data?.map((item, index) => (
                    <Card item={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Home;
