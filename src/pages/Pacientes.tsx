import { useState } from "react";
import { Search, Plus, Edit, Trash2, Phone, Mail } from "lucide-react";
import { Paciente } from "../types";

export function Pacientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Mock data
  const [pacientes] = useState<Paciente[]>([
    {
      id: "1",
      nome: "Maria Silva Santos",
      email: "maria.silva@email.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-00",
      dataNascimento: "1985-03-15",
      endereco: {
        rua: "Rua das Flores, 123",
        numero: "123",
        bairro: "Centro",
        cidade: "São Paulo",
        cep: "01234-567",
      },
      convenio: "Unimed",
    },
    {
      id: "2",
      nome: "João Pedro Oliveira",
      email: "joao.pedro@email.com",
      telefone: "(11) 98765-1234",
      cpf: "987.654.321-00",
      dataNascimento: "1992-07-22",
      endereco: {
        rua: "Av. Principal, 456",
        numero: "456",
        bairro: "Vila Nova",
        cidade: "São Paulo",
        cep: "04567-890",
      },
    },
    {
      id: "3",
      nome: "Ana Carolina Ferreira",
      email: "ana.carolina@email.com",
      telefone: "(11) 98765-9876",
      cpf: "456.789.123-00",
      dataNascimento: "1978-11-08",
      endereco: {
        rua: "Rua da Paz, 789",
        numero: "789",
        bairro: "Jardim América",
        cidade: "São Paulo",
        cep: "05678-123",
      },
      convenio: "Bradesco Saúde",
    },
  ]);

  const filteredPacientes = pacientes.filter(
    (paciente) =>
      paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cpf.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gerenciar cadastro de pacientes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou CPF..."
            className="input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paciente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Convênio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPacientes.map((paciente) => (
                <tr key={paciente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {paciente.nome}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(paciente.dataNascimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-1" />
                        {paciente.telefone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-1" />
                        {paciente.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {paciente.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        paciente.convenio
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {paciente.convenio || "Particular"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal would go here */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Novo Paciente
            </h3>
            <p className="text-gray-600 mb-4">
              Formulário de cadastro seria implementado aqui.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button className="btn btn-primary">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
