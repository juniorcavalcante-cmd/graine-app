import { useState } from "react";
import {
  Search,
  Plus,
  TrendingDown,
  TrendingUp,
  Star,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Leite Integral 1L",
    category: "Alimentação",
    bestPrice: 5.49,
    bestStore: "Atacadão",
    avgPrice: 6.2,
    history: [
      { store: "Atacadão", price: 5.49, date: "25/01", perUnit: 5.49 },
      { store: "Extra", price: 5.89, date: "20/01", perUnit: 5.89 },
      { store: "Pão de Açúcar", price: 6.99, date: "15/01", perUnit: 6.99 },
      { store: "Carrefour", price: 5.79, date: "10/01", perUnit: 5.79 },
    ],
  },
  {
    id: 2,
    name: "Arroz Tipo 1 5kg",
    category: "Alimentação",
    bestPrice: 24.9,
    bestStore: "Atacadão",
    avgPrice: 28.5,
    history: [
      { store: "Atacadão", price: 24.9, date: "25/01", perUnit: 4.98 },
      { store: "Carrefour", price: 27.9, date: "22/01", perUnit: 5.58 },
      { store: "Extra", price: 29.9, date: "18/01", perUnit: 5.98 },
      { store: "Pão de Açúcar", price: 31.9, date: "12/01", perUnit: 6.38 },
    ],
  },
  {
    id: 3,
    name: "Detergente 500ml",
    category: "Limpeza",
    bestPrice: 2.19,
    bestStore: "Assaí",
    avgPrice: 2.8,
    history: [
      { store: "Assaí", price: 2.19, date: "26/01", perUnit: 4.38 },
      { store: "Atacadão", price: 2.29, date: "24/01", perUnit: 4.58 },
      { store: "Extra", price: 2.99, date: "20/01", perUnit: 5.98 },
      { store: "Carrefour", price: 3.49, date: "15/01", perUnit: 6.98 },
    ],
  },
  {
    id: 4,
    name: "Café 500g",
    category: "Alimentação",
    bestPrice: 15.9,
    bestStore: "Carrefour",
    avgPrice: 18.2,
    history: [
      { store: "Carrefour", price: 15.9, date: "27/01", perUnit: 31.8 },
      { store: "Extra", price: 17.9, date: "23/01", perUnit: 35.8 },
      { store: "Pão de Açúcar", price: 19.9, date: "19/01", perUnit: 39.8 },
      { store: "Atacadão", price: 16.9, date: "14/01", perUnit: 33.8 },
    ],
  },
];

export const Comparativos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const savings = selectedProduct.avgPrice - selectedProduct.bestPrice;
  const savingsPercent = Math.round((savings / selectedProduct.avgPrice) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Comparativos</h1>
          <p className="text-muted-foreground mt-1">
            Compare preços e encontre as melhores ofertas
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Novo produto
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-lg">Produtos Monitorados</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredProducts.map((product) => {
              const isSelected = selectedProduct.id === product.id;
              const productSavings = product.avgPrice - product.bestPrice;
              const productSavingsPercent = Math.round(
                (productSavings / product.avgPrice) * 100
              );

              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`financial-card text-left transition-all ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <ShoppingCart size={18} className="text-primary" />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-income text-sm font-medium">
                      <TrendingDown size={14} />-{productSavingsPercent}%
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2">{product.name}</h4>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-income">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.bestPrice)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(product.avgPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <Star size={12} className="text-warning fill-warning" />
                    Melhor preço em {product.bestStore}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="space-y-4">
          <div className="financial-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <ShoppingCart size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedProduct.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedProduct.category}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-income-light mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Economia Potencial</span>
                <div className="flex items-center gap-1 text-income font-semibold">
                  <TrendingDown size={16} />
                  {savingsPercent}%
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-income">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(savings)}
                </span>
                <span className="text-sm text-muted-foreground">
                  por unidade
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Melhor preço
                </span>
                <span className="font-semibold text-income">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(selectedProduct.bestPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Preço médio
                </span>
                <span className="font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(selectedProduct.avgPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Melhor loja
                </span>
                <span className="font-medium flex items-center gap-1">
                  <Star size={12} className="text-warning fill-warning" />
                  {selectedProduct.bestStore}
                </span>
              </div>
            </div>
          </div>

          <div className="financial-card">
            <h4 className="font-semibold mb-4">Histórico de Preços</h4>
            <div className="space-y-2">
              {selectedProduct.history.map((item, index) => {
                const isBest = item.price === selectedProduct.bestPrice;
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                      isBest ? "bg-income-light" : ""
                    }`}
                  >
                    <div>
                      <span
                        className={`font-medium text-sm ${
                          isBest ? "text-income" : ""
                        }`}
                      >
                        {item.store}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {item.date}
                      </span>
                    </div>
                    <span
                      className={`font-semibold ${
                        isBest ? "text-income" : ""
                      }`}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
