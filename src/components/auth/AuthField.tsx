type AuthFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: "email" | "password" | "text";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  inputMode?: "numeric" | "text" | "email";
  maxLength?: number;
};

export default function AuthField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required = true,
  inputMode,
  maxLength,
}: AuthFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary" htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className="min-h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-text-primary outline-none transition placeholder:text-text-secondary focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/15"
        id={id}
        inputMode={inputMode}
        maxLength={maxLength}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
      />
    </div>
  );
}
