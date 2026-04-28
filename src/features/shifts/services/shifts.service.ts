// shifts.service.ts
import { BaseService, apiClient } from '@/api/base.service'; // Ajusta la ruta a tu base.service
import { ShiftRecord, OpenShiftDto, CloseShiftDto, ShiftQueryParams } from '../dtos/shift.dto';

export class ShiftsService extends BaseService<ShiftRecord> {
  constructor() {
    super('/shift-records');
  }

  // Método para obtener los turnos del usuario autenticado
  async getMyShifts(params: ShiftQueryParams = {}): Promise<any> {
    const response = await apiClient.get(`${this.endpoint}/mine`, { params });
    return response.data;
  }

  // Método CRÍTICO: Saber si el cajero ya tiene un turno abierto
  async getCurrentShift(): Promise<ShiftRecord | null> {
    try {
      const response = await apiClient.get(`${this.endpoint}/mine/current`);
      // Si hay turno, devolverá el objeto del turno
      return response.data; 
    } catch (error: any) {
      // Normalmente, si no hay turno abierto, una API devuelve 404 (Not Found) o null.
      // Atrapamos el error silenciosamente para no romper la app, ya que es "normal" no tener turno.
      if (error.response && error.response.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Abrir turno
  async openShift(data: OpenShiftDto): Promise<ShiftRecord> {
    const response = await apiClient.post(`${this.endpoint}/open`, data);
    return response.data;
  }

  // Cerrar turno
  async closeShift(data: CloseShiftDto): Promise<ShiftRecord> {
    const response = await apiClient.post(`${this.endpoint}/close`, data);
    return response.data;
  }
}

export const shiftsService = new ShiftsService();