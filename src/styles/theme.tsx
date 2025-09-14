const ThemeBorder = {
  default: "border-1 border-slate-300",
};

const ThemeTypography = {
  default: "text-neutral-900"
}

const ThemeButton = {
  default: `
    ${ThemeBorder.default} 
    relative overflow-hidden 
    bg-blue-600 text-white 
    border border-blue-800 
    px-4 py-2 rounded-md 
    transition-colors duration-300
    before:absolute before:inset-0 
    before:bg-blue-700 before:translate-x-[-100%] 
    before:transition-transform before:duration-300 
    hover:before:translate-x-0
    hover:border-blue-900
    before:-z-10 z-10
  `
}

export { ThemeBorder, ThemeTypography, ThemeButton };
