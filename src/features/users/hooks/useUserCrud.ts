import { useState, useCallback } from 'react';
import { useCrud } from '@/hooks/useCrud';
import { userService } from '../services/user.service';
import { UserEntityDto, CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { toast } from 'sonner';
import { data } from 'react-router-dom';

export const useUserCrud = () => {
  const crud = useCrud<UserEntityDto, CreateUserDto, UpdateUserDto>(userService);
  
  const [admins, setAdmins] = useState<UserEntityDto[]>([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
const [cashiers, setCashiers] = useState<UserEntityDto[]>([]); 
  const [loading, setLoading] = useState(false);
  const getAdministrators = useCallback(async () => {
    setLoadingAdmins(true);
    try {
      const data = await userService.getAdmins();
      console.log('Administradores obtenidos:', data); 
      setAdmins(data);
    } catch (err: any) {
      toast.error('Error al cargar administradores');
    } finally {
      setLoadingAdmins(false);
    }
  }, []);


const getCashiers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.getCashiers();
      setCashiers(data);
      console.log("Cajeros cargados:", data);
    } catch (error) {
      console.error("Error al cargar cajeros:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  

  return {
    ...crud,
    admins,
    loadingAdmins,
    getAdministrators,
    getCashiers,
    cashiers,
    loadingCashiers: loading
  };
};