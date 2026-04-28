import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldOff } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

export const PantallaAccesoNoAutorizado = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">

      {/* Decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: "var(--destructive)" }} />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full opacity-[0.03]"
          style={{ background: "var(--navbar)" }} />
      </div>

      <div className="relative w-full max-w-[420px] text-center animate-slide-up">

        {/* Ícono principal */}
        <div className="mx-auto mb-7">
          {/* Anillos decorativos */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full opacity-10"
              style={{ background: "var(--destructive)" }} />
            <div className="absolute inset-3 rounded-full opacity-15"
              style={{ background: "var(--destructive)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "color-mix(in srgb, var(--destructive) 12%, transparent)",
                border: "1.5px solid color-mix(in srgb, var(--destructive) 25%, transparent)",
              }}>
              <ShieldOff size={26} style={{ color: "var(--destructive)" }} />
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--destructive)" }}>
            Error 403
          </p>
          <h1 className="text-2xl font-bold tracking-tight mb-3" style={{ color: "var(--foreground)" }}>
            Acceso no autorizado
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
            No tienes los permisos necesarios para ver esta página.
            Contacta al administrador si crees que esto es un error.
          </p>
        </div>

        {/* Separador */}
        <div className="h-px w-16 mx-auto mb-8" style={{ background: "var(--border)" }} />

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="button button-outline button-md group"
          >
            <ArrowLeft size={14} className="mr-2 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Volver atrás
          </button>
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="button button-default button-md"
          >
            Ir al inicio de sesión
          </button>
        </div>

        {/* Footer */}
        <p className="text-[10px] mt-10 opacity-40" style={{ color: "var(--muted-foreground)" }}>
          Café UCB · Universidad Católica Boliviana · 2025
        </p>
      </div>
    </div>
  );
};