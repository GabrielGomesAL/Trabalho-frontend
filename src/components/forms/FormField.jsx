import { cloneElement } from "react";

export default function FormField({
  children,
  error,
  hint,
  id,
  label,
  required,
}) {
  const mensagemId = error ? `${id}-erro` : hint ? `${id}-dica` : undefined;
  const campo = cloneElement(children, {
    "aria-describedby": mensagemId,
    "aria-invalid": Boolean(error),
    required,
  });

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {campo}
      {hint && !error ? (
        <span className="field-hint" id={`${id}-dica`}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field-error" id={`${id}-erro`} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
