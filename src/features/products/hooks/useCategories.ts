// useCategories.ts
import { useCrud } from '@/hooks/useCrud'; // Ajusta la ruta según tu proyecto
import { categoryService } from '../services/categories.service'; // Ajusta la ruta
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto'; // Ajusta la ruta

export const useCategories = () => {
  // Inicializamos useCrud con nuestra entidad y DTOs, pasándole la instancia del servicio
  const { 
    data: categories, // Renombramos 'data' a 'categories' para que sea más semántico
    loading, 
    getAll, 
    create, 
    update, 
    remove, 
    deactivate 
  } = useCrud<Category, CreateCategoryDto, UpdateCategoryDto>(categoryService);

  return {
    categories,
    loading,
    getAllCategories: getAll,
    createCategory: create,
    updateCategory: update,
    deleteCategory: remove,
    deactivateCategory: deactivate
  };
};