import { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const periods = [
  { id: "hoje", label: "Hoje" },
  { id: "7dias", label: "7 dias" },
  { id: "15dias", label: "15 dias" },
  { id: "mes", label: "Mês atual" },
];

const summaryData = {
  hoje: {
    title: "Resumo de Hoje",
    content: `Hoje vocês tiveram um dia relativamente tranquilo financeiramente. Ana fez uma compra no supermercado de R$ 342,50 e Carlos gastou R$ 28,90 com transporte (Uber).

**Destaque positivo:** Os gastos de hoje estão 15% abaixo da média diária do mês.

**Atenção:** A conta de luz vence em 3 dias. Valor previsto: R$ 245,80.`,
    insights: [
      { type: "success", text: "Gastos 15% abaixo da média diária" },
      { type: "warning", text: "Conta de luz vence em 3 dias" },
    ],
  },
  "7dias": {
    title: "Resumo dos Últimos 7 Dias",
    content: `Na última semana, vocês mantiveram um bom controle financeiro. O total de despesas foi de R$ 1.847,20, com destaque para alimentação (R$ 628,50) e transporte (R$ 312,40).

**Pontos positivos:**
- Receita de R$ 8.500 (salário do Carlos) recebida no dia 27
- Gastos com lazer dentro do limite estabelecido
- Economia de 8% comparado à semana anterior

**Pontos de atenção:**
- Gastos com alimentação fora de casa aumentaram 12%
- Recomendo revisar assinaturas de streaming (R$ 69,80/mês)`,
    insights: [
      { type: "success", text: "Economia de 8% vs semana anterior" },
      { type: "neutral", text: "R$ 8.500 recebidos (salário Carlos)" },
      { type: "warning", text: "Alimentação fora +12%" },
    ],
  },
  "15dias": {
    title: "Resumo da Quinzena",
    content: `Na primeira quinzena de janeiro, o saldo está positivo em R$ 4.210,00. As principais categorias de gastos foram:

1. **Moradia:** R$ 2.445,80 (aluguel + luz)
2. **Alimentação:** R$ 1.156,00 
3. **Transporte:** R$ 487,20
4. **Saúde:** R$ 287,60
5. **Educação:** R$ 197,00

**Análise:** Os gastos fixos representam 58% do total, o que é considerado saudável. A recomendação é manter o controle sobre gastos variáveis, especialmente alimentação.

**Meta de economia:** Vocês estão 72% no caminho para a meta de R$ 3.000 de economia mensal.`,
    insights: [
      { type: "success", text: "Saldo positivo: R$ 4.210,00" },
      { type: "neutral", text: "Gastos fixos: 58% do total" },
      { type: "success", text: "72% da meta de economia alcançada" },
    ],
  },
  mes: {
    title: "Resumo de Janeiro 2025",
    content: `Janeiro está sendo um mês financeiramente saudável para vocês. Com receita total de R$ 15.200 e despesas de R$ 8.190, vocês conseguiram um saldo positivo de R$ 7.010.

**Destaques do mês:**
- 🏠 Moradia: R$ 2.445,80 (30% das despesas)
- 🍎 Alimentação: R$ 2.450,00 (30% das despesas)
- 🚗 Transporte: R$ 890,00 (11% das despesas)
- ❤️ Saúde: R$ 650,00 (8% das despesas)

**Caixinhas:** Vocês conseguiram aportar R$ 2.500 nas caixinhas este mês. A "Viagem Europa" já está em 75% do objetivo!

**Comparativo:** Este mês está 12% melhor que dezembro em termos de economia.

**Recomendação:** Considerar aumentar o aporte na caixinha "Carro Novo" em R$ 500/mês para atingir a meta no prazo.`,
    insights: [
      { type: "success", text: "Saldo positivo: R$ 7.010" },
      { type: "success", text: "+12% economia vs dezembro" },
      { type: "success", text: "R$ 2.500 aportados em caixinhas" },
      { type: "neutral", text: "Sugestão: +R$ 500/mês para Carro Novo" },
    ],
  },
};

export const Resumos = () => {
  const [activePeriod, setActivePeriod] = useState("mes");
  const data = summaryData[activePeriod as keyof typeof summaryData];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} className="text-income" />;
      case "warning":
        return <AlertTriangle size={16} className="text-warning" />;
      default:
        return <TrendingUp size={16} className="text-primary" />;
    }
  };

  const getInsightBg = (type: string) => {
    switch (type) {
      case "success":
        return "bg-income-light";
      case "warning":
        return "bg-warning-light";
      default:
        return "bg-primary-light";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resumos</h1>
          <p className="text-muted-foreground mt-1">
            Análise inteligente das suas finanças
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles size={16} className="text-primary" />
          Gerado por IA
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex flex-wrap gap-2">
        {periods.map((period) => (
          <Button
            key={period.id}
            variant={activePeriod === period.id ? "default" : "outline"}
            onClick={() => setActivePeriod(period.id)}
            className="rounded-full"
          >
            {period.label}
          </Button>
        ))}
      </div>

      {/* Summary Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 financial-card animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold">{data.title}</h2>
          </div>

          <div className="prose prose-sm max-w-none">
            {data.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground/80 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/\n/g, "<br />"),
                }}
              />
            ))}
          </div>
        </div>

        {/* Insights Panel */}
        <div className="space-y-4">
          <div className="financial-card">
            <h3 className="font-semibold mb-4">Insights Principais</h3>
            <div className="space-y-3">
              {data.insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl flex items-start gap-3 ${getInsightBg(
                    insight.type
                  )}`}
                >
                  {getInsightIcon(insight.type)}
                  <span className="text-sm font-medium">{insight.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="financial-card">
            <h3 className="font-semibold mb-4">Ações Sugeridas</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp size={16} />
                Ver comparativo mensal
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingDown size={16} />
                Analisar gastos por categoria
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
