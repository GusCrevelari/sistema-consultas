import { Especialidade } from "./types/especialidade";
import { Paciente } from "./types/paciente";
import { StatusConsulta } from "./types/statusConsulta";
import { Medico } from "./interfaces/medico";
import { Consulta } from "./interfaces/consulta";

const cardiologia: Especialidade = {
  id: 1,
  nome: "Cardiologia",
};
const medico1: Medico = {
  id: 1,
  nome: "Dr. Roberto Silva",
  crm: "CRM12345",
  especialidade: cardiologia,
  ativo: true,
};
const paciente1: Paciente = {
  id: 1,
  nome: "Carlos Andrade",
  cpf: "123.456.789-00",
  email: "carlos@email.com",
};