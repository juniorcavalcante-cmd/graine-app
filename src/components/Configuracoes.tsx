import { useState } from "react";
import { Users, Tags, User, Bell, Palette, Database } from "lucide-react";
import { PeopleSettings } from "./settings/PeopleSettings";
import { CategoriesSettings } from "./settings/CategoriesSettings";

const settingsSections = [
  { id: "pessoas", label: "Pessoas", icon: Users, description: "Pessoas e Casa" },
  { id: "categorias", label: "Categorias", icon: Tags, description: "Cadastros" },
  { id: "perfil", label: "Perfil", icon: User, description: "Dados pessoais" },
  { id: "notificacoes", label: "Notificações", icon: Bell, description: "Alertas" },
  { id: "aparencia", label: "Aparência", icon: Palette, description: "Tema" },
  { id: "dados", label: "Dados", icon: Database, description: "Exportar/Importar" },
];

export const Configuracoes = () => {
  const [activeSection, setActiveSection] = useState("pessoas");

  const renderContent = () => {
    switch (activeSection) {
      case "pessoas":
        return <PeopleSettings />;
      case "categorias":
        return <CategoriesSettings />;
      case "perfil":
        return (
          <div className="text-center py-12 text-muted-foreground">
            <User size={48} className="mx-auto mb-4 opacity-50" />
            <p>Configurações de perfil em breve</p>
          </div>
        );
      case "notificacoes":
        return (
          <div className="text-center py-12 text-muted-foreground">
            <Bell size={48} className="mx-auto mb-4 opacity-50" />
            <p>Configurações de notificações em breve</p>
          </div>
        );
      case "aparencia":
        return (
          <div className="text-center py-12 text-muted-foreground">
            <Palette size={48} className="mx-auto mb-4 opacity-50" />
            <p>Configurações de aparência em breve</p>
          </div>
        );
      case "dados":
        return (
          <div className="text-center py-12 text-muted-foreground">
            <Database size={48} className="mx-auto mb-4 opacity-50" />
            <p>Gerenciamento de dados em breve</p>
          </div>
        );
      default:
        return <PeopleSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie pessoas, categorias e preferências do sistema
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px,1fr] gap-6">
        {/* Sidebar */}
        <nav className="space-y-1">
          {settingsSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                <div>
                  <span className="font-medium block">{section.label}</span>
                  <span
                    className={`text-xs ${
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {section.description}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Content */}
        <div className="financial-card">{renderContent()}</div>
      </div>
    </div>
  );
};
