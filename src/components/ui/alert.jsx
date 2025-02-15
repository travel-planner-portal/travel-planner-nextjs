import React from "react";

const Alert = ({ children, variant = "default", className = "" }) => {
  const baseStyles = "flex gap-3 p-4 rounded-lg text-sm";

  const variantStyles = {
    default: "bg-white border",
    destructive: "border-red-200 bg-red-50 text-red-900",
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <div role="alert" className={combinedClassName}>
      {children}
    </div>
  );
};

const AlertDescription = ({ children, className = "" }) => {
  return <div className={`text-sm ${className}`}>{children}</div>;
};

export { Alert, AlertDescription };
