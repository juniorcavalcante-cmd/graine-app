import { useState } from "react";
import { TopNavigation } from "@/components/TopNavigation";
import { Dashboard } from "@/components/Dashboard";
import { Lancamentos } from "@/components/Lancamentos";
import { Calendario } from "@/components/Calendario";
import { Resumos } from "@/components/Resumos";
import { Caixinhas } from "@/components/Caixinhas";
import { Comparativos } from "@/components/Comparativos";
import { Configuracoes } from "@/components/Configuracoes";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "lancamentos":
        return <Lancamentos />;
      case "calendario":
        return <Calendario />;
      case "resumos":
        return <Resumos />;
      case "caixinhas":
        return <Caixinhas />;
      case "comparativos":
        return <Comparativos />;
      case "configuracoes":
        return <Configuracoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Helmet>
        <title>GRAINE - Controle Financeiro Doméstico</title>
        <meta
          name="description"
          content="GRAINE é seu sistema financeiro pessoal. Organize, visualize e tenha clareza sobre sua vida financeira com foco em prosperidade e crescimento."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="container py-6 md:py-8">
          {renderContent()}
        </main>
      </div>
    </>
  );
};

export default Index;
