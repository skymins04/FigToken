import { ReactNode } from "react";
import { ThemeToggleButton, ExportCodeButton } from ".";

export type HeaderProps = {
  title: ReactNode;
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between items-center border-b p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex justify-end items-center gap-2">
        <ThemeToggleButton />
        <ExportCodeButton />
      </div>
    </div>
  );
};
