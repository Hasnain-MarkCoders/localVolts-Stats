import React, { useEffect, useState } from 'react';
import { TextField, Box, Typography, Alert } from '@mui/material';
import { useMutation } from '@tanstack/react-query'; // Updated import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../constants';
import { ROUTES } from '../../../routesName';
import { useDispatch } from 'react-redux';
import { saveProfile } from '../../redux/slices/authSlice';
import Button from '../../components/Button';

// React Query function to handle the login request


const Login = () => {
  const dispatch = useDispatch();
const [isLoading, setIsLoading] =  useState(false)
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  const loginRequest = async (credentials) => {
    try{
      setIsLoading(true)
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
  
    }catch(err){
      throw err;
    }
    finally{
      setIsLoading(false)
    }
  };

  const mutation = useMutation({
    mutationFn: loginRequest,
    onError: (err) => {
      console.error(err);
    },
    onSuccess: (data) => {
      // Redirect to the Stats page on successful login
      const profile = { ...data.user, ...data.tokens };
      dispatch(saveProfile({ profile, auth: true }));
      navigate(ROUTES.STATS);
    },
  });

  const { mutate, isError, error } = mutation;

  // Handle form validation
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // Simple email validation check
    if (!email) {
      setEmailError('Email cannot be empty!');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation check (at least 6 characters for this example)
    if (!password) {
      setPasswordError('Password cannot be empty!');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const credentials = { email, password };
      mutate(credentials);
    }
  };



  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextField
               InputLabelProps={{
                shrink: true, // This will keep the label on top
              }}
             className='custom_input_field_style'
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />

            <TextField
               InputLabelProps={{
                shrink: true, // This will keep the label on top
              }}
              className='custom_input_field_style'
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
            isLoading={isLoading}
              fullWidth={true}
              sx={{ mt: 2 }}
              disabled={isLoading}
              title={'Login'}
              cb={(e) => { handleSubmit(e) }}
              type={"submit"}
            />
          </Box>
        </form>

        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error?.response?.data?.message || 'Login failed. Please try again.'}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Login;
