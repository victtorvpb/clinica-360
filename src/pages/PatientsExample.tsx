import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Paciente } from "../types";

export function PatientsExample() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const mockPatients: Paciente[] = [
    {
      id: "1",
      nome: "Ana Silva",
      email: "ana@email.com",
      telefone: "(11) 99999-1111",
      cpf: "123.456.789-01",
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
      nome: "João Santos",
      email: "joao@email.com",
      telefone: "(11) 88888-2222",
      cpf: "987.654.321-09",
      dataNascimento: "1990-07-22",
      endereco: {
        rua: "Av. Paulista, 456",
        numero: "456",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        cep: "01310-100",
      },
    },
  ];

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t("patients.title")}
          </h1>
          <p className="text-gray-600">{t("patients.subtitle")}</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          {t("patients.addPatient")}
        </button>
      </div>

      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t("patients.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.name")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.email")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.phone")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.cpf")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.birthDate")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  {t("patients.insurance")}
                </th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    {t("common.noData")}
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">
                        {patient.nome}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{patient.email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {patient.telefone}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{patient.cpf}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(patient.dataNascimento).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {patient.convenio || "-"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title={t("common.edit")}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title={t("common.delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
