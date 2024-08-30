import React from 'react';
import { FaCloud } from 'react-icons/fa';
import wishlist from '../assets/wishlist.png';
import weather from '../assets/weather.png';
import logout from '../assets/logout.png';
import profile from '../assets/user.png';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")

        navigate('/')
    };

    return (
     <div className="md:h-screen md:w-16 w-full flex md:flex-col flex-row items-center justify-between md:justify-start md:py-8 md:space-y-8 p-4 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg">
            <div className="md:mb-0 mb-4">
                <img className='w-16 h-12' src={weather} alt="Weather" />
            </div>

            <nav className="flex md:flex-col flex-row items-center md:space-y-10 space-x-4 md:space-x-0">
                <Link to="/weather" className="flex items-center">
                    <button className="text-gray-200 hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20">
                        <FaCloud className="text-2xl w-8 h-8" />
                    </button>
                </Link>

                <Link to="/profile" className="flex items-center">
                    <button className="text-gray-200 hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20">
                        <img className="w-8 h-8" src={profile} alt="Profile" />
                    </button>
                </Link>
                <Link className="flex items-center">
                    <button className="text-gray-200 hover:text-white transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20">
                        <img className="w-8 h-8" src={wishlist} alt="Wishlist" />
                    </button>
                </Link>
            </nav>

            <div className="md:mt-auto mt-0">
                <button 
                    className="text-white hover:text-white transition-colors font-serif  rounded-full hover:bg-white hover:bg-opacity-20" 
                    onClick={handleLogout}
                >
                    <img className="w-6 h-6" src={logout} alt="Logout" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;