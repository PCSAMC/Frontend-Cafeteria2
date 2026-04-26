"use client";

import { useState } from "react";
import { ProductCatalog } from "../components/ProductoCatalogo";
import { CurrentOrder } from "../components/OrdenActual";
import { ShiftInfo } from "../components/InfoTurno";
import { ProcessPaymentModal } from "../components/ModalPorcesarCobro";

export const PantallaPos = () => {
  const [order, setOrder] = useState([]);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // ... (tus productos y funciones handle se mantienen igual)
  const products = [
    { id: 1, nombre: "Café Americano", precio: 15, stock: 50, categoria: "Bebidas" },
    { id: 2, nombre: "Cappuccino", precio: 20, stock: 30, categoria: "Bebidas" },
    { id: 3, nombre: "Sandwich Mixto", precio: 25, stock: 15, categoria: "Comidas" },
    { id: 4, nombre: "Croissant", precio: 12, stock: 2, categoria: "Postres" },
    { id: 5, nombre: "Jugo Natural", precio: 18, stock: 0, categoria: "Bebidas" },
    { id: 6, nombre: "Té Verde", precio: 12, stock: 22, categoria: "Bebidas" },
    { id: 7, nombre: "Empanada", precio: 13, stock: 26, categoria: "Comidas" },
    { id: 8, nombre: "Brownie", precio: 16, stock: 11, categoria: "Postres" },
  ];

  const handleAddProduct = (product) => {
    const existing = order.find((item) => item.id === product.id);
    if (existing) {
      if (existing.cantidad < product.stock) {
        setOrder(order.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ));
      }
    } else {
      setOrder([...order, { ...product, cantidad: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, delta) => {
    setOrder(order.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
    ).filter((item) => item.cantidad > 0));
  };

  const handleRemoveItem = (id) => setOrder(order.filter((item) => item.id !== id));
  const handleClearOrder = () => {
    if (order.length > 0 && confirm("¿Estás seguro?")) setOrder([]);
  };

  const total = order.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

return (
    /* 1. Quitamos 'p-2' y 'gap-3' para que los componentes se toquen.
      2. Quitamos 'max-w' para que rellene toda la pantalla de lado a lado.
    */
    <div className="flex h-full w-full bg-background overflow-hidden">
      
      {/* SECCIÓN IZQUIERDA: Catálogo 
          Usamos 'flex-1' para que sea flexible pero compita con los otros.
      */}
      <div className="flex-1 min-w-0 flex flex-col border-r border-border bg-card">
        <ProductCatalog products={products} onAddProduct={handleAddProduct} />
      </div>

      {/* SECCIÓN CENTRAL: Orden Actual 
          Aumentamos el ancho a 450px para rellenar el espacio y que sea más cómodo.
      */}
      <div className="w-[350px] flex-shrink-0 flex flex-col border-r border-border bg-card">
        <CurrentOrder
          order={order}
          total={total}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearOrder={handleClearOrder}
          onCheckout={() => setPaymentModalOpen(true)}
        />
      </div>

      {/* SECCIÓN DERECHA: Info del Turno
          Aumentamos a 380px para que los paneles laterales tengan peso y el catálogo no sea gigante.
      */}
      <div className="w-[380px] flex-shrink-0 flex flex-col bg-muted/20">
        <ShiftInfo />
      </div>

      <ProcessPaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        order={order}
        total={total}
      />
    </div>
  );
};