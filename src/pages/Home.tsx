import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { List } from "lucide-react";
import { createItem, getItemsByUser } from "../services/api";
import axios from "axios";

type Item = {
  id: string;
  name: string;
  price: number;
};

function Home() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [userName, setUserName] = useState<string>("");

  const fetchItems = useCallback(async (userId: string) => {
    try {
      const response = await getItemsByUser(userId);
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Usuário não identificado. Redirecionando para o login.");
      navigate("/Login");
      return;
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }

    fetchItems(userId);
  }, [navigate, fetchItems]);

  const handleAddItem = async () => {
    if (itemName.trim() === "" || itemPrice === "") {
      return alert("Por favor preencha todos os campos.");
    }

    const parsedPrice = parseFloat(itemPrice.replace(".", "").replace(",", "."));
    if (isNaN(parsedPrice)) {
      return alert("Preço inválido.");
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Usuário não identificado.");
      return;
    }

    try {
      await createItem({ name: itemName, price: parsedPrice, userId });
      setItemName("");
      setItemPrice("");
      fetchItems(userId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro ao adicionar item:", error.response?.data || error.message);
        alert("Erro ao adicionar item: " + (error.response?.data?.error || error.message));
      } else {
        console.error("Erro desconhecido:", error);
        alert("Erro desconhecido ao adicionar item.");
      }
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d,]/g, "");

    if (value.length > 2 && !value.includes(",")) {
      value = value.slice(0, value.length - 2) + "," + value.slice(value.length - 2);
    }

    if (value.length > 6) {
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    setItemPrice(value);
  };

  const totalValue = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-green-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-300 w-full max-w-lg text-center">
        <p className="sm:text-3xl md:text-4xl font-bold text-blue-600">
          Seja Bem-vindo(a)!<br />
          <span className="text-lg text-blue-600">{userName}</span>
        </p>

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
          O que você gostaria de adicionar à sua lista de compras?
        </p>

        <div className="mt-6 space-y-4 w-full">
          <Input
            className="w-full border border-gray-400 rounded-lg p-2"
            placeholder="Nome do item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Input
            className="w-full border border-gray-400 rounded-lg p-2"
            placeholder="Valor do item"
            value={itemPrice}
            onChange={handlePriceChange}
          />
        </div>

        <Button
          className="mt-8 w-28 bg-[#D4F3A2] hover:bg-[#A2DFA3] rounded-lg p-1 shadow-md m-auto"
          text="Adicionar Item"
          onClick={handleAddItem}
        />

        <div className="mt-4 text-lg font-semibold">
          <p>Total: R${totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
        </div>

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