import { useState } from "react";
import {
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  Search,
} from "lucide-react";
import { Medico } from "../types";

export function Medicos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [especialidadeFilter, setEspecialidadeFilter] = useState("todas");

  // Mock data
  const [medicos] = useState<Medico[]>([
    {
      id: "1",
      nome: "Dr. João Santos Silva",
      especialidade: "Clínico Geral",
      crm: "12345-SP",
      email: "joao.santos@clinica360.com",
      telefone: "(11) 98765-4321",
    },
    {
      id: "2",
      nome: "Dra. Ana Paula Costa",
      especialidade: "Cardiologia",
      crm: "23456-SP",
      email: "ana.costa@clinica360.com",
      telefone: "(11) 98765-5678",
    },
    {
      id: "3",
      nome: "Dr. Carlos Eduardo Lima",
      especialidade: "Dermatologia",
      crm: "34567-SP",
      email: "carlos.lima@clinica360.com",
      telefone: "(11) 98765-9876",
    },
    {
      id: "4",
      nome: "Dra. Patricia Alves Ferreira",
      especialidade: "Pediatria",
      crm: "45678-SP",
      email: "patricia.alves@clinica360.com",
      telefone: "(11) 98765-1234",
    },
    {
      id: "5",
      nome: "Dr. Roberto Souza Oliveira",
      especialidade: "Ortopedia",
      crm: "56789-SP",
      email: "roberto.souza@clinica360.com",
      telefone: "(11) 98765-5432",
    },
  ]);

  const especialidades = [...new Set(medicos.map((m) => m.especialidade))];

  const filteredMedicos = medicos.filter((medico) => {
    const matchesSearch =
      medico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.crm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEspecialidade =
      especialidadeFilter === "todas" ||
      medico.especialidade === especialidadeFilter;
    return matchesSearch && matchesEspecialidade;
  });

  const getEspecialidadeColor = (especialidade: string) => {
    const colors = {
      "Clínico Geral": "bg-blue-100 text-blue-800",
      Cardiologia: "bg-red-100 text-red-800",
      Dermatologia: "bg-green-100 text-green-800",
      Pediatria: "bg-yellow-100 text-yellow-800",
      Ortopedia: "bg-purple-100 text-purple-800",
    };
    return (
      colors[especialidade as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Médicos</h1>
          <p className="text-gray-600">Gerenciar equipe médica</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Médico
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nome, especialidade ou CRM..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              value={especialidadeFilter}
              onChange={(e) => setEspecialidadeFilter(e.target.value)}
              className="input"
            >
              <option value="todas">Todas as especialidades</option>
              {especialidades.map((especialidade) => (
                <option key={especialidade} value={especialidade}>
                  {especialidade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {medicos.length}
              </p>
            </div>
          </div>
        </div>

        {especialidades.slice(0, 3).map((especialidade) => (
          <div key={especialidade} className="card">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">
                {especialidade}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {
                  medicos.filter((m) => m.especialidade === especialidade)
                    .length
                }
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicos.map((medico) => (
          <div
            key={medico.id}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <Stethoscope className="w-8 h-8 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {medico.nome}
                  </h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEspecialidadeColor(
                      medico.especialidade
                    )}`}
                  >
                    {medico.especialidade}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">CRM:</span>
                <span className="ml-2">{medico.crm}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{medico.telefone}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span className="truncate">{medico.email}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="btn btn-primary text-sm flex-1">
                  Ver Agenda
                </button>
                <button className="btn btn-secondary text-sm flex-1">
                  Contatar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicos.length === 0 && (
        <div className="card text-center py-12">
          <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum médico encontrado
          </h3>
          <p className="text-gray-600">
            Nenhum médico corresponde aos filtros selecionados.
          </p>
        </div>
      )}
    </div>
  );
}
