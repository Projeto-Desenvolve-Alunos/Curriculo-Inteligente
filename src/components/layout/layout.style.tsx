/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { IChildrenProps } from "../../interfaces/styles.interfaces";
import type {
  TSkill,
  TPersonalInfo,
  TExperience,
} from "../../interfaces/form.interfaces";
import { ThemeBorder, ThemeButton, ThemeTypography } from "../../styles/theme";

const HeaderCV: React.FC<{ onImprove?: () => void }> = ({ onImprove }) => (
  <div className="flex w-screen justify-between items-center bg-slate-200 p-5">
    <p className={`${ThemeTypography.default} text-2xl font-bold`}>
      Currículo Inteligente
    </p>
    <button className={`${ThemeButton.default}`} onClick={onImprove}>
      Melhoria com IA
    </button>
  </div>
);

const ContainerCV: React.FC<IChildrenProps> = ({ children }) => (
  <div className="flex flex-1 w-full overflow-y-auto bg-slate-200 p-5">
    {children}
  </div>
);

const FormSection: React.FC<IChildrenProps> = ({ children }) => (
  <div
    className={`w-2/5 p-5 ${ThemeBorder.default} rounded-md bg-slate-100 text-black break-words overflow-y-auto flex flex-col gap-3`}
  >
    {children}
  </div>
);

const PreviewSection: React.FC<IChildrenProps> = ({ children }) => (
  <div className="w-3/5 p-5 overscroll-auto text-black break-words overflow-y-auto">
    {children}
  </div>
);

const FormLabels: React.FC<IChildrenProps> = ({ children }) => (
  <p className={`${ThemeTypography.default} font-bold`}>{children}</p>
);

const CvPreview: React.FC<{
  personalInfo: TPersonalInfo;
  skills: TSkill[];
  experiences: TExperience[];
}> = ({ personalInfo, skills, experiences }) => (
  <div className="space-y-6">
    <PersonalHeader personalInfo={personalInfo} />
    <SkillsSection skills={skills} />
    <ExperienceSection experiences={experiences} />
  </div>
);

const PersonalHeader: React.FC<{ personalInfo: TPersonalInfo }> = ({
  personalInfo,
}) => (
  <div className="p-4 rounded-md border bg-white shadow">
    <h2 className="text-xl font-bold mb-2 text-indigo-700">
      Informações Pessoais
    </h2>
    {personalInfo.resumoProfissional && (
      <div className="mb-4">
        <h3 className="font-semibold text-indigo-700">Resumo Profissional</h3>
        <p>{personalInfo.resumoProfissional}</p>
      </div>
    )}
    <p>
      <strong>Nome:</strong> {personalInfo.name}
    </p>
    <p>
      <strong>Email:</strong> {personalInfo.email}
    </p>
    <p>
      <strong>Telefone:</strong> {personalInfo.phone}
    </p>
    <p>
      <strong>Linkedin:</strong> {personalInfo.linkedin}
    </p>
  </div>
);

const SkillsSection: React.FC<{ skills: TSkill[] }> = ({ skills }) => (
  <div className="p-4 rounded-md border bg-white shadow">
    <h3 className="text-lg font-semibold mb-2 text-indigo-700">Habilidades</h3>
    {skills.length ? (
      <ul className="list-disc ml-5">
        {skills.map((s) => (
          <li key={s.name}>
            {s.name} – {s.level}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Nenhuma habilidade adicionada.</p>
    )}
  </div>
);

const ExperienceSection: React.FC<{ experiences: TExperience[] }> = ({
  experiences,
}) => (
  <div className="p-4 rounded-md border bg-white shadow">
    <h3 className="text-lg font-semibold mb-2 text-indigo-700">Experiências</h3>
    {experiences.length ? (
      <ul className="list-disc ml-5 space-y-3">
        {experiences.map((exp, i) => (
          <li key={i}>
            <p>
              <strong>{exp.empresa}</strong> – {exp.cargo}
            </p>
            <p>
              {exp.inicio} até {exp.atual ? "Atualmente" : exp.fim || "—"}
            </p>
            <p>{exp.descricao}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">Nenhuma experiência cadastrada.</p>
    )}
  </div>
);

class ErrorBoundary extends React.Component<
  IChildrenProps,
  { hasError: boolean }
> {
  constructor(props: IChildrenProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary capturou:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border rounded bg-red-50 text-red-700">
          Ocorreu um erro inesperado. Recarregue a página.
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-4">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

const Toast: React.FC<{
  message: string;
  type?: "success" | "error" | "info";
}> = ({ message, type = "info" }) => {
  const colors =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-indigo-500";
  return (
    <div
      className={`${colors} text-white px-4 py-2 rounded shadow fixed bottom-4 right-4`}
    >
      {message}
    </div>
  );
};

export {
  HeaderCV,
  ContainerCV,
  FormSection,
  PreviewSection,
  FormLabels,
  CvPreview,
  PersonalHeader,
  SkillsSection,
  ExperienceSection,
  ErrorBoundary,
  LoadingSpinner,
  Toast,
};
