import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  User,
  FileText,
  Pill,
  TestTube,
  Eye,
} from "lucide-react";
import { Consultation } from "../types";

export function Consultations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  const [consultations] = useState<Consultation[]>([
    {
      id: "1",
      appointmentId: "1",
      patientId: "1",
      doctorId: "1",
      date: "2024-03-15",
      symptoms: "Chest pain, shortness of breath",
      diagnosis: "Suspected hypertension",
      prescriptions: ["Losartan 50mg - 1x daily", "Low sodium diet"],
      requestedExams: ["ECG", "Blood pressure monitoring"],
      notes: "Patient reports symptoms for 2 weeks. Follow-up in 1 week.",
    },
    {
      id: "2",
      appointmentId: "2",
      patientId: "2",
      doctorId: "2",
      date: "2024-03-14",
      symptoms: "Persistent cough, fever",
      diagnosis: "Upper respiratory infection",
      prescriptions: [
        "Amoxicillin 500mg - 3x daily for 7 days",
        "Rest and hydration",
      ],
      requestedExams: ["Chest X-ray"],
      notes: "Symptoms started 5 days ago. Return if no improvement in 3 days.",
    },
    {
      id: "3",
      appointmentId: "3",
      patientId: "3",
      doctorId: "1",
      date: "2024-03-13",
      symptoms: "Routine checkup",
      diagnosis: "Healthy",
      prescriptions: ["Continue current medications"],
      requestedExams: ["Annual blood work"],
      notes: "All vitals normal. Annual routine examination completed.",
    },
  ]);

  const patients = [
    { id: "1", name: "Maria Silva Santos" },
    { id: "2", name: "João Pedro Oliveira" },
    { id: "3", name: "Ana Carolina Costa" },
  ];

  const doctors = [
    { id: "1", name: "Dr. João Santos" },
    { id: "2", name: "Dra. Ana Costa" },
    { id: "3", name: "Dr. Carlos Lima" },
  ];

  const getPatientName = (patientId: string) => {
    return patients.find((p) => p.id === patientId)?.name || "Unknown Patient";
  };

  const getDoctorName = (doctorId: string) => {
    return doctors.find((d) => d.id === doctorId)?.name || "Unknown Doctor";
  };

  const filteredConsultations = consultations
    .filter(
      (consultation) =>
        getPatientName(consultation.patientId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        getDoctorName(consultation.doctorId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        consultation.diagnosis
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        consultation.symptoms.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((consultation) => !filterDate || consultation.date === filterDate);

  const handleViewConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Consultation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredConsultations.map((consultation) => (
            <div key={consultation.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(consultation.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          {getPatientName(consultation.patientId)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Doctor: {getDoctorName(consultation.doctorId)}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Symptoms:
                          </span>
                          <p className="text-sm text-gray-600">
                            {consultation.symptoms}
                          </p>
                        </div>

                        {consultation.diagnosis && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">
                              Diagnosis:
                            </span>
                            <p className="text-sm text-gray-600">
                              {consultation.diagnosis}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {consultation.prescriptions &&
                        consultation.prescriptions.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Pill className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium text-gray-700">
                                Prescriptions:
                              </span>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {consultation.prescriptions.map(
                                (prescription, index) => (
                                  <li key={index} className="pl-2">
                                    • {prescription}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      {consultation.requestedExams &&
                        consultation.requestedExams.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <TestTube className="w-4 h-4 text-green-500" />
                              <span className="text-sm font-medium text-gray-700">
                                Requested Exams:
                              </span>
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {consultation.requestedExams.map(
                                (exam, index) => (
                                  <li key={index} className="pl-2">
                                    • {exam}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>

                  {consultation.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                          Notes:
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {consultation.notes}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleViewConsultation(consultation)}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              New Consultation
            </h2>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptoms
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe the symptoms..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnosis
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Diagnosis..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescriptions
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="List prescriptions (one per line)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Exams
                </label>
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="List requested exams (one per line)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Additional notes..."
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
                  Save Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Consultation Details
              </h2>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Patient Information
                  </h3>
                  <p className="text-gray-600">
                    {getPatientName(selectedConsultation.patientId)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Doctor: {getDoctorName(selectedConsultation.doctorId)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(selectedConsultation.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Symptoms</h3>
                <p className="text-gray-600">{selectedConsultation.symptoms}</p>
              </div>

              {selectedConsultation.diagnosis && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Diagnosis</h3>
                  <p className="text-gray-600">
                    {selectedConsultation.diagnosis}
                  </p>
                </div>
              )}

              {selectedConsultation.prescriptions &&
                selectedConsultation.prescriptions.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Prescriptions
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      {selectedConsultation.prescriptions.map(
                        (prescription, index) => (
                          <li key={index}>• {prescription}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedConsultation.requestedExams &&
                selectedConsultation.requestedExams.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Requested Exams
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      {selectedConsultation.requestedExams.map(
                        (exam, index) => (
                          <li key={index}>• {exam}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {selectedConsultation.notes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-600">{selectedConsultation.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
