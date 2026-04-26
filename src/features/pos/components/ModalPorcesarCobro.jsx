"use client";

import { useState } from "react";
import {
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeftRight,
  CheckCircle2,
} from "lucide-react";

export const ProcessPaymentModal = ({
  open,
  onClose,
  order,
  total,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashReceived, setCashReceived] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cardAmount, setCardAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");

  if (!open) return null;

  const calculateChange = () => {
    if (paymentMethod === "cash") {
      const received = parseFloat(cashReceived) || 0;
      return Math.max(0, received - total);
    }
    return 0;
  };

  const validateMixedPayment = () => {
    const cash = parseFloat(cashAmount) || 0;
    const card = parseFloat(cardAmount) || 0;
    const transfer = parseFloat(transferAmount) || 0;
    const sum = cash + card + transfer;
    return { sum, isValid: sum === total, difference: total - sum };
  };

  const handleConfirmPayment = () => {
    if (paymentMethod === "cash" && parseFloat(cashReceived) < total) {
      alert("El monto recibido es menor al total");
      return;
    }

    if (paymentMethod === "mixed" && !validateMixedPayment().isValid) {
      alert("La suma de los montos debe ser igual al total");
      return;
    }

    // TODO: Procesar venta y generar comprobante
    console.log("Procesando venta:", {
      order,
      total,
      paymentMethod,
      cashReceived,
    });

    // Redirigir a comprobante
    window.location.href = `/pos/receipt/12345`;
  };

  const mixedValidation = validateMixedPayment();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-xl font-semibold text-foreground">
            Procesar Cobro
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Selecciona el método de pago y confirma la transacción
          </p>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          {/* Resumen de la venta */}
          <div className="mb-6 rounded-xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-medium text-foreground">
                Resumen de productos
              </span>
              <span className="text-sm text-muted-foreground">
                {order.length} {order.length === 1 ? "item" : "items"}
              </span>
            </div>
            <div className="space-y-2">
              {order.slice(0, 3).map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.cantidad}x {item.nombre}
                  </span>
                  <span className="font-medium text-foreground">
                    Bs. {(item.precio * item.cantidad).toFixed(2)}
                  </span>
                </div>
              ))}
              {order.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  + {order.length - 3} productos más
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between border-t border-border pt-3">
              <span className="text-lg font-semibold text-foreground">
                TOTAL A COBRAR
              </span>
              <span className="text-2xl font-bold text-primary">
                Bs. {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Método de Pago
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                  paymentMethod === "cash"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <Banknote
                  className={`h-6 w-6 ${paymentMethod === "cash" ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${paymentMethod === "cash" ? "text-primary" : "text-foreground"}`}
                  >
                    Efectivo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pago en billetes/monedas
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <CreditCard
                  className={`h-6 w-6 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${paymentMethod === "card" ? "text-primary" : "text-foreground"}`}
                  >
                    Tarjeta
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Débito o crédito
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                  paymentMethod === "transfer"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <Smartphone
                  className={`h-6 w-6 ${paymentMethod === "transfer" ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${paymentMethod === "transfer" ? "text-primary" : "text-foreground"}`}
                  >
                    Transferencia
                  </p>
                  <p className="text-xs text-muted-foreground">QR / Banca móvil</p>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("mixed")}
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors ${
                  paymentMethod === "mixed"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:bg-accent"
                }`}
              >
                <ArrowLeftRight
                  className={`h-6 w-6 ${paymentMethod === "mixed" ? "text-primary" : "text-muted-foreground"}`}
                />
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${paymentMethod === "mixed" ? "text-primary" : "text-foreground"}`}
                  >
                    Pago Mixto
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Varios métodos
                  </p>
                </div>
              </button>
            </div>

            {/* Campos según método */}
            <div className="mt-6 space-y-4">
              {paymentMethod === "cash" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Monto recibido
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Bs.
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-lg font-semibold outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {cashReceived && parseFloat(cashReceived) >= total && (
                    <div className="rounded-xl bg-primary/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          Vuelto
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          Bs. {calculateChange().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}

              {paymentMethod === "card" && (
                <div className="rounded-xl border border-border bg-primary/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="text-sm text-foreground">
                      Procesando pago con tarjeta... (Simulación)
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "transfer" && (
                <div className="rounded-xl border border-border bg-primary/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <p className="text-sm text-foreground">
                      Esperando confirmación de transferencia... (Simulación)
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "mixed" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Monto en efectivo
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Bs.
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Monto con tarjeta
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Bs.
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={cardAmount}
                        onChange={(e) => setCardAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Monto por transferencia
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        Bs.
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-xl border border-border bg-background py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div
                    className={`rounded-xl border p-4 ${
                      mixedValidation.isValid
                        ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                        : "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                    }`}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">
                        Suma total:
                      </span>
                      <span className="font-bold text-foreground">
                        Bs. {mixedValidation.sum.toFixed(2)}
                      </span>
                    </div>
                    {!mixedValidation.isValid && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {mixedValidation.difference > 0
                          ? `Faltan Bs. ${mixedValidation.difference.toFixed(2)}`
                          : `Sobran Bs. ${Math.abs(mixedValidation.difference).toFixed(2)}`}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmPayment}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Confirmar Venta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};