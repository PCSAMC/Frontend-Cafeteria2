// shift.types.ts

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";

export interface ShiftRecord {
  [x: string]: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | (() => ReactNode) | null | undefined;
  id: number;
  initialFund: number;
  declaredAmount: number | null;
  expectedAmount: number | null;
  discrepancy: number | null;
  status: "open" | "closed";
  discrepancyAlert: boolean;
  openedAt: string; // ISO 8601
  closedAt: string | null;
}

// DTO para Abrir Caja
export interface OpenShiftDto {
  initialFund: number;
}

// DTO para Cerrar Caja (Cierre ciego)
export interface CloseShiftDto {
  declaredAmount: number;
}

// Parámetros de búsqueda para el GET (Filtros)
export interface ShiftQueryParams {
  page?: number;
  limit?: number;
  cashierId?: number;
  status?: "open" | "closed";
  from?: string; // Fecha inicio ISO 8601
  to?: string;   // Fecha fin ISO 8601
}