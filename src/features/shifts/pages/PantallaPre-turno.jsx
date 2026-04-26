"use client";

import { useState } from "react";
import { Clock, User, Calendar } from "lucide-react";
import { OpenShiftModal } from "../components/ModalAperturaTurno";

export const PantallaPreTurno = () => {
  const [openModal, setOpenModal] = useState(false);

  // Simulación de datos del cajero
  const cashierData = {
    name: "Juan Pérez",
    lastSession: "2024-04-20 14:30",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Card principal */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              No tienes un turno activo
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Debes abrir turno para comenzar a operar
            </p>
          </div>

          {/* Información del cajero */}
          <div className="space-y-3 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Usuario:</span>
              <span className="font-medium text-foreground">
                {cashierData.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Fecha actual:</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Hora actual:</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          {/* Última sesión */}
          <div className="mt-4 rounded-xl bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Última sesión</p>
            <p className="mt-1 text-sm font-medium text-foreground">
              {cashierData.lastSession}
            </p>
          </div>

          {/* Botón principal */}
          <button
            onClick={() => setOpenModal(true)}
            className="mt-6 w-full rounded-xl bg-primary py-3 text-base font-semibold text-primary-foreground shadow-lg hover:opacity-90"
          >
            Abrir Turno
          </button>
        </div>

        {/* Nota informativa */}
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-center text-xs text-muted-foreground">
            Al abrir turno, deberás ingresar el fondo de caja inicial para
            comenzar las operaciones.
          </p>
        </div>
      </div>

      {/* Modal de apertura */}
      <OpenShiftModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        cashierName={cashierData.name}
      />
    </div>
  );
}