import { useState, useEffect } from "react";
import SkillsMultiSelect from "../form/skillMultiselect/skillMultiselect";
import PersonalInfo from "../form/personalInfo/personaInfo";
import ExperienceForm from "../form/experience";
import {
  ContainerCV,
  CvPreview,
  ErrorBoundary,
  FormLabels,
  FormSection,
  HeaderCV,
  LoadingSpinner,
  PreviewSection,
  Toast,
} from "./layout.style";

import type {
  TSkill,
  TPersonalInfo,
  TExperience,
} from "../../interfaces/form.interfaces";
import { generateResume } from "../../services/gemini.service";
import { apiKeyValue } from "../../config/envs/envVar";
import { generatePdf } from "../../services/pdf.service";

const initialPersonalInfo: TPersonalInfo = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  resumoProfissional: "",
};

const initialExperiences: TExperience[] = [
  {
    empresa: "",
    cargo: "",
    inicio: "",
    fim: "",
    atual: false,
    descricao: "",
  },
];

const Layout: React.FC = () => {
  const [personalInfo, setPersonalInfo] =
    useState<TPersonalInfo>(initialPersonalInfo);
  const [skills, setSkills] = useState<TSkill[]>([]);
  const [experiences, setExperiences] =
    useState<TExperience[]>(initialExperiences);
  const [aiSuggestions, setAiSuggestions] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    try {
      const savedPersonalInfo = localStorage.getItem("personalInfo");
      const savedSkills = localStorage.getItem("skills");
      const savedExperiences = localStorage.getItem("experiences");

      if (savedPersonalInfo) {
        setPersonalInfo(JSON.parse(savedPersonalInfo));
      }
      if (savedSkills) {
        setSkills(JSON.parse(savedSkills));
      }
      if (savedExperiences) {
        setExperiences(JSON.parse(savedExperiences));
      }
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error);
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
      localStorage.setItem("skills", JSON.stringify(skills));
      localStorage.setItem("experiences", JSON.stringify(experiences));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }, [personalInfo, skills, experiences]);

  const handleImprove = async () => {
    setLoadingAI(true);
    try {
      const promptTextSuggestions = `
Você é um assistente de revisão de currículo.
Analise exclusivamente o **conteúdo textual** a seguir:
- Informações Pessoais: ${JSON.stringify(personalInfo, null, 2)}
- Habilidades: ${JSON.stringify(skills, null, 2)}
- Experiências: ${JSON.stringify(experiences, null, 2)}

Instruções importantes:
- NÃO comente ou sugira nada sobre formatação, layout, design ou estilo visual.
- Corrija apenas **erros gramaticais, de português ou ortografia**.
- Sugira pequenas melhorias de clareza ou coerência, sem mudar o sentido.
- Se possível, devolva os campos já corrigidos.

Responda apenas com:
1. Uma breve descrição profissional baseada no conteúdo (corrigida).
2. Lista de correções de português ou sugestões de texto.
`;

      const promptAutoCorrect = `
Você é um assistente de revisão de currículo.
Analise exclusivamente o **conteúdo textual** a seguir e corrija-o:
- Informações Pessoais: ${JSON.stringify(personalInfo, null, 2)}
- Habilidades: ${JSON.stringify(skills, null, 2)}
- Experiências: ${JSON.stringify(experiences, null, 2)}

Instruções importantes:
- Corrija erros gramaticais, de português ou ortografia.
- Adicione um campo 'resumoProfissional' para um resumo com 2 a 3 frases.
- Melhore a clareza e o tom profissional da 'descricao' de cada experiência.
- NÃO comente sobre formatação ou layout.

Responda APENAS com um objeto JSON válido, sem nenhum texto adicional. A estrutura do JSON deve ser:
{
  "personalInfo": {
    "resumoProfissional": "Resumo melhorado",
    "name": "Nome corrigido",
    "email": "email.corrigido@exemplo.com",
    "phone": "Telefone corrigido",
    "linkedin": "Linkedin corrigido"
  },
  "experiences": [
    {
      "empresa": "Empresa corrigida",
      "cargo": "Cargo corrigido",
      "inicio": "Início",
      "fim": "Fim",
      "atual": false,
      "descricao": "Descrição melhorada"
    }
  ]
}
`;

      const [responseText, responseAutoCorrect] = await Promise.all([
        generateResume(promptTextSuggestions, apiKeyValue),
        generateResume(promptAutoCorrect, apiKeyValue),
      ]);

      setAiSuggestions(responseText);

      try {
        let jsonResponse = responseAutoCorrect;
        if (jsonResponse.startsWith("```json")) {
          jsonResponse = jsonResponse.substring(
            7,
            jsonResponse.lastIndexOf("```")
          );
        }
        const data = JSON.parse(jsonResponse);

        if (data.personalInfo) {
          setPersonalInfo({
            ...personalInfo,
            ...data.personalInfo,
          });
        }
        if (data.experiences) {
          setExperiences(data.experiences);
        }
      } catch (parseError) {
        console.error("Erro ao analisar a resposta JSON da IA:", parseError);
        setAiSuggestions(
          "Sugestões de texto geradas, mas a correção automática falhou."
        );
      }
    } catch (err) {
      console.error("Erro ao gerar sugestões da IA:", err);
      setAiSuggestions("Não foi possível gerar sugestões no momento.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleExportPdf = () => {
    generatePdf("cv-preview-container");
  };

  return (
    <div className="flex flex-col h-screen">
      <HeaderCV onImprove={handleImprove} onExportPdf={handleExportPdf} />
      <div
        id="cv-preview-container"
        className="p-6 text-black bg-white font-sans"
        style={{ position: "absolute", left: "-9999px" }}
      >
        <h1 className="text-3xl font-bold mb-4">{personalInfo.name}</h1>
        <p className="text-sm mb-2">
          Email: {personalInfo.email} | Telefone: {personalInfo.phone} |
          LinkedIn: {personalInfo.linkedin}
        </p>

        {personalInfo.resumoProfissional && (
          <>
            <h2 className="text-xl font-bold mt-6 mb-2">Resumo Profissional</h2>
            <p>{personalInfo.resumoProfissional}</p>
          </>
        )}

        {skills.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-6 mb-2">Habilidades</h2>
            <ul className="list-disc ml-5">
              {skills.map((skill) => (
                <li key={skill.name}>
                  {skill.name} - {skill.level}
                </li>
              ))}
            </ul>
          </>
        )}

        {experiences.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-6 mb-2">Experiências</h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {exp.cargo} em {exp.empresa}
                </h3>
                <p className="text-sm">
                  {exp.inicio} até {exp.atual ? "Atualmente" : exp.fim || "—"}
                </p>
                <p className="text-sm">{exp.descricao}</p>
              </div>
            ))}
          </>
        )}
      </div>
      <ContainerCV>
        <FormSection>
          <div className="mb-6">
            <FormLabels>Informações pessoais</FormLabels>
            <PersonalInfo value={personalInfo} onChange={setPersonalInfo} />
          </div>

          <div className="mb-6">
            <FormLabels>Habilidades</FormLabels>
            <SkillsMultiSelect value={skills} onChange={setSkills} />
          </div>

          <div>
            <FormLabels>Experiências</FormLabels>
            <ExperienceForm value={experiences} onChange={setExperiences} />
          </div>
        </FormSection>

        <PreviewSection>
          <h2 className="text-lg font-semibold mb-4">Pré-visualização</h2>
          <ErrorBoundary>
            {loadingAI && <LoadingSpinner />}
            <CvPreview
              personalInfo={personalInfo}
              skills={skills}
              experiences={experiences}
            />
            {aiSuggestions && (
              <div className="mt-6 p-4 border rounded bg-slate-100 shadow">
                <h3 className="font-semibold mb-2 text-indigo-700">
                  Sugestões da IA
                </h3>
                <p className="whitespace-pre-line">{aiSuggestions}</p>
              </div>
            )}
          </ErrorBoundary>
        </PreviewSection>

        {aiSuggestions && !loadingAI && (
          <Toast message="Sugestões da IA atualizadas!" type="success" />
        )}
      </ContainerCV>
    </div>
  );
};

export default Layout;
