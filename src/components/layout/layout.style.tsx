import type { IChildrenProps } from "../../interfaces/styles.interfaces"

const ContainerCV: React.FC<IChildrenProps>= ({children}) => {
  return (
    <div className="flex w-screen h-screen bg-slate-200 > * p-5">
      {children}
    </div>
  )
}

const FormSection: React.FC<IChildrenProps> = ({ children }) => {
  return (
    <div className="w-1/2 p-5 border-1 rounded-md bg-slate-100 border-stone-900 text-black break-words overflow-y-auto">
      {children}
    </div>
  );
};

const PreviewSection: React.FC<IChildrenProps> = ({children})=> {
  return (
    <div className="w-1/2 p-5 overscroll-auto text-black break-words overflow-y-auto">
      {children}
    </div>
  )
}

export { ContainerCV, FormSection, PreviewSection}