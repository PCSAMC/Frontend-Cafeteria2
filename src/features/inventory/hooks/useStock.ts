// useStock.ts
import { useState, useCallback } from 'react';
import { useCrud } from '../../../hooks/useCrud';
import { stockMovementsService, stockMovementTypesService } from '../services/stockMovements.service';
import { 
  StockMovement, 
  CreateStockMovementDto, 
  StockMovementType,
  StockMovementQueryParams 
} from '../dtos/stock.dto';
import { toast } from 'sonner';

export const useStock = () => {
  // 1. Hook base para los Movimientos (para crear y listar el global)
  const { 
    data: movements, 
    loading: loadingMovements, 
    getAll: getAllMovements, 
    create: createMovement 
    // Omitimos intencionalmente update, remove y deactivate porque no existen/no se deben usar aquí
  } = useCrud<StockMovement, CreateStockMovementDto, any>(stockMovementsService);

  // 2. Estados extra para el Historial por Producto y los Tipos de Movimiento
  const [movementTypes, setMovementTypes] = useState<StockMovementType[]>([]);
  const [productHistory, setProductHistory] = useState<StockMovement[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // 3. Obtener los tipos de movimiento (para tu select del modal)
  const fetchMovementTypes = useCallback(async () => {
    setLoadingTypes(true);
    try {
      const result = await stockMovementTypesService.getAll({ limit: 100 }); 
      // Si viene paginado, extraemos el array
      const dataArray = Array.isArray(result) ? result : (result.data || result.items || []);
      setMovementTypes(dataArray);
      return dataArray;
    } catch (err: any) {
      toast.error('Error al cargar tipos de movimiento');
    } finally {
      setLoadingTypes(false);
    }
  }, []);

  // 4. Obtener el historial de un producto específico
  const fetchProductHistory = useCallback(async (productId: number | string, params?: StockMovementQueryParams) => {
    setLoadingHistory(true);
    try {
      const result = await stockMovementsService.getByProduct(productId, params);
      const dataArray = Array.isArray(result) ? result : (result.data || result.items || []);
      setProductHistory(dataArray);
      return dataArray;
    } catch (err: any) {
      toast.error('Error al cargar el historial del producto');
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  return {
    // Para la pantalla de Historial General
    movements,
    loadingMovements,
    getAllMovements,
    
    // Para el Modal de Ajuste de Stock
    movementTypes,
    loadingTypes,
    fetchMovementTypes,
    createMovement,
    
    // Para la vista detallada de un producto
    productHistory,
    loadingHistory,
    fetchProductHistory
  };
};