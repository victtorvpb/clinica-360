import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Calendar,
  User,
  Stethoscope,
} from "lucide-react";
import { Consulta } from "../types";

export function Consultas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data
  const [consultas] = useState<Consulta[]>([
    {
      id: "1",
      agendamentoId: "1",
      pacienteId: "1",
      medicoId: "1",
      data: "2024-01-15",
      sintomas: "Dor de cabeça frequente, tontura",
      diagnostico: "Cefaleia tensional",
      prescricoes: ["Paracetamol 500mg - 1 comprimido a cada 8h por 3 dias"],
      examesSolicitados: ["Hemograma completo"],
      observacoes:
        "Paciente relata estresse no trabalho. Orientado sobre técnicas de relaxamento.",
    },
    {
      id: "2",
      agendamentoId: "2",
      pacienteId: "2",
      medicoId: "2",
      data: "2024-01-14",
      sintomas: "Dor no peito, falta de ar",
      diagnostico: "Suspeita de arritmia cardíaca",
      prescricoes: ["Propranolol 40mg - 1 comprimido pela manhã"],
      examesSolicitados: ["Eletrocardiograma", "Ecocardiograma"],
      observacoes:
        "Paciente deve retornar em 15 dias com os resultados dos exames.",
    },
    {
      id: "3",
      agendamentoId: "3",
      pacienteId: "3",
      medicoId: "3",
      data: "2024-01-13",
      sintomas: "Manchas na pele, coceira",
      diagnostico: "Dermatite de contato",
      prescricoes: ["Hidrocortisona creme 1% - aplicar 2x ao dia por 7 dias"],
      observacoes: "Orientado a evitar produtos de limpeza sem luvas.",
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

  const filteredConsultas = consultas.filter((consulta) => {
    const paciente = pacientes.find((p) => p.id === consulta.pacienteId);
    const medico = medicos.find((m) => m.id === consulta.medicoId);

    const matchesSearch =
      !searchTerm ||
      paciente?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.diagnostico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.sintomas.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !dateFilter || consulta.data === dateFilter;

    return matchesSearch && matchesDate;
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultas</h1>
          <p className="text-gray-600">Histórico e registro de consultas</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Nova Consulta
        </button>
      </div>

      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por paciente, médico ou diagnóstico..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Calendar className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              className="input pl-10"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Consultas
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {consultas.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-50 p-3 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Pacientes Atendidos
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(consultas.map((c) => c.pacienteId)).size}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Médicos Participantes
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(consultas.map((c) => c.medicoId)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredConsultas.map((consulta) => {
          const paciente = getPacienteNome(consulta.pacienteId);
          const medico = getMedicoInfo(consulta.medicoId);

          return (
            <div
              key={consulta.id}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-50 p-3 rounded-lg">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {paciente}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {medico.nome} - {medico.especialidade}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(consulta.data + "T00:00:00").toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Editar
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    Imprimir
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Sintomas
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {consulta.sintomas}
                  </p>

                  {consulta.diagnostico && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Diagnóstico
                      </h4>
                      <p className="text-sm text-gray-600">
                        {consulta.diagnostico}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  {consulta.prescricoes && consulta.prescricoes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Prescrições
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {consulta.prescricoes.map((prescricao, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {prescricao}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {consulta.examesSolicitados &&
                    consulta.examesSolicitados.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Exames Solicitados
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {consulta.examesSolicitados.map((exame, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {exame}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>

              {consulta.observacoes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Observações
                  </h4>
                  <p className="text-sm text-gray-600">
                    {consulta.observacoes}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredConsultas.length === 0 && (
        <div className="card text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma consulta encontrada
          </h3>
          <p className="text-gray-600">
            Nenhuma consulta corresponde aos filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
