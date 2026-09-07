import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import LoginBG from '../assets/login_bg.png'
import GithubIcon from '../assets/github.png'
import axios from 'axios'

const Register = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false);

    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        email: '',
        username: '',
        password: '',
        confirm: ''
    })

    const [errors, setErrors] = useState({})

    const [profilePicFile, setProfilePicFile] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicFile(file);
            const previewUrl = URL.createObjectURL(file);
            setProfilePicPreview(previewUrl);
            // Clear any previous profile pic error
            if (errors.profilePic) {
                setErrors((prev) => ({ ...prev, profilePic: undefined }));
            }
        }
    }

    const removeProfilePic = () => {
        if (profilePicPreview) {
            URL.revokeObjectURL(profilePicPreview);
        }
        setProfilePicFile(null);
        setProfilePicPreview(null);
        // Reset file input value so same file can be re-selected
        const fileInput = document.getElementById('profilePicInput');
        if (fileInput) fileInput.value = '';
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        const newErrors = {}
        if(!formData.fName) {
            newErrors.fName = 'Enter your first name'
        } if(!formData.lName) {
            newErrors.lName = 'Enter your last name'
        } if(!formData.email) {
            newErrors.email = 'Enter your email'
        } if(!formData.username) {
            newErrors.username = 'Enter your username'
        } if(!formData.password) {
            newErrors.password = 'Enter your password'
        } if(!formData.confirm) {
            newErrors.confirm = 'Reenter your password'
        } if(formData.password !== formData.confirm) {
            newErrors.confirm = 'Password and confirm password must match'
        }

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setErrors({})
        setLoading(true)

        try {
            let profilePicKey = null;

            if (profilePicFile) {
                setUploadLoading(true);
                try {
                    // 1. Get signed URL
                    const urlRes = await axios.get(`${API_URL}/profile/upload-url`);
                    const signedUrl = urlRes.data.signedUrl;

                    // 2. Extract token from the signed URL
                    const urlObj = new URL(signedUrl);
                    const token = urlObj.searchParams.get('token');
                    console.log(token)

                    // 3. Upload file via PUT with Authorization header
                    const putRes = await axios.put(signedUrl, profilePicFile, {
                        headers: {
                            'Content-Type': profilePicFile.type,
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    // 4. Get the Key from the response
                    profilePicKey = putRes.data.Key;
                    setUploadLoading(false);

                } catch (uploadErr) {
                    console.error('Upload error:', uploadErr);
                    setErrors((prev) => ({
                        ...prev,
                        profilePic: 'Failed to upload profile picture. Please try again.',
                    }));
                    setLoading(false);
                    setUploadLoading(false);
                    return;
                }
                setUploadLoading(false);
            }

            const registrationData = {
                ...formData,
                profilePicKey,
            };

            const res = await axios.post(`${API_URL}/auth/register`, registrationData);

            if(res.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.error(error)
            setErrors(error.response?.data || { general: 'Registration failed' })
        } finally {
            setLoading(false)
        }
    }
  return (
        <div
            className="flex justify-center bg-cover min-h-screen bg-center items-center py-5"
            style={{ backgroundImage: `url(${LoginBG})` }}
        >
            <form
                onSubmit={handleRegister}
                className="flex flex-col w-1/3 border border-white/20 px-3 py-10 rounded-4xl items-center gap-5 shadow-xl bg-white/10 backdrop-blur-md text-white"
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                    <h1 className="text-4xl font-bold tracking-wide">Clover</h1>
                    <div className="flex flex-col items-center">
                        <h2 className="text-2xl">Create your account</h2>
                        <small className="text-gray-300">
                            Already have an account?{' '}
                            <Link to="/" className="underline hover:text-white transition">
                                Log In
                            </Link>
                        </small>
                    </div>
                </div>

                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center w-2/3">
                    <label className="text-sm font-medium">Profile Picture</label>
                    <div className="flex items-center gap-4 mt-1">
                        {/* Preview */}
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 bg-white/10 flex items-center justify-center">
                            {profilePicPreview ? (
                                <img
                                    src={profilePicPreview}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    className="w-10 h-10 text-white/50"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="profilePicInput"
                                className="cursor-pointer px-4 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition"
                            >
                                Choose Image
                            </label>
                            <input
                                id="profilePicInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {profilePicPreview && (
                                <button
                                    type="button"
                                    onClick={removeProfilePic}
                                    className="text-xs text-red-300 hover:text-red-200 text-left"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                    {errors.profilePic && (
                        <p className="text-red-300 text-sm mt-1">{errors.profilePic}</p>
                    )}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="fName">First Name</label>
                    <input
                        type="text"
                        name="fName"
                        id="fName"
                        className="border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="John"
                        value={formData.fName}
                        onChange={(e) => setFormData({ ...formData, fName: e.target.value })}
                    />
                    {errors.fName && <p className="text-red-300 text-sm mt-1">{errors.fName}</p>}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="lName">Last Name</label>
                    <input
                        type="text"
                        name="lName"
                        id="lName"
                        className="border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="Doe"
                        value={formData.lName}
                        onChange={(e) => setFormData({ ...formData, lName: e.target.value })}
                    />
                    {errors.lName && <p className="text-red-300 text-sm mt-1">{errors.lName}</p>}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="cool@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="border border-white/20 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="coolest_username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    {errors.username && <p className="text-red-300 text-sm mt-1">{errors.username}</p>}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        className="border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="totally hard to guess password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="flex flex-col w-2/3">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input
                        type="password"
                        name="confirm"
                        id="confirm"
                        className="border border-gray-400 bg-white/20 rounded-xl p-3 outline-none focus:ring-2 focus:ring-white transition"
                        placeholder="totally hard to guess password's twin"
                        value={formData.confirm}
                        onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
                    />
                    {errors.confirm && <p className="text-red-300 text-sm mt-1">{errors.confirm}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading || uploadLoading}
                    className="border border-white/50 w-2/3 rounded-4xl py-2 bg-white/10 cursor-pointer hover:bg-white/40 transition duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading || uploadLoading ? (
                        <div className="flex justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        'Register'
                    )}
                </button>

                <button
                    type="button"
                    className="border border-gray-400 w-2/3 rounded-4xl py-2 bg-white text-black cursor-pointer hover:bg-gray-100 transition duration-300 hover:scale-[1.02]"
                >
                    Continue as guest
                </button>

                <div className="flex items-center w-1/2 gap-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-500 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <button
                    type="button"
                    className="border w-2/3 rounded-4xl flex justify-center items-center gap-5 py-2 bg-white text-black cursor-pointer hover:bg-gray-100 transition duration-300 hover:scale-[1.02]"
                >
                    <img src={GithubIcon} alt="github icon" width={35} />
                    <p>Continue using GitHub</p>
                </button>
            </form>
        </div>
    )
}

export default Register