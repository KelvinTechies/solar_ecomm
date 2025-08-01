import { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const useLoggedInUser = () => {
    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
    
    const getLoggedInUser = async () => {
        try {
            const authToken = localStorage.getItem('token');
            
            if (!authToken) {
                // toast.warning('You are not Logged in')
                navigate('/login');
                return;
            }
            
            const response = await api.get('api/user', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            
            // Directly return the data so we can use it immediately
            const userData = response.data.data;
            setAuth(userData);
            return userData;
            
        } catch (error) {
            console.error('Failed to fetch logged-in user:', error.message);
            return null;
        }
    };

    // Add useEffect to fetch user data on mount
    useEffect(() => {
        getLoggedInUser();
    }, []); // Empty dependency array means this runs once on mount

    return {
        auth,
        getLoggedInUser,
        // Add a refetch method that can be called to manually update the data
        refetchUser: getLoggedInUser
    };
};

export default useLoggedInUser;