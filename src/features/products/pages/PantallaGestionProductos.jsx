/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Package, AlertTriangle, Boxes, Pencil, Ban } from "lucide-react";
import { ModalFormProducto } from "../components/ModalFormProducto";
import { ModalConsultarStock} from "../components/ModalConsultarStock";
// Importamos nuestros hooks (ajusta la ruta según tu proyecto)
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { stockMovementsService} from "@/features/inventory/services/stockMovements.service";
import { useStock } from "@/features/inventory/hooks/useStock"; // NUEVO: Importamos el hook de stock

// Funciones de utilidad que ya tenías
const formatearPrecio = (precio) => (precio ? `Bs ${precio}` : "—");
const estadoStock = (stock, min) => stock <= 0 ? "Crítico" : stock <= min ? "Bajo" : "Óptimo";
const barraStock = (stock, min) => stock <= 0 ? "bg-destructive" : stock <= min ? "bg-amber-500" : "bg-primary";
const textoStock = (stock, min) => stock <= 0 ? "text-destructive" : stock <= min ? "text-amber-600 dark:text-amber-400" : "text-primary";
const porcentaje = (stock, min) => Math.max(8, Math.min(100, (stock / Math.max(min * 2, 10)) * 100));

export const PantallaGestionProductos = () => {
  // 1. Usamos nuestros Hooks en lugar de llamar al service directamente
  const { products, loadingProducts, getAllProducts, createProduct, updateProduct } = useProducts();
  const { categories, getAllCategories } = useCategories();
const { createMovement } = useStock();
  // Estados de UI
  const [busqueda, setBusqueda] = useState("");
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState("");
  
  // Modales
  const [openModalProducto, setOpenModalProducto] = useState(false);
  const [openModalStock, setOpenModalStock] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false); // NUEVO: Modal de desactivar
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar datos al montar
  useEffect(() => {
    const cargarTodo = async () => {
      try {
        setError("");
        // Cargamos productos y categorías usando los hooks
        await getAllProducts({ limit: 100, page: 1 });
        await getAllCategories({ limit: 100, page: 1 });
        
        // El historial lo mantenemos igual si aún no tienes el hook
        const movimientosApi = await stockMovementsService.getAll().catch(() => []);
        setHistorial(movimientosApi.slice(0, 4));
      } catch (err) {
        setError("Error al cargar los datos desde la API.");
      }
    };
    cargarTodo();
  }, [getAllProducts, getAllCategories]);

  // Transformamos los datos de la API al formato que espera tu UI
  const productosMapeados = useMemo(() => {
    return products.map(p => ({
      id: p.id,
      nombre: p.name,
      categoria: p.category?.name || "Sin categoría",
      precio: p.salePrice,
      stock: p.currentStock || 0,
      stockMinimo: p.minStock,
      estado: p.active ? "Activo" : "Inactivo",
      descripcion: p.description,
      categoryId: p.category?.id,
      imageUrl: p.imageUrl
    }));
  }, [products]);

  // Filtros locales
  const productosFiltrados = useMemo(
    () =>
      productosMapeados.filter((p) =>
        `${p.nombre} ${p.categoria} ${p.estado}`.toLowerCase().includes(busqueda.toLowerCase())
      ),
    [productosMapeados, busqueda]
  );

  // Cálculos para las Cards
  const productosActivos = productosMapeados.filter((p) => p.estado === "Activo").length;
  const stockBajo = productosMapeados.filter((p) => p.stock > 0 && p.stock <= p.stockMinimo).length;
  const stockCritico = productosMapeados.filter((p) => p.stock <= 0 || p.stock < 3).length;

  // Guardar Producto
  const guardarProducto = async (productoData) => {
    try {
      if (productoData.id) {
        await updateProduct(productoData.id, productoData);
      } else {
        await createProduct(productoData);
      }
      await getAllProducts({ limit: 100, page: 1 }); // Refrescar tabla
      setOpenModalProducto(false);
    } catch (err) {
      alert(`No se pudo guardar en API: ${err.message}`);
    }
  };

  // Desactivar Producto (Soft Delete)
  const desactivarProducto = async () => {
    if (!productoSeleccionado) return;
    try {
      await updateProduct(productoSeleccionado.id, { active: false });
      await getAllProducts({ limit: 100, page: 1 });
      setOpenConfirmModal(false);
      setProductoSeleccionado(null);
    } catch (err) {
      alert(`No se pudo desactivar: ${err.message}`);
    }
  };

  const handleAjusteStock = async (movimientoData) => {
    try {
      // 1. Registramos el movimiento en la API
      await createMovement(movimientoData);
      
      // 2. Refrescamos la lista de productos para que la UI muestre el nuevo stock
      await getAllProducts({ limit: 100, page: 1 });
      
      // 3. Cerramos el modal
      setOpenModalStock(false);
      
    } catch (err) {
      alert(`Error al registrar el movimiento de stock: ${err.message}`);
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ENCABEZADO Y BOTÓN NUEVO (Sin cambios) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gestión de productos y stock</p>
          </div>
          <button
            onClick={() => {
              setProductoSeleccionado(null);
              setOpenModalProducto(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus size={16} /> Nuevo producto
          </button>
        </div>

        {loadingProducts && <div className="text-sm text-muted-foreground">Cargando datos desde API...</div>}

        {/* CARDS (Sin cambios) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card icon={<Package size={18} />} title="Productos activos" value={productosActivos} subtitle="En catálogo POS" />
          <Card icon={<AlertTriangle size={18} />} title="Alertas stock bajo" value={stockBajo} subtitle="Requieren reposición" warn />
          <Card icon={<Boxes size={18} />} title="Stock crítico" value={stockCritico} subtitle="Necesita atención" danger />
        </div>

        {/* TABLA PRINCIPAL */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Catálogo de productos</h2>
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="px-3 py-3 text-left">Producto</th>
                  <th className="px-3 py-3 text-left">Categoría</th>
                  <th className="px-3 py-3 text-left">Precio</th>
                  <th className="px-3 py-3 text-left">Stock</th>
                  <th className="px-3 py-3 text-left">Mínimo</th>
                  <th className="px-3 py-3 text-left">Estado stock</th>
                  <th className="px-3 py-3 text-left">Estado</th>
                  <th className="px-3 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((p) => {
                  const est = estadoStock(p.stock, p.stockMinimo);
                  return (
                    <tr key={p.id} className="border-b border-border last:border-none">
                      <td className="px-3 py-4 flex items-center gap-3 font-medium">
                        {/* NUEVO: Mostramos una miniatura si existe */}
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.nombre} className="w-8 h-8 rounded-md object-cover border border-border" />
                        ) : (
                          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">Img</div>
                        )}
                        {p.nombre}
                      </td>
                      <td className="px-3 py-4"><span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{p.categoria}</span></td>
                      <td className="px-3 py-4">{formatearPrecio(p.precio)}</td>
                      <td className="px-3 py-4 font-medium">{p.stock}</td>
                      <td className="px-3 py-4">{p.stockMinimo}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 w-24 overflow-hidden rounded-full bg-muted">
                            <div className={`h-full rounded-full ${barraStock(p.stock, p.stockMinimo)}`} style={{ width: `${porcentaje(p.stock, p.stockMinimo)}%` }} />
                          </div>
                          <span className={`text-xs font-medium ${textoStock(p.stock, p.stockMinimo)}`}>{est}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${p.estado === "Activo" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{p.estado}</span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setProductoSeleccionado(p); setOpenModalProducto(true); }} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-accent"><Pencil size={13} /> Editar</button>
                          <button onClick={() => { setProductoSeleccionado(p); setOpenModalStock(true); }} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-accent">Stock</button>
                          
                          {/* BOTÓN DESACTIVAR */}
                          <button onClick={() => {
                            if(p.estado === "Inactivo") return alert("El producto ya está inactivo");
                            setProductoSeleccionado(p); 
                            setOpenConfirmModal(true); 
                          }} className="inline-flex items-center gap-1 rounded-lg border border-amber-500/40 px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-500/10">
                            <Ban size={13} /> Desactivar
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        {/* SECCIÓN DE HISTORIAL (Omitida por brevedad, es igual a la tuya) */}
      </div>

      {/* MODALES */}
      <ModalFormProducto open={openModalProducto} onClose={() => setOpenModalProducto(false)} producto={productoSeleccionado} categorias={categories} onSave={guardarProducto} />
<ModalConsultarStock 
        open={openModalStock} 
        onClose={() => setOpenModalStock(false)} 
        producto={productoSeleccionado} 
        productos={productosMapeados} 
        onSave={handleAjusteStock} 
      />
      {/* NUEVO: Modal de Desactivación */}
      {openConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3 text-amber-500">
              <Ban size={24} />
              <h3 className="text-lg font-semibold text-foreground">¿Desactivar producto?</h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              ¿Estás seguro de desactivar <strong>{productoSeleccionado?.nombre}</strong>? No se podrá vender en el POS.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpenConfirmModal(false)} className="rounded-xl border border-border px-4 py-2 text-sm hover:bg-accent">Cancelar</button>
              <button onClick={desactivarProducto} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600">Sí, desactivar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ... Tu componente Card se queda exactamente igual ...

const Card = ({ icon, title, value, subtitle, warn, danger }) => (
  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
    <div className="mb-3 flex items-center gap-3">
      <div
        className={`rounded-xl p-2 ${danger ? "bg-destructive/10 text-destructive" : warn ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "bg-primary/10 text-primary"}`}
      >
        {icon}
      </div>
      <p className="text-sm font-medium">{title}</p>
    </div>
    <p className="text-3xl font-bold">{value}</p>
    <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
  </div>
);
