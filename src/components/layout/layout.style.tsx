import type { IChildrenProps } from "../../interfaces/styles.interfaces"
import { ThemeBorder, ThemeButton, ThemeTypography } from "../../styles/theme"

const HeaderCV = () => {
  return (
    <div className="flex w-screen justify-between items-center bg-slate-200 p-5">
      <p className={`${ThemeTypography.default} text-2xl font-bold`}>
        Currículo Inteligente
      </p>
      <button
        className={`${ThemeButton.default}`}
      >
        Melhoria com IA
      </button>
    </div>
  )
}

const ContainerCV: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <div className="flex flex-1 w-full overflow-y-auto  bg-slate-200 p-5">
      {children}
    </div>
  )
}

const FormSection: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <div
      className={`w-2/5 p-5 ${ThemeBorder.default} rounded-md bg-slate-100 text-black break-words overflow-y-auto flex flex-col gap-3`}
    >
      {children}
    </div>
  )
}

const PreviewSection: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <div className="w-3/5 p-5 overscroll-auto text-black break-words overflow-y-auto">
      {children}
    </div>
  )
}

const FormLabels: React.FC<IChildrenProps> = ({children}) => {
  return (
    <p className={`${ThemeTypography.default} font-bold`}>
      {children}
    </p>
  )
}

export { HeaderCV, ContainerCV, FormSection, PreviewSection, FormLabels }
