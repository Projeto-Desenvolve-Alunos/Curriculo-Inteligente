import type { IChildrenProps } from "../../../interfaces/styles.interfaces";
import { ThemeBorder, ThemeTypography } from "../../../styles/theme";

const SkillMultiSelectStyles: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg ${ThemeBorder.default} bg-slate-100 px-3 py-1 text-sm`}
    >
      {children}
    </div>
  );
};

const SkillName: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <span className={`${ThemeTypography.default} text-sm text-black`}>
      {children}
    </span>
  );
};

interface SkillSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}
const SkillSelect: React.FC<SkillSelectProps> = ({ value, onChange, children }) => {
  return (
    <select
      className={`rounded ${ThemeBorder.default} bg-slate-200 text-xs text-black`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

interface SkillRemoveButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
const SkillRemoveButton: React.FC<SkillRemoveButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="rounded p-1 hover:bg-red-600"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export { SkillMultiSelectStyles, SkillName, SkillSelect, SkillRemoveButton };
