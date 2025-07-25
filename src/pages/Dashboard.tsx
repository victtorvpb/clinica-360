import { Calendar, Users, Stethoscope, TrendingUp } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      name: "Total de Pacientes",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Consultas Hoje",
      value: "23",
      change: "+5%",
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Médicos Ativos",
      value: "12",
      change: "0%",
      icon: Stethoscope,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Taxa de Ocupação",
      value: "87%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentAppointments = [
    {
      id: 1,
      patient: "Maria Silva",
      doctor: "Dr. João Santos",
      time: "09:00",
      status: "confirmado",
    },
    {
      id: 2,
      patient: "Pedro Oliveira",
      doctor: "Dra. Ana Costa",
      time: "10:30",
      status: "em-andamento",
    },
    {
      id: 3,
      patient: "Lucia Ferreira",
      doctor: "Dr. Carlos Lima",
      time: "14:00",
      status: "agendado",
    },
    {
      id: 4,
      patient: "Roberto Souza",
      doctor: "Dra. Patricia Alves",
      time: "15:30",
      status: "agendado",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800";
      case "em-andamento":
        return "bg-blue-100 text-blue-800";
      case "agendado":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral da clínica</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="ml-2 text-sm font-medium text-green-600">
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Consultas de Hoje
          </h3>
          <div className="space-y-3">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.patient}
                  </p>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="space-y-3">
            <button className="btn btn-primary w-full text-left">
              <Calendar className="w-4 h-4 mr-2 inline" />
              Novo Agendamento
            </button>
            <button className="btn btn-secondary w-full text-left">
              <Users className="w-4 h-4 mr-2 inline" />
              Cadastrar Paciente
            </button>
            <button className="btn btn-secondary w-full text-left">
              <Stethoscope className="w-4 h-4 mr-2 inline" />
              Gerenciar Médicos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
