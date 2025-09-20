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
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || "Login failed. Please try again");
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
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#1f2937',
                        textAlign: 'center',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                        Freelancer Login
                    </h2>

                    {error && <p style={{
                        color: '#ef4444', 
                        fontSize: '0.875rem', 
                        marginBottom: '0.75rem',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>{error}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #d1d5db',
                            padding: '0.5rem',
                            marginBottom: '0.75rem',
                            width: '100%',
                            borderRadius: '0.375rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            boxSizing: 'border-box'
                        }}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        style={{
                            border: '1px solid #d1d5db',
                            padding: '0.5rem',
                            marginBottom: '0.75rem',
                            width: '100%',
                            borderRadius: '0.375rem',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            boxSizing: 'border-box'
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
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            fontSize: '1rem'
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div style={{marginTop: '1rem', textAlign: 'center'}}>
                    <p style={{
                        fontSize: '0.875rem', 
                        color: '#4b5563',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}>
                        Don’t have an account?{' '}
                        <Link 
                            to="/signup"
                            style={{
                                color: '#2563eb',
                                fontWeight: '500',
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                textDecoration: 'none'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = '#1e40af';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = '#2563eb';
                            }}
                        >
                            Sign Up
                        </Link>                    
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FreelancerLoginForm;