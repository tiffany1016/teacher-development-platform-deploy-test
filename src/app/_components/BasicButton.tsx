import { INDIGO, LIGHT_BLUE } from "@/lib/constants";

export interface ButtonProps {
    text?: string;
    href?: string;
    dark: boolean;
    width: string;
    onClick?: () => void;
}

export function BasicButton({ text, href, dark, width, onClick }: ButtonProps) {

  return (
    <a
      className="cursor-pointer justify-self-center text-center rounded-full font-semibold text-sm hover:opacity-80 py-1"
      style={{backgroundColor: dark?INDIGO:LIGHT_BLUE, color: dark?"white":INDIGO, width: width }}
      {...(onClick && {onClick})}
      {...href && {href}}>
      {text}
    </a>
  );
}