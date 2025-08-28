import axios from "axios"
import { useEffect, useState } from "react"
import React from 'react'
import toast from "react-hot-toast"
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/utils";


function Purchases() {
    const [purchases, setPurchases] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    console.log("purchases : ", purchases)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    useEffect(() => {
        // const token = localStorage.getItem("user");
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        const fetchPurchases = async () => {
            if (!token) {
                setErrorMessage("Please login to purchase the courses")
                return;
            }

            try {
                const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
                setPurchases(response.data.courseData);
                setErrorMessage("")
            }
            catch (error) {
                setErrorMessage("Failed to fetch purchase data")
                console.error("Error fetching purchases:", error)
            }
        };
        fetchPurchases()
    }, [])

    const handleLogout = async () => {
        try {
            const response = axios.get(`${BACKEND_URL}/user/logout`, {
                withCredentials: true,
            })
            toast.success((await response).data.message)
            localStorage.removeItem("user")
            setIsLoggedIn(false)
        } catch (error) {
            console.log("Error in logging out", error)
            toast.error(error.response?.data?.errors || "Error in logging out")
        }
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-slate-800 to-slate-900 p-5 shadow-2xl">
                <div className="mb-8">
                    <h2 className="text-white text-xl font-bold tracking-wider">Dashboard</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2"></div>
                </div>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group">
                                <RiHome2Fill className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span className="font-medium">Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/courses" className="flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group">
                                <FaDiscourse className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span className="font-medium">Courses</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/purchases" className="flex items-center text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 shadow-lg">
                                <FaDownload className="mr-3 text-lg" />
                                <span className="font-medium">Purchases</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/settings" className="flex items-center text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group">
                                <IoMdSettings className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                                <span className="font-medium">Settings</span>
                            </Link>
                        </li>

                        <li className="pt-4 border-t border-slate-600">
                            {isLoggedIn ? (
                                <button onClick={handleLogout} className="flex items-center text-gray-300 hover:text-red-400 hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 w-full group">
                                    <IoLogOut className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                                    <span className="font-medium">Logout</span>
                                </button>
                            ) : (
                                <Link to="/login" className="flex items-center text-gray-300 hover:text-green-400 hover:bg-slate-700 rounded-lg p-3 transition-all duration-300 group">
                                    <IoLogIn className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
                                    <span className="font-medium">Login</span>
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        My Purchases
                    </h2>
                    <p className="text-gray-600 text-lg">Your learning journey continues here</p>
                </div>

                {/* Error message */}
                {errorMessage && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-sm">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-red-700 font-medium">{errorMessage}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Render Purchases */}
                {purchases.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                        {purchases.map((purchase, index) => (
                            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                                <div className="relative overflow-hidden">
                                    <img 
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                                        src={purchase.image?.url || "https://via.placeholder.com/200"} 
                                        alt={purchase.title} 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        OWNED
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                        {purchase.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                        {purchase.description?.length > 100 ?
                                            `${purchase.description.slice(0, 100)}...`
                                            : purchase.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                                            ${purchase.price}
                                        </span>
                                        <div className="flex items-center space-x-1">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-green-600 font-medium">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !errorMessage && (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6">
                                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaDownload className="text-4xl text-gray-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Purchases Yet</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Start your learning journey by exploring our amazing courses and make your first purchase.
                                </p>
                                <Link 
                                    to="/courses" 
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <FaDiscourse className="mr-2" />
                                    Browse Courses
                                </Link>
                            </div>
                        </div>
                    )
                )}
            </div>

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

export default Purchases