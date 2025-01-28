import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_URL } from 'src/api'; // Ensure BASE_URL is defined in './api'
import { useRouter } from 'next/router';// Import useRouter from next/router

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated =
        window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      let user = null;
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          user = JSON.parse(storedUser); // Parse only if the user exists
        }
      } catch (err) {
        console.error('Error parsing user data from localStorage:', err);
      }

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessage]);

  const signIn = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/`, {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      dispatch({
        type: HANDLERS.SIGN_IN,
      });
      
      if (response.data.is_staff) {
        router.push('/');
      } else {
        router.push('/user');
      }
      const message = response.data.message || 'Login successful';
      setSuccessMessage(message);
      setErrorMessage('');
      return { message, success: true }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      setErrorMessage(errorMessage);
      setSuccessMessage(''); // Clear any previous success message
      throw new Error(errorMessage);
      
    }
    
  };
  // const signIn = async (username, password) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/token/`, { username, password });
  //     const { access, refresh, is_staff } = response.data;

  //     // Log the response for debugging
  //     console.log('Sign-in response:', response.data);

  //     if (!is_staff) {
  //       throw new Error('User role is missing or invalid');
  //     }

  //     localStorage.setItem('access_token', access);
  //     localStorage.setItem('refresh_token', refresh);
  //     window.sessionStorage.setItem('authenticated', 'true');

  //     dispatch({
  //       type: HANDLERS.SIGN_IN,
  //       payload: { is_staff }
  //     });

  //     if (is_staff) {
  //       router.push('/');
  //     } else {
  //       router.push('/user');
  //     }
  //   } catch (err) {
  //     console.error('Error during sign-in:', err);
  //     throw new Error('Please check your username and password');
  //   }
  // };

  const signUp = async (email, name, password) => {
    try {
      await axios.post(`${BASE_URL}/auth/signup/`, { email, name, password });
      // Handle sign-up success (e.g., auto sign-in, redirect, etc.)
    } catch (err) {
      console.error('Error during sign-up:', err);
      throw new Error('Sign-up failed');
    }
  };

  const signOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.sessionStorage.removeItem('authenticated');

    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        successMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
