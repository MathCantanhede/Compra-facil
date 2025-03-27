import { useState } from "react"; // Aqui, você só precisa importar hooks como o useState
import { useNavigate } from "react-router-dom";
import Input from "./components/Input"; // Adapte conforme seu caminho
import Button from "./components/Button"; // Adapte conforme seu caminho

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  // Função para tratar o envio do formulário de nome
  const handleSubmit = () => {
    if (name.trim() === "") {
      alert("Por favor, preencha o campo com seu Nome");
      return;
    }

    // Salva o nome do usuário no localStorage
    localStorage.setItem("userName", name);

    // Redireciona para a página Home após salvar o nome
    navigate("/Home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p- bg-green-300">
      <div className="bg-white p-6 rounded-lg shadow-md w-[95%] max-w-md text-center">
        <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Seja bem-vindo(a)
        </h3>
        <p className="text-gray-600 mt-2">Qual o seu nome?</p>
        <Input
          className="text-center border-gray-300 border-[0.5px] rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Nome & Sobrenome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button 
        className="mt-8 w-16 flex items-center justify-center cursor-pointer  bg-[#D4F3A2] rounded-lg p-3 shadow-md hover:bg-[#A2DFA3] transition duration-300 ease-in-out m-auto"
        text="Entrar" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default App;