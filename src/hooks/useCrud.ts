import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// En tu archivo donde está useCrud (ej. useCrud.ts)

export interface CrudService<T, CreateDto, UpdateDto> {
  getAll(params?: Record<string, any>): Promise<any>; // <-- CAMBIA T[] por any
  getById(id: string | number): Promise<T>;
  create(data: CreateDto): Promise<T>;
  update(id: string | number, data: UpdateDto): Promise<T>;
  delete(id: string | number): Promise<T>;
  deactivate(id: number | string): Promise<void>;
}

export const useCrud = <T extends { id: string | number }, CreateDto, UpdateDto>(
  serviceInstance: CrudService<T, CreateDto, UpdateDto>
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

const getAll = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const result = await serviceInstance.getAll(params);
      
      // LA MAGIA ESTÁ AQUÍ: 
      // Si result es un arreglo, lo usamos tal cual. 
      // Si es un objeto (paginado), buscamos la propiedad donde vienen los datos (usualmente .data o .items)
      const dataArray = Array.isArray(result) 
        ? result 
        : (result.data || result.items || []);
        
      setData(dataArray); // Ahora sí, guardamos un arreglo real
      return result;
    } catch (err) {
      toast.error('Error al obtener los datos');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceInstance]);
  const create = async (newData: CreateDto) => {
    console.log('Datos para crear:', newData); // Debugging
    setLoading(true);
    try {
      const result = await serviceInstance.create(newData);
      setData((prev) => [...prev, result]);
      toast.success('Creado exitosamente');
      console.log('Resultado de la creación:', result); // Debugging
      return result;
    } catch (err: any) {
      toast.error('Error al crear');
      console.error('Error al crear:', err); // Debugging
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string | number, updatedData: UpdateDto) => {
    setLoading(true);
    try {
      const result = await serviceInstance.update(id, updatedData);
      setData((prev) => prev.map((item) => (item.id === id ? result : item)));
      toast.success('Actualizado correctamente');
      return result;
    } catch (err: any) {
      toast.error('Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string | number) => {
    setLoading(true);
    try {
      await serviceInstance.delete(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      toast.success('Eliminado correctamente');
    } catch (err: any) {
      toast.error('Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  };
const getById = useCallback(async (id: string | number) => {
    setLoading(true);
    try {
      return await serviceInstance.getById(id);
    } catch (err) {
      toast.error('Error al obtener el registro');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [serviceInstance]);
  const deactivate = async (id: number | string) => {
    setLoading(true);
    try {
      await serviceInstance.deactivate(id);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading,getById, getAll, create, update, remove, deactivate };
};