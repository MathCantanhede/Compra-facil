import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { UUIDTypes } from "uuid";
import { List } from "lucide-react";

type Item = {
  id: UUIDTypes;
  name: string;
  price: number;
};

function Home() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [userName, setUserName] = useState<string>("");
  
  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      // Se o nome não estiver armazenado, você pode redirecionar o usuário para a página de login ou cadastro
      // navigate('/login'); 
    }
  }, []);

  const handleAddItem = () => {
    if (itemName.trim() === "" || itemPrice === "") {
      return alert("Por favor preencha todos os campos.");
    }

    const parsedPrice = parseFloat(itemPrice.replace(".", "").replace(",", "."));
    if (isNaN(parsedPrice)) {
      return alert("Preço inválido.");
    }

    const newItem: Item = { id: Date.now().toString(), name: itemName, price: parsedPrice };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    // Salva os itens atualizados no localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));

    // Resetar os campos
    setItemName("");
    setItemPrice("");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, ""); // Remover tudo que não for número ou vírgula

    if (value.length > 2 && !value.includes(",")) {
      value = value.slice(0, value.length - 2) + "," + value.slice(value.length - 2); // Formatar preço com vírgula
    }

    if (value.length > 6) {
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Formatar com ponto a cada 3 dígitos
    }

    setItemPrice(value);
  };

  // Cálculo do valor total
  const totalValue = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-300 w-full max-w-lg text-center">
        <p className="sm:text-3xl md:text-4xl font-bold text-blue-600">
          Seja Bem-vindo(a)!
          <br />
          <span className="text-lg text-blue-600">{userName}</span>
        </p>

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          O que você gostaria de adicionar à sua lista de compras?
        </p>

        <div className="mt-6 space-y-4 w-full">
          <Input
            className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
            placeholder="Nome do item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Input
            className="w-full border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg"
            placeholder="Valor do item"
            value={itemPrice}
            onChange={handlePriceChange}
          />
        </div>
        <Button 
        className="mt-8 w-28 flex items-center justify-center cursor-pointer bg-[#D4F3A2] rounded-lg p-1 shadow-md hover:bg-[#A2DFA3] transition duration-300 ease-in-out m-auto"
        text="Adicionar Item" onClick={handleAddItem} />
        
        {/* Exibindo o valor total */}
        <div className="mt-4 text-lg font-semibold">
          <p>Total: R${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>
        
        {/* Ícone para ir para PageList */}
        <div
          className="mt-4 flex items-center cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => navigate("/PageList")}
        >
          <List className="m-auto" />
        </div>
      </div>
    </div>
  );
}

export default Home;