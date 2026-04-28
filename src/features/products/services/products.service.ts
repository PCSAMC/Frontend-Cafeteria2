// products.service.ts
import { BaseService, apiClient } from '@/api/base.service'; // Asegúrate de importar el apiClient si lo necesitas para rutas custom
import { Product, CreateProductDto, UpdateProductDto } from '../dto/product.dto'; // Ajusta la ruta según tu proyecto

export class ProductsService extends BaseService<Product, CreateProductDto, UpdateProductDto> {
  constructor() {
    super('/products');
  }

  // Método personalizado para el endpoint de bajo stock
  async getLowStock(): Promise<Product[]> {
    // Usamos el apiClient directamente para este endpoint especial
    const response = await apiClient.get(`${this.endpoint}/low-stock`);
    
    // Asumimos que devuelve un array directo basado en tu Swagger
    return response.data; 
  }
}

export const productsService = new ProductsService();