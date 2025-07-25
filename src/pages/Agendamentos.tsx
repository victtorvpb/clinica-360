import { useState } from "react";
import { Calendar, Clock, Plus, Filter, Search } from "lucide-react";
import { Agendamento } from "../types";

export function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  // Mock data
  const [agendamentos] = useState<Agendamento[]>([
    {
      id: "1",
      pacienteId: "1",
      medicoId: "1",
      data: "2024-01-15",
      hora: "09:00",
      tipo: "consulta",
      status: "confirmado",
      observacoes: "Consulta de rotina",
    },
    {
      id: "2",
      pacienteId: "2",
      medicoId: "2",
      data: "2024-01-15",
      hora: "10:30",
      tipo: "retorno",
      status: "em-andamento",
    },
    {
      id: "3",
      pacienteId: "3",
      medicoId: "1",
      data: "2024-01-15",
      hora: "14:00",
      tipo: "exame",
      status: "agendado",
      observacoes: "Exame de sangue",
    },
    {
      id: "4",
      pacienteId: "1",
      medicoId: "3",
      data: "2024-01-15",
      hora: "15:30",
      tipo: "consulta",
      status: "agendado",
    },
  ]);

  // Mock data for patients and doctors
  const pacientes = [
    { id: "1", nome: "Maria Silva Santos" },
    { id: "2", nome: "João Pedro Oliveira" },
    { id: "3", nome: "Ana Carolina Ferreira" },
  ];

  const medicos = [
    { id: "1", nome: "Dr. João Santos", especialidade: "Clínico Geral" },
    { id: "2", nome: "Dra. Ana Costa", especialidade: "Cardiologia" },
    { id: "3", nome: "Dr. Carlos Lima", especialidade: "Dermatologia" },
  ];

  const filteredAgendamentos = agendamentos.filter((agendamento) => {
    const matchesDate = agendamento.data === selectedDate;
    const matchesStatus =
      statusFilter === "todos" || agendamento.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-100 text-green-800 border-green-200";
      case "em-andamento":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "agendado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "concluido":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "consulta":
        return "bg-blue-50 text-blue-700";
      case "retorno":
        return "bg-green-50 text-green-700";
      case "exame":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getPacienteNome = (pacienteId: string) => {
    return (
      pacientes.find((p) => p.id === pacienteId)?.nome ||
      "Paciente não encontrado"
    );
  };

  const getMedicoInfo = (medicoId: string) => {
    return (
      medicos.find((m) => m.id === medicoId) || {
        nome: "Médico não encontrado",
        especialidade: "",
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600">Gerenciar consultas e agendamentos</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="relative">
              <Filter className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input pl-10"
              >
                <option value="todos">Todos os status</option>
                <option value="agendado">Agendado</option>
                <option value="confirmado">Confirmado</option>
                <option value="em-andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente ou médico..."
                className="input pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Timeline */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Agendamentos para{" "}
          {new Date(selectedDate + "T00:00:00").toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h3>

        <div className="space-y-4">
          {filteredAgendamentos.length > 0 ? (
            filteredAgendamentos.map((agendamento) => {
              const paciente = getPacienteNome(agendamento.pacienteId);
              const medico = getMedicoInfo(agendamento.medicoId);

              return (
                <div
                  key={agendamento.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="font-medium">{agendamento.hora}</span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">
                          {paciente}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {medico.nome} - {medico.especialidade}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getTipoColor(
                          agendamento.tipo
                        )}`}
                      >
                        {agendamento.tipo}
                      </span>

                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                          agendamento.status
                        )}`}
                      >
                        {agendamento.status}
                      </span>

                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Editar
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>

                  {agendamento.observacoes && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Observações:</strong> {agendamento.observacoes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum agendamento encontrado
              </h3>
              <p className="text-gray-600">
                Não há agendamentos para esta data e filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
