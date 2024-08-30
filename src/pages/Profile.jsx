import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import Sidebar from '../components/SideBar';
import { useSelector } from 'react-redux';
import { fetchUserData } from '../firebase/UserApi';
import profile from '../assets/profile.jpeg'
import Loading from '../components/Loading/loading';

const ProfilePage = () => {
    const profileData = useSelector((state) => state.userSlice.user);
    const [userDetails, setUserDetails] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchUserData(profileData).then((res) => {
            setUserDetails(res);
            setLoading(false);
        }).catch((err) => {
            console.log(err.message);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {!loading ? (
                <div 
                className= "min-h-screen bg-gray-900 text-white p-6 shadow-lg bg-cover bg-center"
                style={{ backgroundImage: "url('https://res.cloudinary.com/dlcnf8yfh/image/upload/v1724984478/Free_Photo___Nice_day_with_blue_sky_wsm20m.jpg')" }}
                >
                    <div className='flex justify-between'>
                        <div className='py-20 px-7'>
                            <Sidebar />
                        </div>
                        <div className="flex justify-center items-center min-h-screen w-full">
                            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8 max-w-md w-full">
                                <div className="text-center mb-8">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white border-opacity-50 shadow-lg mb-4">
                                        <img className='w-full h-full object-cover' src={profile} alt="Profile" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-white">{userDetails?.name}</h1>
                                </div>

                                <div className="flex items-center justify-center text-white mb-4">
                                    <Mail className="w-5 h-5 mr-3 text-blue-300" />
                                    <span>{userDetails?.email}</span>
                                </div>

                                <div className="mt-8 flex justify-center space-x-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    );
};

export default ProfilePage;