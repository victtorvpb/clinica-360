import { useState } from "react";
import { Search, Plus, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";
import { Doctor } from "../types";

export function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [doctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Dr. João Santos",
      specialty: "Cardiologia",
      crm: "12345/SP",
      email: "joao.santos@clinica360.com",
      phone: "(11) 98765-4321",
    },
    {
      id: "2",
      name: "Dra. Ana Costa",
      specialty: "Pediatria",
      crm: "67890/SP",
      email: "ana.costa@clinica360.com",
      phone: "(11) 91234-5678",
    },
    {
      id: "3",
      name: "Dr. Carlos Lima",
      specialty: "Ortopedia",
      crm: "54321/SP",
      email: "carlos.lima@clinica360.com",
      phone: "(11) 95555-0000",
    },
    {
      id: "4",
      name: "Dra. Patrícia Alves",
      specialty: "Ginecologia",
      crm: "98765/SP",
      email: "patricia.alves@clinica360.com",
      phone: "(11) 94444-1111",
    },
    {
      id: "5",
      name: "Dr. Roberto Souza",
      specialty: "Dermatologia",
      crm: "13579/SP",
      email: "roberto.souza@clinica360.com",
      phone: "(11) 93333-2222",
    },
  ]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.crm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSpecialtyColor = (specialty: string) => {
    const colors: { [key: string]: string } = {
      Cardiologia: "bg-red-100 text-red-800",
      Pediatria: "bg-blue-100 text-blue-800",
      Ortopedia: "bg-green-100 text-green-800",
      Ginecologia: "bg-pink-100 text-pink-800",
      Dermatologia: "bg-orange-100 text-orange-800",
    };
    return colors[specialty] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Doctor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSpecialtyColor(
                      doctor.specialty
                    )}`}
                  >
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  CRM: {doctor.crm}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {doctor.phone}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              New Doctor
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select specialty</option>
                  <option value="Cardiologia">Cardiology</option>
                  <option value="Pediatria">Pediatrics</option>
                  <option value="Ortopedia">Orthopedics</option>
                  <option value="Ginecologia">Gynecology</option>
                  <option value="Dermatologia">Dermatology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CRM
                </label>
                <input
                  type="text"
                  placeholder="12345/SP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
