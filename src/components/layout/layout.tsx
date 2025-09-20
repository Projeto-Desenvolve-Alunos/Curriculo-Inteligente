import { useState } from "react";
import SkillsMultiSelect from "../form/skillMultiselect/skillMultiselect";
import { ContainerCV, FormLabels, FormSection, HeaderCV, PreviewSection } from "./layout.style";
import type { TSkill } from "../../interfaces/form.interfaces";

const Layout: React.FC = () => {
  const [skills, setSkills] = useState<TSkill[]>([]);
  console.log(skills)
  const changeSkills = (values: TSkill[]) => {
    setSkills(values);
  }

  return (
    <div className="flex flex-col h-screen">
      <HeaderCV />
      <ContainerCV>
        <FormSection>
          <FormLabels>Habilidades</FormLabels>
          <SkillsMultiSelect value={skills} onChange={changeSkills} />
        </FormSection>
        <PreviewSection>
          {skills.map((item) => {
            return (
              item.name
            )
          })}
        </PreviewSection>
      </ContainerCV>
    </div>
  )
}

export default Layout;