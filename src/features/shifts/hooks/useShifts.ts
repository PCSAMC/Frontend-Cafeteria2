// useShifts.ts
import { useState, useCallback } from 'react';
import { useCrud } from '@/hooks/useCrud';
import { shiftsService } from '../services/shifts.service';
import { ShiftRecord, ShiftQueryParams } from '../dtos/shift.dto';
import { useShiftContext } from '../contexts/shiftContext'; // <-- Importamos el contexto
import { toast } from 'sonner';

export const useShifts = () => {
  // 1. Obtenemos el estado centralizado y sincronizado desde el Contexto
  const { 
    currentShift, 
    loadingCurrent, 
    fetchCurrentShift, 
    openShift, 
    closeShift 
  } = useShiftContext();

  // 2. Funciones administrativas heredadas del CRUD base (Se quedan locales)
  const { 
    data: allShifts, 
    loading: loadingAllShifts, 
    getAll: getAllShifts, 
    getById: getShiftById
  } = useCrud<ShiftRecord, any, any>(shiftsService);

  // 3. Historial personal del cajero (Se queda local porque no afecta rutas)
  const [myShifts, setMyShifts] = useState<ShiftRecord[]>([]);
  const [loadingMyShifts, setLoadingMyShifts] = useState(false);

  const fetchMyShifts = useCallback(async (params?: ShiftQueryParams) => {
    setLoadingMyShifts(true);
    try {
      const result = await shiftsService.getMyShifts(params);
      const dataArray = Array.isArray(result) ? result : (result.data || result.items || []);
      setMyShifts(dataArray);
      return dataArray;
    } catch (err: any) {
      toast.error('Error al cargar tu historial de turnos');
      throw err;
    } finally {
      setLoadingMyShifts(false);
    }
  }, []);

  return {
    // Administrativo
    allShifts,
    loadingAllShifts,
    getAllShifts,
    getShiftById,
    
    // Cajero - Estados
    currentShift,
    loadingCurrent,
    myShifts,
    loadingMyShifts,
    
    // Cajero - Acciones
    fetchCurrentShift,
    fetchMyShifts,
    openShift,  // Viene del contexto
    closeShift  // Viene del contexto
  };
};