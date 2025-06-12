import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ${className}`}
      {...props}
    />
  );
};
