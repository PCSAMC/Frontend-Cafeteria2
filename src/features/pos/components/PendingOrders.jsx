"use client";
import { Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PendingOrders = ({ orders = [], onSelectOrder }) => {
  const openOrders = orders.filter(o => o.status === "open");

  return (
    <div className="flex flex-col h-full bg-card border-t border-border">
      <div className="p-4 border-b">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-500" />
          Órdenes Pendientes
          <Badge variant="secondary" className="ml-auto">{openOrders.length}</Badge>
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {openOrders.length === 0 ? (
            <p className="text-[11px] text-center text-muted-foreground py-8">No hay cuentas abiertas</p>
          ) : (
            openOrders.map((o) => (
              <div 
                key={o.id}
                className="p-3 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => onSelectOrder(o)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[11px] font-bold">ORDEN #{o.id}</span>
                  <span className="text-[11px] font-black text-primary">Bs {o.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};