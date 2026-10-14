import React from "react";

interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
}

const Switch = ({ checked, onChange, label, className = "" }: Props) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`flex min-h-11 items-center gap-2.5 text-sm font-semibold ${className}`}>
    {label}
    <span
      className={`relative block h-6 w-10 flex-none rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-line"
      }`}>
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition-all ${
          checked ? "left-[19px]" : "left-[3px]"
        }`}
      />
    </span>
  </button>
);

export default Switch;
