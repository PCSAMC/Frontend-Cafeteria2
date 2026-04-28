// product.types.ts

// Interfaz para la categoría anidada que devuelve el GET de productos
export interface ProductCategoryInfo {
  id: number;
  name: string;
  active: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  salePrice: number;
  currentStock: number;
  minStock: number;
  imageUrl: string;
  active: boolean;
  category: ProductCategoryInfo;
}

// DTO para el POST (Nota: currentStock no se envía al crear según tu Swagger)
export interface CreateProductDto {
  categoryId: number;
  name: string;
  description: string;
  salePrice: number;
  minStock: number;
  imageUrl: string;
  active: boolean;
}

// DTO para el PATCH
export type UpdateProductDto = Partial<CreateProductDto>;

// Parámetros de query para el GET /api/cafeteria/products
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  active?: boolean;
  categoryId?: number; // ¡Nuevo filtro específico de productos!
}