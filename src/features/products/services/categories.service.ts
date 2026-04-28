// category.service.ts
import { BaseService } from '@/api/base.service'; // Ajusta la ruta según tu proyecto
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto'; // Ajusta la ruta

export class CategoryService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor() {
    // Heredamos la funcionalidad de BaseService pasándole el endpoint específico
    super('/categories'); 
  }
}

// Exportamos una instancia única (Singleton) para usarla en nuestro hook
export const categoryService = new CategoryService();