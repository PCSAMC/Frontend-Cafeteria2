import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// En base.service.ts (o base.service.js)
apiClient.interceptors.request.use(
  (config) => {
    // 1. Cambiamos 'token' por 'accessToken' para que coincida con tu Login
    const token = localStorage.getItem('accessToken'); 
    console.log('Token obtenido para la solicitud:', token); // Debugging
    
    // 2. Verificamos que sea un token válido antes de enviarlo
    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Si no hay sesión, nos aseguramos de no enviar basura
      delete config.headers.Authorization;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);
export class BaseService<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Cambiamos el retorno a 'any' o una estructura genérica para soportar la paginación
  async getAll(params: Record<string, any> = {}): Promise<any> {
    console.log('Parámetros para getAll:', params); // Debugging
    const response = await apiClient.get(this.endpoint, { params });
    return response.data;
  }

  async getById(id: string | number): Promise<T> {
    const response = await apiClient.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: CreateDto): Promise<T> {
    const response = await apiClient.post<T>(this.endpoint, data);
    console.log('Respuesta del servidor al crear:', response.data); // Debugging
    return response.data;
  }

  async update(id: string | number, data: UpdateDto): Promise<T> {
    const response = await apiClient.patch<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: string | number): Promise<T> {
    const response = await apiClient.delete<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async deactivate(id: number | string): Promise<void> {
    await apiClient.patch(`${this.endpoint}/${id}/deactivate`);
  }
}