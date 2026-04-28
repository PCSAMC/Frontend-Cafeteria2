// global-settings.types.ts

export interface GlobalSetting {
  key: string;
  value: string;
  description?: string;
  updatedAt?: string;
  // Añadimos 'id' para que sea 100% compatible con tu useCrud
  id: string; 
}

export interface UpdateGlobalSettingDto {
  value: string | number | boolean;
}