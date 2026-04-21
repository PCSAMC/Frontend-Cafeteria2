import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { ROUTES } from '@/utils/constants';

export const useAuth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    authService.registrarAuditoria("INTENTO_LOGIN", username);

    try {
      const response = await authService.login({ username, password });
      
      authService.registrarAuditoria("LOGIN_EXITOSO", username);
      
      const backendRole = response.user.role.name.toLowerCase();
      let frontendRole = 'cajero'; 
      
      if (backendRole === 'root') {
        frontendRole = 'root';
      } else if (backendRole === 'administrator' || backendRole === 'admin') {
        frontendRole = 'admin';
      } else if (backendRole === 'cashier' || backendRole === 'cajero') {
        frontendRole = 'cajero';
      }

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('userRole', frontendRole); 
      localStorage.setItem('userData', JSON.stringify(response.user));


      
           
            if (frontendRole === 'root') {
                navigate(ROUTES.ROOT_DASHBOARD);
            } else if (frontendRole === 'admin') {
                navigate(ROUTES.DASHBOARD);
            } else {
               
                navigate(ROUTES.PRE_TURNO);
            }
            

    } catch (err: any) {
      authService.registrarAuditoria("LOGIN_FALLIDO", username);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return {
    username, 
    setUsername,
    password, 
    setPassword,
    loading, 
    error,
    handleLogin, 
  
  };
};