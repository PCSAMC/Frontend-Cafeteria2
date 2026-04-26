"use client";

import { useState } from "react";
import { X, Calculator, Info } from "lucide-react";

export const CloseShiftModal = ({ open, onClose, totals }) => {
  const [actualCash, setActualCash] = useState("");
  
  if (!open) return null;

  const expectedTotal = totals.cash + totals.initialFund;
  const difference = actualCash ? parseFloat(actualCash) - expectedTotal : 0;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" /> Cierre de Turno
          </h2>
          <button onClick={onClose} className="hover:bg-accent p-1 rounded-full text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground">Ventas en Efectivo</p>
              <p className="text-lg font-bold">Bs. {totals.cash.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground">Fondo Inicial</p>
              <p className="text-lg font-bold">Bs. {totals.initialFund.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
            <label className="text-sm font-semibold text-primary block mb-2 text-center uppercase tracking-wider">
              Efectivo físico en caja
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Bs.</span>
              <input
                type="number"
                className="input h-14 pl-12 text-2xl font-bold text-center focus:ring-primary"
                placeholder="0.00"
                value={actualCash}
                onChange={(e) => setActualCash(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-2 py-1">
            <span className="text-sm">Diferencia:</span>
            <span className={`font-bold ${difference < 0 ? 'text-destructive' : 'text-green-600'}`}>
              Bs. {difference.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 rounded-lg bg-accent/50 p-3 border border-border">
            <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] leading-tight italic">
              Al confirmar, el turno se dará por cerrado y no podrás realizar más ventas hasta abrir uno nuevo.
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 button button-outline">Cancelar</button>
          <button 
            className="flex-1 button button-default"
            onClick={() => window.location.href = '/shifts/close-result'}
          >
            Finalizar Turno
          </button>
        </div>
      </div>
    </div>
  );
};