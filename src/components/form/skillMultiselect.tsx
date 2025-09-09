import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import type { TSkill } from "../../interfaces/form.interfaces";

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
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s.name !== skill));
  };

  const changeLevel = (skill: string, newLevel: TSkill["level"]) => {
    onChange(
      value.map((s) =>
        s.name === skill ? { ...s, level: newLevel } : s
      )
    );
  };

  return (
    <div className="w-full">
      <Listbox value={null} onChange={addSkill}>
        <Label className="block text-sm font-medium text-white mb-1">
          Skills pré-definidas
        </Label>
        <div className="relative mb-2">
          <ListboxButton className="w-full rounded-md bg-gray-800 py-2 px-3 text-left text-white">
            Adicionar skill
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md bg-gray-800 text-white">
            {skillsList.map((skill) => (
              <ListboxOption
                key={skill}
                value={skill}
                className="cursor-pointer select-none py-2 px-3 hover:bg-indigo-500"
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
          className="mb-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Adicionar mais habilidade
        </button>
      )}

      {showInput && (
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Digite o nome da skill"
            value={inputSkill}
            onChange={(e) => setInputSkill(e.target.value)}
            className="flex-1 rounded-md bg-gray-800 py-2 px-3 text-white placeholder-gray-400"
          />
          <button
            onClick={() => addSkill(inputSkill)}
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            Adicionar
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {value.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1 text-sm text-white"
          >
            <span>{skill.name}</span>
            <select
              value={skill.level}
              onChange={(e) =>
                changeLevel(skill.name, e.target.value as TSkill["level"])
              }
              className="rounded bg-gray-800 text-xs text-white"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
            <button
              onClick={() => removeSkill(skill.name)}
              className="rounded p-1 hover:bg-red-600"
            >
              <XMarkIcon className="h-4 w-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMultiSelect;
