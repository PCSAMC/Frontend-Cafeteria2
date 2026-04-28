// stock.service.ts
import { BaseService, apiClient } from '@/api/base.service'; // Ajusta la ruta a tu base.service
import { 
  StockMovement, 
  CreateStockMovementDto, 
  StockMovementType,
  StockMovementQueryParams
} from '../dtos/stock.dto';

// Servicio para los TIPOS de movimiento (Solo lectura)
class StockMovementTypesService extends BaseService<StockMovementType> {
  constructor() {
    super('/stock-movement-types');
  }
}

// Servicio para los MOVIMIENTOS de stock
class StockMovementsService extends BaseService<StockMovement, CreateStockMovementDto> {
  constructor() {
    super('/stock-movements');
  }

  // Método especial que vimos en tu Swagger: Buscar historial de un solo producto
  async getByProduct(productId: number | string, params: StockMovementQueryParams = {}): Promise<any> {
    const response = await apiClient.get(`${this.endpoint}/by-product/${productId}`, { params });
    return response.data;
  }
}

// Exportamos las instancias listas para usar
export const stockMovementTypesService = new StockMovementTypesService();
export const stockMovementsService = new StockMovementsService();