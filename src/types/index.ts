export interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  dataNascimento: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
  };
  historicoMedico?: string;
  convenio?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };
  medicalHistory?: string;
  insurance?: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  crm: string;
  email: string;
  phone: string;
}

export interface Agendamento {
  id: string;
  pacienteId: string;
  medicoId: string;
  data: string;
  hora: string;
  tipo: 'consulta' | 'retorno' | 'exame';
  status: 'agendado' | 'confirmado' | 'em-andamento' | 'concluido' | 'cancelado';
  observacoes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'consultation' | 'return' | 'exam';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Consulta {
  id: string;
  agendamentoId: string;
  pacienteId: string;
  medicoId: string;
  data: string;
  sintomas: string;
  diagnostico?: string;
  prescricoes?: string[];
  examesSolicitados?: string[];
  observacoes?: string;
}

export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  symptoms: string;
  diagnosis?: string;
  prescriptions?: string[];
  requestedExams?: string[];
  notes?: string;
} 
