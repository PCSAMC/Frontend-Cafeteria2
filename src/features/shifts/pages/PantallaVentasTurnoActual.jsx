"use client";

import { ArrowLeft, Search, Eye, Ban } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RequestCancellationModal } from "../../pos/components/ModalSolicitarAnulacion";
import { ROUTES } from "@/utils/constants";

export const PantallaVentasTurnoActual = () => {
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sales = [
    { id: "101", time: "14:20", total: 45.00, method: "Efectivo", status: "Completada" },
    { id: "102", time: "14:45", total: 20.00, method: "QR", status: "Completada" },
    { id: "103", time: "15:10", total: 110.00, method: "Efectivo", status: "Anulada" },
  ];

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="border-b bg-card px-6 py-4 flex items-center gap-4">
        <Link href="/pos" className="button button-outline button-icon h-9 w-9">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-xl font-bold">Ventas del Turno Actual</h1>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="card max-w-5xl mx-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input className="input pl-10" placeholder="Buscar venta #ID..." />
            </div>
            <div className="text-sm text-muted-foreground">
              Total ventas: <span className="font-bold text-foreground font-mono">Bs. 175.00</span>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Hora</th>
                  <th className="table-header-cell">ID Venta</th>
                  <th className="table-header-cell">Total</th>
                  <th className="table-header-cell">Método</th>
                  <th className="table-header-cell">Estado</th>
                  <th className="table-header-cell text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {sales.map((sale) => (
                  <tr key={sale.id} className="table-row">
                    <td className="table-cell">{sale.time}</td>
                    <td className="table-cell font-mono font-bold">#{sale.id}</td>
                    <td className="table-cell">Bs. {sale.total.toFixed(2)}</td>
                    <td className="table-cell">
                       <span className="badge badge-secondary">{sale.method}</span>
                    </td>
                    <td className="table-cell">
                       <span className={`badge ${sale.status === 'Anulada' ? 'badge-destructive' : 'badge-outline'}`}>
                        {sale.status}
                       </span>
                    </td>
                    <td className="table-cell text-right flex justify-end gap-2">
                      <Link href={ROUTES.DETALLE_VENTA} className="button button-outline button-sm">
                        <Eye className="h-4 w-4 mr-1" /> Ver
                      </Link>
                      <button 
                        disabled={sale.status === 'Anulada'}
                        onClick={() => { setSelectedSale(sale.id); setIsModalOpen(true); }}
                        className="button button-destructive button-sm"
                      >
                        <Ban className="h-4 w-4 mr-1" /> Anular
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <RequestCancellationModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        saleId={selectedSale} 
      />
    </div>
  );
}