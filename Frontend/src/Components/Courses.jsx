import React, { useState, useEffect } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { FaStar, FaUsers, FaClock, FaPlay } from "react-icons/fa";
import logo from '../../public/logo1.png'
import { BACKEND_URL } from '../../utils/utils';

function Courses() {
    const [courses, setCourses] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    console.log("courses : ", courses)

    useEffect(() => {
        // const token = localStorage.getItem("user")
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.token) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [])

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get(`${BACKEND_URL}/user/logout`, {
                withCredentials: true,
            })
            toast.success(response.data.message)
            localStorage.removeItem("user")
            setIsLoggedIn(false)
            navigate('/')
        } catch (error) {
            console.log("Error in logging out", error)
            toast.error(error.response?.data?.errors || "Error in logging out")
        }
    }

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/course/courses`, {
                    withCredentials: true
                })
                console.log(response.data.courses)
                setCourses(response.data.courses)
                setLoading(false)
            }
            catch (error) {
                console.log("error in fetchCourses", error);
                setLoading(false)
            }
        }
        fetchCourses()
    }, [])

    const filteredCourses = courses.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className='flex min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
            {/* Sidebar */}
            <aside className='w-64 bg-gradient-to-b from-slate-800 to-slate-900 h-screen p-5 fixed shadow-2xl z-10'>
                <div className='flex items-center mb-10'>
                    <img src={logo} alt="Logo" className='rounded-full h-12 w-12 ring-4 ring-blue-400 shadow-lg' />
                    <div className="ml-3">
                        <h3 className="text-white font-bold text-lg">EduPlatform</h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                    </div>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className='flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group'>
                                <span className='mr-3 group-hover:scale-110 transition-transform duration-300'>
                                    <RiHome2Fill />
                                </span>
                                <span className="font-medium">Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/courses" className='flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 shadow-lg'>
                                <span className='mr-3'>
                                    <FaDiscourse />
                                </span>
                                <span className="font-medium">Courses</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/purchases" className='flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group'>
                                <span className='mr-3 group-hover:scale-110 transition-transform duration-300'>
                                    <FaDownload />
                                </span>
                                <span className="font-medium">Purchases</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/settings" className='flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group'>
                                <span className='mr-3 group-hover:scale-110 transition-transform duration-300'>
                                    <IoMdSettings />
                                </span>
                                <span className="font-medium">Settings</span>
                            </Link>
                        </li>

                        <li className="pt-4 border-t border-slate-600">
                            {isLoggedIn ? (
                                <button 
                                    onClick={handleLogout} 
                                    className='flex items-center text-gray-300 hover:text-red-400 hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 w-full group'
                                >
                                    <span className='mr-3 group-hover:scale-110 transition-transform duration-300'>
                                        <IoLogOut />
                                    </span>
                                    <span className="font-medium">Logout</span>
                                </button>
                            ) : (
                                <Link to='/login' className='flex items-center text-gray-300 hover:text-green-400 hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group'>
                                    <span className='mr-3 group-hover:scale-110 transition-transform duration-300'>
                                        <IoLogIn />
                                    </span>
                                    <span className="font-medium">Login</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className='ml-64 flex-1 p-8'>
                {/* Header */}
                <header className='bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
                                Discover Courses
                            </h1>
                            <p className="text-gray-600">Unlock your potential with our premium courses</p>
                        </div>
                        <div className='flex items-center space-x-4'>
                            <div className='flex items-center bg-gray-50 rounded-full shadow-inner border border-gray-200'>
                                <input 
                                    type='text' 
                                    placeholder='Search courses...' 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='bg-transparent rounded-l-full px-6 py-3 h-12 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                                <button className='h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-r-full px-6 flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg'>
                                    <FiSearch className='text-xl text-white' />
                                </button>
                            </div>

                            <div className="relative">
                                <FaCircleUser className='text-5xl text-blue-600 hover:text-purple-600 transition-colors duration-300 cursor-pointer' />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                            <div className="text-sm text-gray-500">Total Courses</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">4.8</div>
                            <div className="text-sm text-gray-500">Average Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">50K+</div>
                            <div className="text-sm text-gray-500">Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">Expert</div>
                            <div className="text-sm text-gray-500">Instructors</div>
                        </div>
                    </div>
                </header>

                {/* Courses Section */}
                <div className='overflow-y-auto max-h-[calc(100vh-300px)]'>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-blue-200 border-top-blue-600 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FaPlay className="text-blue-600 text-xl" />
                                </div>
                            </div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaDiscourse className="text-5xl text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {searchTerm ? "No courses found" : "No courses available"}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {searchTerm ? "Try adjusting your search terms" : "No courses have been posted by admin yet"}
                                </p>
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm("")}
                                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in'>
                            {filteredCourses.map((course) => (
                                <div key={course._id} className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100'>
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={course.image?.url} 
                                            alt={course.title} 
                                            className='w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500' 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Course Badge */}
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                            HOT
                                        </div>
                                        
                                        {/* Rating */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                                            <FaStar className="text-yellow-400 text-sm" />
                                            <span className="text-sm font-semibold">4.8</span>
                                        </div>

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <FaPlay className="text-white text-xl ml-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='p-6'>
                                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <FaUsers className="text-xs" />
                                                <span>2.5K students</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <FaClock className="text-xs" />
                                                <span>12 hours</span>
                                            </div>
                                        </div>

                                        <h2 className='font-bold text-xl mb-3 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>
                                            {course.title}
                                        </h2>
                                        
                                        <p className='text-gray-600 mb-4 line-clamp-3 leading-relaxed'>
                                            {course.description?.length > 120
                                                ? `${course.description.slice(0, 120)}...`
                                                : course.description}
                                        </p>

                                        <div className='flex justify-between items-center mb-6'>
                                            <div>
                                                <span className='text-3xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent'>
                                                    ₹{course.price}
                                                </span>
                                                <span className='text-gray-500 line-through text-lg ml-2'>₹5999</span>
                                                <div className="text-green-600 text-sm font-semibold mt-1">20% OFF</div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-100 to-green-50 px-3 py-1 rounded-full">
                                                <span className='text-green-700 font-semibold text-sm'>Best Seller</span>
                                            </div>
                                        </div>

                                        {/* Buy Button */}
                                        <Link 
                                            to={`/buy/${course._id}`} 
                                            className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center shadow-lg hover:shadow-xl transform hover:scale-105'
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <span>Buy Now</span>
                                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default Courses