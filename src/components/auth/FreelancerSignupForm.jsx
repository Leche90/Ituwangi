import React, { useState } from 'react';
import { freelancerSignup } from '../../api/freelancerApi';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const FreelancerSignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            await freelancerSignup(formData);
            navigate('/login');
        } catch (err) {
            if (err.response?.status === 409) {
                setError("Email already exists. Please use a different email or login.");
            } else {
                setError(err.message || "Signup failed. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-white rounded shadow-md w-full max-w-md'>
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Freelancer Signup</h2>

                {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className='border p-2 mb-3 w-full rounded'
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className='border p-2 mb-3 w-full rounded'
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className='border p-2 mb-3 w-full rounded'
                    required
                />
                <button
                    type="submit"
                    className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            {/* Already have an account */}
            <div className='mt-4 text-center'>
                <p className='text-sm text-gray-600'>
                    Already have an account?{ ' ' }
                    <Link to="/login"
                    className='text-blue-600 hover:-text-800 font-medium'>
                        Login
                    </Link>                    
                </p>
            </div>
        </div>
    );
};

export default FreelancerSignupForm;

