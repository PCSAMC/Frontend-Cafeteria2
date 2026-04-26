"use client";

import { AlertCircle, X } from "lucide-react";

export const RequestCancellationModal = ({ open, onClose, saleId }) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" /> Solicitar Anulación
          </h2>
          <button onClick={onClose} className="hover:bg-accent p-1 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <p className="text-sm">
            Estás solicitando anular la venta <span className="font-bold">#{saleId}</span>. 
            Esta acción requiere aprobación de un administrador.
          </p>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Motivo de la anulación</label>
            <textarea 
              className="input min-h-[100px] resize-none py-2" 
              placeholder="Ej: Error en método de pago, cliente desistió, etc..."
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 button button-outline">Cancelar</button>
          <button className="flex-1 button button-destructive">Enviar Solicitud</button>
        </div>
      </div>
    </div>
  );
};