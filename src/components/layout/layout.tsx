import { ContainerCV, FormSection, HeaderCV, PreviewSection } from "./layout.style";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderCV />
      <ContainerCV>
        <FormSection />
        <PreviewSection />
      </ContainerCV>
    </div>
  )
}

export default Layout;