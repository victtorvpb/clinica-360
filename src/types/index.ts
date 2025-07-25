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

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone: string;
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
