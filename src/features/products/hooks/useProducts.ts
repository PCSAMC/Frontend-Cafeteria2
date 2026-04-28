// useProducts.ts
import { useState, useCallback } from 'react';
import { useCrud } from '@/hooks/useCrud';
import { productsService } from '../services/products.service';
import { Product, CreateProductDto, UpdateProductDto} from '../dto/product.dto';
import { toast } from 'sonner';

export const useProducts = () => {
  // 1. Inicializamos el CRUD básico
  const { 
    data: products, 
    loading: loadingProducts, 
    getAll, 
    create, 
    update, 
    remove, 
    deactivate 
  } = useCrud<Product, CreateProductDto, UpdateProductDto>(productsService);

  // 2. Estados extras para el endpoint de bajo stock
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loadingLowStock, setLoadingLowStock] = useState<boolean>(false);

  // 3. Función custom para llamar al bajo stock
  const fetchLowStock = useCallback(async () => {
    setLoadingLowStock(true);
    try {
      const result = await productsService.getLowStock();
      setLowStockProducts(result);
      console.log('Productos con bajo stock obtenidos:', result); // Debugging
      return result;
    } catch (err: any) {
      toast.error('Error al obtener productos con bajo stock');
      throw err;
    } finally {
      setLoadingLowStock(false);
    }
  }, []);

  return {
    // Métodos y estado del CRUD general
    products,
    loadingProducts,
    getAllProducts: getAll,
    createProduct: create,
    updateProduct: update,
    deleteProduct: remove, // ¡Aquí sí tienes DELETE en el backend!
    deactivateProduct: deactivate,
    
    // Métodos y estado para Bajo Stock
    lowStockProducts,
    loadingLowStock,
    getLowStockProducts: fetchLowStock,
  };
};