
import { UserEntityDto } from "@/features/users/dtos/user.dto"; 
export interface StockMovementType {
  id: number;
  name: string; // Ej: "sale", "goods_receipt", "manual_adjustment", "shrinkage"
}

// 2. Movimientos de Stock
export interface StockMovement {
  id: number;
  productId: number;
  userId: number;
  user : UserEntityDto;
  quantity: number;
  stockBefore: number;
  stockAfter: number;
  reason: string;
  createdAt: string; // Fecha en ISO 8601
  movementType: StockMovementType;
}

// DTO para registrar un ajuste manual (POST)
export interface CreateStockMovementDto {
  productId: number;
  movementTypeId: number;
  quantity: number; // Puede ser positivo o negativo
  reason: string;
}

// Parámetros de búsqueda para el GET (Filtros)
export interface StockMovementQueryParams {
  page?: number;
  limit?: number;
  productId?: number;
  movementTypeId?: number;
  from?: string; // Fecha inicio ISO 8601
  to?: string;   // Fecha fin ISO 8601
}