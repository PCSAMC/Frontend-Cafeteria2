"use client";

import React, { useState } from "react";
import { Search, Coffee, UtensilsCrossed, Cake, Package, Grid3x3, List, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categoryIcons = {
  Bebidas: Coffee,
  Comidas: UtensilsCrossed,
  Postres: Cake,
  Snacks: Package,
};

export const ProductCatalog = ({ products, onAddProduct }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["Todos", ...new Set(products.map((p) => p.categoria))];

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.nombre.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "Todos" || p.categoria === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    /* CAMBIO CLAVE: Quitamos max-w-4xl y ponemos w-full y flex-1 */
    /* Esto hará que el catálogo ocupe TODO el espacio disponible del padre */
    <div className="flex h-full w-full flex-1 flex-col  border-r border-border/40">
      
      {/* HEADER COMPACTO */}
      <div className="px-5 pt-6 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Catálogo</h2>
            <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
              {filteredProducts.length} productos
            </p>
          </div>
          
          <div className="flex border border-border bg-card rounded-lg p-0.5 shadow-sm">
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="sm" className="h-7 w-7 p-0" onClick={() => setViewMode("list")}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border-border/50 h-9 pl-9 text-sm rounded-lg"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 h-7 text-[10px] font-bold border-none shadow-sm transition-all ${
                selectedCategory === cat 
                ? "bg-navbar text-navbar-foreground" 
                : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* GRID AUTO-AJUSTABLE */}
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {/* Aquí minmax(140px, 1fr) hace que las cartas se ajusten solas al ancho */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
          {filteredProducts.map((product) => {
            const Icon = categoryIcons[product.categoria] || Package;
            const isOutOfStock = product.stock === 0;

            return (
              <Card 
                key={product.id}
                onClick={() => !isOutOfStock && onAddProduct(product)}
                className={`group relative border-border/30 shadow-sm hover:shadow-md transition-all cursor-pointer rounded-2xl bg-card overflow-hidden ${
                  isOutOfStock ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5 text-primary/60" />
                    </div>
                  </div>

                  <div className="text-center space-y-0.5">
                    <h3 className="font-bold text-foreground text-xs leading-tight truncate">
                      {product.nombre}
                    </h3>
                    
                    <p className="text-lg font-black text-primary">
                      <span className="text-[10px] font-medium mr-0.5">Bs</span>
                      {product.precio}
                    </p>

                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      <span className={`text-[9px] font-bold uppercase ${
                        isOutOfStock ? "text-destructive" : "text-muted-foreground"
                      }`}>
                        Stock: {product.stock}
                      </span>
                      {!isOutOfStock && (
                        <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Plus className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
                      <Badge variant="destructive" className="text-[9px] px-2 py-0">Agotado</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};