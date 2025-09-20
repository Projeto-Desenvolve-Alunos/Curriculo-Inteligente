export type TSkill = {
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
};

export type TPersonalInfo = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resumoProfissional?: string;
};

export type TExperience = {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  atual: boolean;
  descricao: string;
};