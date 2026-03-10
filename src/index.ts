import type { Especialidade } from "./types/especialidade";
import type { Paciente } from "./types/paciente";
import type { StatusConsulta } from "./types/statusConsulta";
import type { Medico } from "./interfaces/medico";
import type { Consulta } from "./interfaces/consulta";

const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};

const ortopedia: Especialidade = {
  id: 2,
  nome: "Ortopedia",
};

const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};

const medico2: Medico = {
  id: 2,
  nome: "Dra. Fernanda Costa",
  crm: "CRM67890",
  especialidade: ortopedia,
  ativo: true,
};

const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};

const paciente2: Paciente = {
  id: 2,
  nome: "Mariana Souza",
  cpf: "987.654.321-00",
  email: "mariana@email.com",
};

function criarConsulta(
  id: number,
  medico: Medico,
  paciente: Paciente,
  data: Date,
  valor: number
): Consulta {
  return {
    id,
    medico,
    paciente,
    data,
    valor,
    status: "agendada",
  };
}

function alterarStatusConsulta(
  consulta: Consulta,
  novoStatus: StatusConsulta
): Consulta | null {
  if (consulta.status === "realizada" && novoStatus === "cancelada") {
    return null;
  }

  return {
    ...consulta,
    status: novoStatus,
  };
}

function confirmarConsulta(consulta: Consulta): Consulta {
  return {
    ...consulta,
    status: "confirmada",
  };
}

function cancelarConsulta(consulta: Consulta): Consulta | null {
  if (consulta.status === "realizada") {
    return null;
  }

  return {
    ...consulta,
    status: "cancelada",
  };
}

function exibirConsulta(consulta: Consulta): string {
  const dataFormatada = consulta.data.toLocaleDateString("pt-BR");
  const valorFormatado = consulta.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return `
Consulta #${consulta.id}
Médico: ${consulta.medico.nome}
Paciente: ${consulta.paciente.nome}
Especialidade: ${consulta.medico.especialidade.nome}
Data: ${dataFormatada}
Valor: ${valorFormatado}
Status: ${consulta.status}
`;
}

function listarConsultasPorStatus(
  consultas: Consulta[],
  status: StatusConsulta
): Consulta[] {
  return consultas.filter((consulta) => consulta.status === status);
}

function listarConsultasFuturas(consultas: Consulta[]): Consulta[] {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  return consultas.filter((consulta) => {
    const dataConsulta = new Date(consulta.data);
    dataConsulta.setHours(0, 0, 0, 0);
    return dataConsulta >= hoje;
  });
}

function calcularFaturamento(consultas: Consulta[]): number {
  return consultas
    .filter((consulta) => consulta.status === "realizada")
    .reduce((total, consulta) => total + consulta.valor, 0);
}

const consultas: Consulta[] = [];

const consulta1 = criarConsulta(1, medico1, paciente1, new Date("2026-03-15"), 350);
const consulta2 = criarConsulta(2, medico1, paciente2, new Date("2026-03-20"), 420);
const consulta3 = criarConsulta(3, medico2, paciente1, new Date("2026-02-10"), 500);
const consulta4 = criarConsulta(4, medico2, paciente2, new Date("2026-04-01"), 280);
const consulta5 = criarConsulta(5, medico1, paciente1, new Date("2026-01-25"), 610);
const consulta6 = criarConsulta(6, medico2, paciente2, new Date("2026-03-30"), 390);

const consulta1Confirmada = confirmarConsulta(consulta1);
const consulta2Realizada = alterarStatusConsulta(consulta2, "realizada");
const consulta3Cancelada = cancelarConsulta(consulta3);
const consulta4Confirmada = alterarStatusConsulta(consulta4, "confirmada");
const consulta5Realizada = alterarStatusConsulta(consulta5, "realizada");
const consulta6Cancelada = alterarStatusConsulta(consulta6, "cancelada");

consultas.push(consulta1Confirmada);

if (consulta2Realizada !== null) {
  consultas.push(consulta2Realizada);
}

if (consulta3Cancelada !== null) {
  consultas.push(consulta3Cancelada);
}

if (consulta4Confirmada !== null) {
  consultas.push(consulta4Confirmada);
}

if (consulta5Realizada !== null) {
  consultas.push(consulta5Realizada);
}

if (consulta6Cancelada !== null) {
  consultas.push(consulta6Cancelada);
}

console.log("===== TODAS AS CONSULTAS =====");
for (const consulta of consultas) {
  console.log(exibirConsulta(consulta));
}

console.log("===== CONSULTAS CONFIRMADAS =====");
const consultasConfirmadas = listarConsultasPorStatus(consultas, "confirmada");
for (const consulta of consultasConfirmadas) {
  console.log(exibirConsulta(consulta));
}

console.log("===== CONSULTAS CANCELADAS =====");
const consultasCanceladas = listarConsultasPorStatus(consultas, "cancelada");
for (const consulta of consultasCanceladas) {
  console.log(exibirConsulta(consulta));
}

console.log("===== CONSULTAS FUTURAS =====");
const consultasFuturas = listarConsultasFuturas(consultas);
for (const consulta of consultasFuturas) {
  console.log(exibirConsulta(consulta));
}

console.log("===== FATURAMENTO =====");
const faturamento = calcularFaturamento(consultas);
console.log(
  faturamento.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
);