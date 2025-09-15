import type { TExperience } from "../../interfaces/form.interfaces";
import { ThemeBorder, ThemeButton } from "../../styles/theme";

type ExperienceProps = {
  value: TExperience[];
  onChange: (experiencias: TExperience[]) => void;
};

const ExperienceForm = ({ value, onChange }: ExperienceProps) => {
  const handleChange = (
    index: number,
    field: keyof TExperience,
    newValue: string | boolean
  ) => {
    const copy = [...value];
    const exp = { ...copy[index], [field]: newValue };

    if (field === "atual" && newValue === true) exp.fim = "";

    if (field === "fim" && newValue) {
      const inicio = new Date(copy[index].inicio);
      const fim = new Date(newValue as string);
      if (inicio && fim && fim < inicio) {
        alert("A data final não pode ser anterior à data de início.");
        exp.fim = "";
      }
    }

    copy[index] = exp;
    onChange(copy);
  };

  const addExperience = () => {
    onChange([
      ...value,
      { empresa: "", cargo: "", inicio: "", fim: "", atual: false, descricao: "" },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-4">
      {value.map((exp, index) => (
        <div key={index} className="rounded border p-4">
          <h3 className="font-semibold mb-2">Experiência {index + 1}</h3>

          <input
            type="text"
            placeholder="Empresa"
            value={exp.empresa}
            onChange={(e) => handleChange(index, "empresa", e.target.value)}
            className={`${ThemeBorder.default} w-full rounded mb-2 px-3 py-2`}
          />

          <input
            type="text"
            placeholder="Cargo"
            value={exp.cargo}
            onChange={(e) => handleChange(index, "cargo", e.target.value)}
            className={`${ThemeBorder.default} w-full rounded mb-2 px-3 py-2`}
          />

          <div className="flex gap-2 mb-2">
            <input
              type="date"
              value={exp.inicio}
              onChange={(e) => handleChange(index, "inicio", e.target.value)}
              className={`${ThemeBorder.default} w-1/2 rounded px-3 py-2`}
            />
            <input
              type="date"
              value={exp.fim}
              disabled={exp.atual}
              onChange={(e) => handleChange(index, "fim", e.target.value)}
              className={`${ThemeBorder.default} w-1/2 rounded px-3 py-2`}
            />
          </div>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={exp.atual}
              onChange={(e) => handleChange(index, "atual", e.target.checked)}
            />
            Trabalho atual
          </label>

          <textarea
            placeholder="Descrição"
            value={exp.descricao}
            onChange={(e) => handleChange(index, "descricao", e.target.value)}
            className={`${ThemeBorder.default} w-full rounded px-3 py-2`}
          />

          <button
            type="button"
            onClick={() => removeExperience(index)}
            className={`${ThemeButton.default} bg-red-600 mt-2 px-3 py-1 text-sm text-white hover:bg-red-500`}
          >
            🗑 Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className={`${ThemeButton.default} bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-500`}
      >
        + Adicionar Experiência
      </button>
    </div>
  );
};

export default ExperienceForm;
