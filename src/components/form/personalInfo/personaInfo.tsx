import { ThemeBorder } from "../../../styles/theme";
import type { TPersonalInfo } from "../../../interfaces/form.interfaces";

type PersonalInfoProps = {
  value: TPersonalInfo;
  onChange: (info: TPersonalInfo) => void;
};

const PersonalInfo = ({ value, onChange }: PersonalInfoProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TPersonalInfo
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  const inputs: {
    label: string;
    field: keyof Omit<TPersonalInfo, "resumoProfissional">;
    type: React.HTMLInputTypeAttribute;
  }[] = [
    { label: "Nome", field: "name", type: "text" },
    { label: "Email", field: "email", type: "email" },
    { label: "Telefone/Celular", field: "phone", type: "tel" },
    { label: "Linkedin", field: "linkedin", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {inputs.map((i) => (
        <input
          key={i.field}
          type={i.type}
          placeholder={i.label}
          value={value[i.field] ?? ""}
          onChange={(e) => handleChange(e, i.field)}
          className={`${ThemeBorder.default} flex-1 rounded-md bg-slate-100 py-2 px-3 text-black placeholder-neutral-900`}
        />
      ))}
    </div>
  );
};

export default PersonalInfo;