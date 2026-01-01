import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Category,
  defaultCategories,
  iconMap,
  availableIcons,
  availableColors,
} from "@/data/categories";

export const CategoriesSettings = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "DollarSign",
    color: availableColors[0],
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      color: category.color,
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      icon: "DollarSign",
      color: availableColors[categories.length % availableColors.length],
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...formData }
            : c
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name,
        icon: formData.icon,
        color: formData.color,
        isActive: true,
      };
      setCategories([...categories, newCategory]);
    }
    setIsDialogOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setCategories(
      categories.map((c) =>
        c.id === id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Categorias</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie categorias de lançamentos com cores e ícones personalizados
          </p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus size={18} />
          Nova Categoria
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];

          return (
            <div
              key={category.id}
              className={`financial-card flex items-center gap-3 p-4 ${
                !category.isActive ? "opacity-50" : ""
              }`}
            >
              <div
                className="p-2.5 rounded-xl flex-shrink-0"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {Icon && <Icon size={20} style={{ color: category.color }} />}
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-medium truncate block">{category.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={category.isActive}
                  onCheckedChange={() => handleToggleActive(category.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(category)}
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-expense hover:text-expense"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nome da categoria"
              />
            </div>

            <div className="space-y-2">
              <Label>Ícone</Label>
              <div className="flex gap-2 flex-wrap p-3 border rounded-lg max-h-32 overflow-y-auto">
                {availableIcons.map((iconName) => {
                  const Icon = iconMap[iconName];
                  return (
                    <button
                      key={iconName}
                      className={`p-2 rounded-lg transition-all ${
                        formData.icon === iconName
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      onClick={() => setFormData({ ...formData, icon: iconName })}
                    >
                      {Icon && <Icon size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full transition-all ${
                      formData.color === color ? "ring-2 ring-offset-2 ring-primary" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({ ...formData, color })}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!formData.name}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
