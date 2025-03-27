interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  value?: string | number; // Valor pode ser string ou number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type = "text", placeholder = "", value, onChange, className }: InputProps) {
  return (
    <div>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className={className} 
        inputMode={type === "number" ? "numeric" : "text"} // Apenas para sugerir um teclado numérico
      />
    </div>
  );
}

export default Input;