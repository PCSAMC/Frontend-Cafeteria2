/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";

export const ModalFormularioAdmin = ({ open, onClose, onSubmit, admin = null }) => {
  const isEditing = Boolean(admin);
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        admin
          ? { fullName: admin.fullName, username: admin.username, email: admin.email, password: "" }
          : { fullName: "", username: "", email: "", password: "" }
      );
    }
  }, [open, admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = { ...form };
      if (isEditing && !payload.password) delete payload.password;
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Error al procesar formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">

        {/* HEADER */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            {isEditing ? "Editar" : "Nuevo"} Administrador
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {isEditing
              ? "Modifica los datos del administrador"
              : "Completa los datos para registrar un administrador"}
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre Completo */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Nombre Completo</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              placeholder="Ej. Juan Pérez"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Usuario */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Usuario</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              placeholder="jperez"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="correo@ejemplo.com"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">
              {isEditing ? "Nueva Contraseña (opcional)" : "Contraseña"}
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!isEditing}
              placeholder={isEditing ? "Dejar vacío para no cambiar" : "••••••••"}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Guardando...
                </>
              ) : (
                "Guardar Administrador"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};