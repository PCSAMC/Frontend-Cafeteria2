"use client";

import { ArrowLeft, Printer, Trash2, Calendar, Clock, User, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";import { useState } from "react";
import { RequestCancellationModal } from "../components/ModalSolicitarAnulacion";

export const PantallaDetalleVenta = ({ params }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Simulación de datos de la venta (esto vendría de tu API usando params.id)
  const sale = {
    id: params.id || "101",
    fecha: "21/04/2026",
    hora: "14:20",
    cajero: "Juan Pérez",
    metodoPago: "Efectivo",
    estado: "Completada",
    items: [
      { id: 1, nombre: "Café Americano", cantidad: 2, precio: 15.00 },
      { id: 3, nombre: "Sandwich Mixto", cantidad: 1, precio: 25.00 },
    ],
    subtotal: 55.00,
    descuento: 0.00,
    total: 55.00,
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/shifts/current-sales" className="button button-outline button-icon">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Detalle de Venta #{sale.id}</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Estado: <span className="text-green-600 font-bold">{sale.estado}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()}
            className="button button-outline flex items-center gap-2"
          >
            <Printer className="h-4 w-4" /> Re-imprimir Ticket
          </button>
          <button 
            onClick={() => setIsCancelModalOpen(true)}
            className="button button-destructive flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" /> Solicitar Anulación
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Información General */}
          <div className="md:col-span-1 space-y-6">
            <div className="card p-5 space-y-4">
              <h3 className="font-semibold border-b pb-2">Información</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="ml-auto font-medium">{sale.fecha}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Hora:</span>
                  <span className="ml-auto font-medium">{sale.hora}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Cajero:</span>
                  <span className="ml-auto font-medium">{sale.cajero}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Pago:</span>
                  <span className="ml-auto badge badge-secondary">{sale.metodoPago}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Tabla de Productos y Totales */}
          <div className="md:col-span-2 space-y-6">
            <div className="card overflow-hidden">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">Producto</th>
                    <th className="table-header-cell text-center">Cant.</th>
                    <th className="table-header-cell text-right">P. Unitario</th>
                    <th className="table-header-cell text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {sale.items.map((item) => (
                    <tr key={item.id} className="table-row">
                      <td className="table-cell font-medium">{item.nombre}</td>
                      <td className="table-cell text-center">{item.cantidad}</td>
                      <td className="table-cell text-right">Bs. {item.precio.toFixed(2)}</td>
                      <td className="table-cell text-right font-bold">
                        Bs. {(item.cantidad * item.precio).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-muted/30 p-6 space-y-2">
                <div className="flex justify-end gap-12 text-sm text-muted-foreground">
                  <span>Subtotal:</span>
                  <span className="w-24 text-right font-medium text-foreground">
                    Bs. {sale.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end gap-12 text-sm text-muted-foreground">
                  <span>Descuento:</span>
                  <span className="w-24 text-right font-medium text-foreground">
                    Bs. {sale.descuento.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-end gap-12 text-xl font-bold pt-2 border-t border-border/50">
                  <span className="text-primary">TOTAL:</span>
                  <span className="w-32 text-right text-primary">
                    Bs. {sale.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Modal de Anulación */}
      <RequestCancellationModal 
        open={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        saleId={sale.id}
      />
    </div>
  );
}