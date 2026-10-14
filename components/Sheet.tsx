import React, { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}

// Bottom sheet on mobile, centered dialog on desktop. Built on the native
// <dialog>, which handles focus trapping and Esc for us.
const Sheet = ({ open, onClose, label, children }: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-3xl bg-surface p-0 text-ink shadow-2xl md:m-auto md:max-w-sm md:rounded-3xl">
      {open && <div className="px-4 pb-6 pt-3">{children}</div>}
    </dialog>
  );
};

export default Sheet;
