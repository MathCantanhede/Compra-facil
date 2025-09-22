import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

 const handleSubmit = async () => {
  if (name.trim() === "") {
    alert("Por favor, preencha o campo com seu Nome");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name, // só manda o nome, sem id
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar no banco");
    }

    // Pega os dados que o backend retornou
    const data = await response.json();

    // Salva o id real que o Prisma gerou
    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.name);

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
