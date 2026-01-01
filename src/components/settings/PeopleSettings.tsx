import { useState } from "react";
import { Plus, Edit2, Trash2, Home, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { defaultPeople, Person, getLimitStatus, getLimitPercentage } from "@/data/people";

export const PeopleSettings = () => {
  const [people, setPeople] = useState<Person[]>(defaultPeople);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    initials: "",
    monthlyLimit: 0,
    type: "pessoa" as "pessoa" | "casa",
    color: "hsl(195, 55%, 28%)",
  });

  const colors = [
    "hsl(195, 55%, 28%)",
    "hsl(155, 60%, 40%)",
    "hsl(45, 85%, 50%)",
    "hsl(340, 75%, 55%)",
    "hsl(210, 80%, 55%)",
    "hsl(280, 65%, 55%)",
    "hsl(25, 90%, 55%)",
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleEdit = (person: Person) => {
    setEditingPerson(person);
    setFormData({
      name: person.name,
      initials: person.initials,
      monthlyLimit: person.monthlyLimit,
      type: person.type,
      color: person.color,
    });
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setEditingPerson(null);
    setFormData({
      name: "",
      initials: "",
      monthlyLimit: 3000,
      type: "pessoa",
      color: colors[people.length % colors.length],
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPerson) {
      setPeople(
        people.map((p) =>
          p.id === editingPerson.id
            ? { ...p, ...formData }
            : p
        )
      );
    } else {
      const newPerson: Person = {
        id: Date.now().toString(),
        name: formData.name,
        initials: formData.initials || formData.name.substring(0, 2).toUpperCase(),
        type: formData.type,
        monthlyLimit: formData.monthlyLimit,
        spent: 0,
        isActive: true,
        color: formData.color,
      };
      setPeople([...people, newPerson]);
    }
    setIsDialogOpen(false);
  };

  const handleToggleActive = (id: string) => {
    setPeople(
      people.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const handleDelete = (id: string) => {
    if (id === "casa") return; // Casa não pode ser deletada
    setPeople(people.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pessoas</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie pessoas e a entidade Casa com seus limites mensais
          </p>
        </div>
        <Button onClick={handleNew} className="gap-2">
          <Plus size={18} />
          Nova Pessoa
        </Button>
      </div>

      <div className="grid gap-4">
        {people.map((person) => {
          const status = getLimitStatus(person.spent, person.monthlyLimit);
          const percentage = getLimitPercentage(person.spent, person.monthlyLimit);

          return (
            <div
              key={person.id}
              className={`financial-card flex items-center gap-4 ${
                !person.isActive ? "opacity-50" : ""
              }`}
            >
              <Avatar className="h-12 w-12 border-2" style={{ borderColor: person.color }}>
                <AvatarImage src={person.avatar} />
                <AvatarFallback
                  className="font-semibold"
                  style={{
                    backgroundColor: person.type === "casa" ? "hsl(45, 85%, 90%)" : person.color,
                    color: person.type === "casa" ? "hsl(45, 85%, 30%)" : "white",
                  }}
                >
                  {person.type === "casa" ? "🏠" : person.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{person.name}</span>
                  {person.type === "casa" ? (
                    <Home size={14} className="text-muted-foreground" />
                  ) : (
                    <User size={14} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-muted-foreground">
                    Limite: {formatCurrency(person.monthlyLimit)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Usado: {formatCurrency(person.spent)} ({Math.round(percentage)}%)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={person.isActive}
                  onCheckedChange={() => handleToggleActive(person.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(person)}
                >
                  <Edit2 size={16} />
                </Button>
                {person.id !== "casa" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(person.id)}
                    className="text-expense hover:text-expense"
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPerson ? "Editar Pessoa" : "Nova Pessoa"}
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
                placeholder="Nome da pessoa"
              />
            </div>

            <div className="space-y-2">
              <Label>Iniciais</Label>
              <Input
                value={formData.initials}
                onChange={(e) =>
                  setFormData({ ...formData, initials: e.target.value.toUpperCase() })
                }
                placeholder="Ex: AB"
                maxLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Limite Mensal (R$)</Label>
              <Input
                type="number"
                value={formData.monthlyLimit}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyLimit: Number(e.target.value) })
                }
                placeholder="5000"
              />
            </div>

            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
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
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
