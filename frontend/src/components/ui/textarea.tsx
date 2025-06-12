import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      className={`w-full border rounded p-2 ${className}`}
      {...props}
    />
  );
};
