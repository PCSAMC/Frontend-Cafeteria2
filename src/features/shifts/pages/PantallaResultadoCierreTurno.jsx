"use client";

import { CheckCircle2, Download, LogOut, FileText } from "lucide-react";
import { Link } from "react-router-dom";
export const PantallaResultadoCierreTurno = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card w-full max-w-lg overflow-hidden animate-fade-in">
        <div className="bg-primary p-8 text-primary-foreground text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold">Turno Cerrado Exitosamente</h1>
          <p className="text-primary-foreground/80 mt-1 text-sm">21 de Abril, 2026 — 18:00</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resumen Final</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm border-b pb-4">
              <span className="text-muted-foreground">Ventas Totales:</span>
              <span className="text-right font-bold">Bs. 1,450.00</span>
              <span className="text-muted-foreground">Efectivo Esperado:</span>
              <span className="text-right font-bold font-mono">Bs. 1,150.00</span>
              <span className="text-muted-foreground">Diferencia:</span>
              <span className="text-right font-bold text-green-600">Bs. 0.00</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="button button-default w-full py-6 text-base flex gap-2">
              <Download className="h-5 w-5" /> Descargar Informe (PDF)
            </button>
            <button className="button button-outline w-full py-6 text-base flex gap-2">
              <FileText className="h-5 w-5" /> Enviar por Correo
            </button>
          </div>

          <div className="pt-4 border-t">
            <Link 
              href="/shifts/pre-shift" 
              className="button button-ghost w-full flex gap-2 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Salir del Sistema
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}