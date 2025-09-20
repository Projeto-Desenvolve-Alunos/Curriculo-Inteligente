import { useState } from "react";
import SkillsMultiSelect from "../form/skillMultiselect/skillMultiselect";
import PersonalInfo from "../form/personalInfo/personaInfo";

import {
  ContainerCV,
  FormLabels,
  FormSection,
  HeaderCV,
  PreviewSection
} from "./layout.style";

import type { TSkill, TPersonalInfo, TExperience } from "../../interfaces/form.interfaces";
import ExperienceForm from "../form/experience";

const Layout: React.FC = () => {
  const [skills, setSkills] = useState<TSkill[]>([]);

  const [personalInfo, setPersonalInfo] = useState<TPersonalInfo>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
  });

  const [experiences, setExperiences] = useState<TExperience[]>([
    { empresa: "", cargo: "", inicio: "", fim: "", atual: false, descricao: "" },
  ]);

  return (
    <div className="flex flex-col h-screen">
      <HeaderCV />
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
          <h2 className="text-lg font-semibold mb-2">Pré-visualização</h2>

          <div className="mb-4">
            <p><strong>Nome:</strong> {personalInfo.name}</p>
            <p><strong>Email:</strong> {personalInfo.email}</p>
            <p><strong>Telefone:</strong> {personalInfo.phone}</p>
            <p><strong>Linkedin:</strong> {personalInfo.linkedin}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Habilidades</h3>
            <ul className="list-disc ml-5">
              {skills.map((item) => (
                <li key={item.name}>
                  {item.name} – {item.level}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Experiências</h3>
            <ul className="list-disc ml-5">
              {experiences.map((exp, i) => (
                <li key={i}>
                  <p><strong>{exp.empresa}</strong> – {exp.cargo}</p>
                  <p>
                    {exp.inicio} até{" "}
                    {exp.atual ? "Atualmente" : exp.fim || "—"}
                  </p>
                  <p>{exp.descricao}</p>
                </li>
              ))}
            </ul>
          </div>
        </PreviewSection>
      </ContainerCV>
    </div>
  );
};

export default Layout;
