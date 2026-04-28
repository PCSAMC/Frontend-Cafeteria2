// category.types.ts
export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export interface CreateCategoryDto {
  name: string;
  active: boolean;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

// NUEVO: Interfaz para los parámetros de búsqueda y paginación
export interface CategoryQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  active?: boolean;
}