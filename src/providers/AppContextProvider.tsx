"use client";

import 'react-toastify/dist/ReactToastify.css';
import {
  createContext,
  useState,
  SetStateAction,
  ReactNode,
  useEffect
} from 'react';
import axiosClient, { setAuthToken } from '@/config/client';
import { onIncompletePaymentFound } from '@/config/payment';
import { AuthResult } from '../constants/pi';
import { IUser } from '@/constants/types';

import logger from '../../logger.config.mjs';

interface IAppContextProps {
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<SetStateAction<IUser | null>>;
  walletAddress: string | null
  registerUser: () => void;
  autoLoginUser: () => void;
  isSigningInUser: boolean;
  reload: boolean;
  alertMessage: string | null;
  setAlertMessage: React.Dispatch<SetStateAction<string | null>>;
  showAlert: (message: string) => void;
  setReload: React.Dispatch<SetStateAction<boolean>>;
  isSaveLoading: boolean;
  setIsSaveLoading: React.Dispatch<SetStateAction<boolean>>;
  adsSupported: boolean;
  toggleNotification: boolean;
  setToggleNotification: React.Dispatch<SetStateAction<boolean>>;
}

const initialState: IAppContextProps = {
  currentUser: null,
  setCurrentUser: () => {},
  walletAddress: '',
  registerUser: () => {},
  autoLoginUser: () => {},
  isSigningInUser: false,
  reload: false,
  alertMessage: null,
  setAlertMessage: () => {},
  showAlert: () => {},
  setReload: () => {},
  isSaveLoading: false,
  setIsSaveLoading: () => {},
  adsSupported: false,
  toggleNotification: false,
  setToggleNotification: () => {},
};

export const AppContext = createContext<IAppContextProps>(initialState);

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSigningInUser, setIsSigningInUser] = useState(false);
  const [reload, setReload] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [adsSupported, setAdsSupported] = useState(false); 
  const [toggleNotification, setToggleNotification] = useState<boolean>(true);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null); // Clear alert after 5 seconds
    }, 5000);
  };

    const loadPiSdk = (): Promise<typeof window.Pi> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.minepi.com/pi-sdk.js';
      script.async = true;
      script.onload = () => resolve(window.Pi);
      script.onerror = () => reject(new Error('Failed to load Pi SDK'));
      document.head.appendChild(script);
    });
  };

  /* Register User via Pi SDK */
  const registerUser = async () => {
    logger.info('Starting user registration.');

    // Ensure Pi SDK is loaded and initialized
    if (typeof window !== 'undefined') {
      if (!window.Pi || !window.Pi.initialized) {
        try {
          const Pi = await loadPiSdk();
          Pi.init({ version: '2.0', sandbox: process.env.NODE_ENV === 'development' });
        } catch (err) {
          logger.error('Failed to load or initialize Pi SDK:', err);
          return;
        }
      }

      if (window.Pi.initialized) {
        try {
          setIsSigningInUser(true);
          const pioneerAuth: AuthResult = await window.Pi.authenticate(
            ['username', 'payments', 'wallet_address'],
            onIncompletePaymentFound
          );
          // setWalletAddress(pioneerAuth.accessToken)
          logger.info("User authenticated with Pi SDK:", {pioneerAuth}); 

          // Send accessToken to backend
          const res = await axiosClient.post(
            "/users/authenticate",
            {},
            {
              headers: {
                Authorization: `Bearer ${pioneerAuth.accessToken}`,
              },
            }
          );

          if (res.status === 200) {
            setAuthToken(res.data.token);
            setCurrentUser(res.data.user);
            const authUser: IUser = res.data;
            logger.info(`User authenticated successfully.`, {authUser});
          } else {
            setCurrentUser(null);
            logger.error('User authentication failed.');
          }
        } catch (error) {
          logger.error('Error during user registration:', error);
        }  finally {
          setTimeout(() => setIsSigningInUser(false), 3000);
        }
      } else {
        logger.error('PI SDK failed to initialize.');
      }
    }
  };

  /* Attempt Auto Login (fallback to Pi auth) */
  const autoLoginUser = async () => {
    logger.info('Attempting to auto-login user.');
    try {
      setIsSigningInUser(true);
      const res = await axiosClient.get('/users/me');

      if (res.status === 200) {
        logger.info('Auto-login successful.');
        setCurrentUser(res.data.user);
      } else {
        logger.warn('Auto-login failed.');
        setCurrentUser(null);
        await registerUser(); // attempt Pi SDK auth if auto-login fails
      }
    } catch (error) {
      logger.error('Auto login unresolved; attempting Pi SDK authentication:', error);
      await registerUser();
    } finally {
      setTimeout(() => setIsSigningInUser(false), 2500);
    }
  };

  useEffect(() => {
    logger.info('AppContextProvider mounted.');

    autoLoginUser();
  }, []);

  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser, 
        walletAddress,
        registerUser, 
        autoLoginUser, 
        isSigningInUser, 
        reload, 
        setReload, 
        showAlert, 
        alertMessage, 
        setAlertMessage, 
        isSaveLoading, 
        setIsSaveLoading, 
        adsSupported,
        toggleNotification,
        setToggleNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;