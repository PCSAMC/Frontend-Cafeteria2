// global-settings.service.ts
import { BaseService } from '@/api/base.service'; // Ajusta la ruta
import { GlobalSetting, UpdateGlobalSettingDto } from './globla-settings.dto';

class GlobalSettingsService extends BaseService<GlobalSetting, any, UpdateGlobalSettingDto> {
  constructor() {
    // Apunta al endpoint exacto de tu Swagger
    super('/global-settings');
  }

  // Sobrescribimos getAll para adaptar los datos a tu useCrud
  async getAll(params: Record<string, any> = {}): Promise<any> {
    const response = await super.getAll(params);
    
    // Verificamos si la respuesta viene paginada (en response.data)
    if (response && response.data && Array.isArray(response.data)) {
      response.data = response.data.map((item: any) => ({
        ...item,
        id: item.key // Clave para que useCrud no falle
      }));
    } else if (Array.isArray(response)) {
      // Por si en algún momento lo devuelves directo sin paginar
      return response.map((item: any) => ({
        ...item,
        id: item.key
      }));
    }
    
    return response;
  }
}

export const globalSettingsService = new GlobalSettingsService();