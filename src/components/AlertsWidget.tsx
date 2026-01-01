import { AlertTriangle, TrendingUp, Clock, Target } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    icon: AlertTriangle,
    title: "Limite de Alimentação",
    description: "Você atingiu 85% do limite mensal",
    action: "Ver detalhes",
  },
  {
    id: 2,
    type: "info",
    icon: Clock,
    title: "Vencimento próximo",
    description: "Conta de luz vence em 3 dias",
    action: "Marcar como pago",
  },
  {
    id: 3,
    type: "success",
    icon: Target,
    title: "Meta atingida!",
    description: "Caixinha 'Viagem' alcançou o objetivo",
    action: "Celebrar 🎉",
  },
];

export const AlertsWidget = () => {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case "warning":
        return {
          bg: "bg-warning-light",
          iconBg: "bg-warning/20",
          iconColor: "text-warning",
        };
      case "success":
        return {
          bg: "bg-income-light",
          iconBg: "bg-income/20",
          iconColor: "text-income",
        };
      default:
        return {
          bg: "bg-primary-light",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
        };
    }
  };

  return (
    <div className="financial-card animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Alertas e Lembretes</h3>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          const styles = getAlertStyles(alert.type);

          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl ${styles.bg} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                  <Icon size={16} className={styles.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alert.description}
                  </p>
                  <button className="text-xs font-medium text-primary mt-2 hover:underline">
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
