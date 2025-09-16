import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  // Função para tratar o envio do formulário de nome
  const handleSubmit = async () => {
    if (name.trim() === "") {
      alert("Por favor, preencha o campo com seu Nome");
      return;
    }

    const uuid = uuidv4(); // Gerar UUID antes de enviar

    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar no banco");
      }

      // Salvar no localStorage
      localStorage.setItem("userId", uuid);
      localStorage.setItem("userName", name);

      // Redireciona para a página Home
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
      <div className="bg-white p-6 rounded-lg shadow-md w-[95%] max-w-md text-center">
        <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Seja bem-vindo(a)
        </h3>
        <p className="text-gray-600 mt-2">Qual o seu nome?</p>

        <Input
          className="text-center border-gray-300 border-[0.5px] rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          className="mt-8 w-16 flex items-center justify-center cursor-pointer bg-[#D4F3A2] rounded-lg p-3 shadow-md hover:bg-[#A2DFA3] transition duration-300 ease-in-out m-auto"
          text="Entrar"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
