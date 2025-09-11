import React, { useState, useContext } from 'react';
import { freelancerLogin } from '../../api/freelancerApi';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const FreelancerLoginForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await freelancerLogin(credentials);
            localStorage.setItem("token", data.access_token);
            login(data);
            navigate('/freelancer/dashboard');
        } catch (err) {
            setError(err.message || "Login failed. Please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-6 bg-white rounded shadow-md w-full max-w-md'>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Freelancer Login</h2>

                {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                    className='border p-2 mb-3 w-full rounded'
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    className='border p-2 mb-3 w-full rounded'
                    required
                />
                <button
                    type='submit'
                    disabled={loading}
                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <div className='mt-4 text-center'>
                <p className='text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <Link to="/signup"
                    className='text-blue-600 hover:text-blue-800 font-medium'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default FreelancerLoginForm;
