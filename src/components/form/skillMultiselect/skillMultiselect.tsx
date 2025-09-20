import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, type ChangeEvent } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { TSkill } from "../../../interfaces/form.interfaces";
import { ThemeBorder, ThemeButton } from "../../../styles/theme";
import {
  SkillMultiSelectStyles,
  SkillName,
  SkillRemoveButton,
  SkillSelect,
} from "./skillMuitiselect.style";

type SkillsMultiSelectProps = {
  value: TSkill[];
  onChange: (skills: TSkill[]) => void;
};

const skillsList = ["React", "TypeScript", "Tailwind", "Node.js", "Next.js"];
const levels: TSkill["level"][] = ["Básico", "Intermediário", "Avançado"];

const SkillsMultiSelect = ({ value, onChange }: SkillsMultiSelectProps) => {
  const [inputSkill, setInputSkill] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addSkill = (skill: string) => {
    if (!skill) return;
    if (!value.some((s) => s.name === skill)) {
      onChange([...value, { name: skill, level: "Básico" }]);
    }
    setInputSkill("");
    setShowInput(false);
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s.name !== skill));
  };

  const changeLevel = (skill: string, newLevel: TSkill["level"]) => {
    onChange(
      value.map((s) => (s.name === skill ? { ...s, level: newLevel } : s))
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2">

        <Listbox value={null} onChange={addSkill}>
          <div className="relative">
            <ListboxButton className="w-full text-left bg-slate-100 text-black border px-3 py-2 rounded-md">
              Adicionar skill
            </ListboxButton>
            <ListboxOptions className={`absolute z-10 mt-1 w-full rounded-md ${ThemeBorder.default} bg-slate-100 text-black`}>
              {skillsList.map((skill) => (
                <ListboxOption
                  key={skill}
                  value={skill}
                  className="cursor-pointer select-none py-2 px-3 hover:bg-slate-200"
                >
                  {skill}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            className={`${ThemeButton.default} bg-indigo-600 px-3 py-1 text-sm hover:bg-indigo-500`}
          >
            +
          </button>
        )}
      </div>

      {showInput && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Digite o nome da skill"
            value={inputSkill}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputSkill(e.target.value)
            }
            className={`${ThemeBorder.default} flex-1 rounded-md bg-slate-100 py-2 px-3 text-black placeholder-gray-400`}
          />
          <button
            onClick={() => addSkill(inputSkill)}
            className={`${ThemeButton.default} bg-green-600 px-3 py-1 text-sm hover:bg-green-500`}
          >
            +
          </button>
          <button
            onClick={() => setShowInput(false)}
            className={`${ThemeButton.default} bg-red-600 px-3 py-1 text-sm hover:bg-red-500`}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <SkillMultiSelectStyles key={skill.name}>
            <SkillName>{skill.name}</SkillName>
            <SkillSelect
              value={skill.level}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                changeLevel(skill.name, e.target.value as TSkill["level"])
              }
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </SkillSelect>
            <SkillRemoveButton onClick={() => removeSkill(skill.name)}>
              <XMarkIcon className="h-4 w-4 text-black hover:text-white" />
            </SkillRemoveButton>
          </SkillMultiSelectStyles>
        ))}
      </div>
    </div>
  );
};

export default SkillsMultiSelect;
