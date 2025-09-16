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
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f9f9f9',
            padding: '0',
        }}>
            <div style={{
                padding: '1.5rem', 
                backgroundColor: 'white', 
                borderRadius: '0.375rem', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '100%', 
                maxWidth: '28rem',
            }}>
                <form onSubmit={handleSubmit}>
                    {/* CHANGED: Added text alignment and consistent font family */}
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#1f2937',
                        textAlign: 'center',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>Freelancer Signup</h2>

                    {error && <p style={{
                        color: '#ef4444', 
                        fontSize: '0.875rem', 
                        marginBottom: '0.75rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif' // Added consistent font
                    }}>{error}</p>}

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #d1d5db',
                            padding: '0.5rem',
                            marginBottom: '0.75rem',
                            width: '100%',
                            borderRadius: '0.375rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif', // Added consistent font
                            boxSizing: 'border-box' // Added for consistent sizing
                        }}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #d1d5db',
                            padding: '0.5rem',
                            marginBottom: '0.75rem',
                            width: '100%',
                            borderRadius: '0.375rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif', // Added consistent font
                            boxSizing: 'border-box' // Added for consistent sizing
                        }}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #d1d5db',
                            padding: '0.5rem',
                            marginBottom: '0.75rem',
                            width: '100%',
                            borderRadius: '0.375rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif', // Added consistent font
                            boxSizing: 'border-box' // Added for consistent sizing
                        }}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? '#9ca3af' : '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.375rem',
                            border: 'none',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            width: '100%',
                            fontWeight: '500',
                            fontFamily: 'system-ui, -apple-system, sans-serif', // Added consistent font
                            fontSize: '1rem' // Added consistent font size
                        }}
                        onMouseOver={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = '#1d4ed8';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!loading) {
                                e.target.style.backgroundColor = '#2563eb';
                            }
                        }}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Already have an account */}
                {/* CHANGED: Added consistent font family */}
                <div style={{marginTop: '1rem', textAlign: 'center'}}>
                    <p style={{
                        fontSize: '0.875rem', 
                        color: '#4b5563',
                        fontFamily: 'system-ui, -apple-system, sans-serif' // Added consistent font
                    }}>
                        Already have an account?{ ' ' }
                        <Link 
                            to="/login"
                            style={{
                                color: '#2563eb',
                                fontWeight: '500',
                                fontFamily: 'system-ui, -apple-system, sans-serif', // Added consistent font
                                textDecoration: 'none' // Added for cleaner look
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = '#1e40af';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = '#2563eb';
                            }}
                        >
                            Login
                        </Link>                    
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FreelancerSignupForm;
