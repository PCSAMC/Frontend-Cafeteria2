// useConfig.ts
import { useState } from 'react';
import { useCrud } from '@/hooks/useCrud'; // Ajusta la ruta
import { globalSettingsService } from './global-settings.service';
import { GlobalSetting, UpdateGlobalSettingDto } from './globla-settings.dto';
import { toast } from 'sonner';

export const useConfig = () => {
  // Instanciamos tu useCrud base
  const crud = useCrud<GlobalSetting, any, UpdateGlobalSettingDto>(globalSettingsService);
  const [isSavingBulk, setIsSavingBulk] = useState(false);

  // Función para guardar múltiples configuraciones de golpe
  const saveAllSettings = async (payload: Record<string, string | number | boolean>) => {
    setIsSavingBulk(true);
    try {
      // Extraemos las claves del payload (ej. ['cash_discrepancy_threshold', 'session_timeout_minutes', ...])
      const keys = Object.keys(payload);

      // Creamos un array de promesas. Por cada key, llamamos a crud.update
      // crud.update enviará internamente: PATCH /api/cafeteria/global-settings/{key} { value: "X" }
      const updatePromises = keys.map((key) => {
        return crud.update(key, { value: payload[key] });
      });

      // Ejecutamos todas las peticiones PATCH en paralelo
      await Promise.all(updatePromises);
      
      toast.success('Todas las configuraciones se guardaron correctamente');
      return true;
    } catch (error) {
      console.error('Error al guardar configuraciones en lote:', error);
      toast.error('Hubo un error al guardar algunas configuraciones');
      return false;
    } finally {
      setIsSavingBulk(false);
    }
  };

  return {
    // Retornamos lo que necesitemos del crud base
    settings: crud.data,
    loadingSettings: crud.loading,
    fetchSettings: crud.getAll,
    
    // Y nuestras funciones personalizadas
    saveAllSettings,
    isSavingBulk,
  };
};