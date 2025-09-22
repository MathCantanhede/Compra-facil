import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft, Pencil } from "lucide-react";
import { getItemsByUser, deleteItem } from "../services/api";

type Item = {
  id: string;
  name: string;
  price: number;
};

function PageList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Recupera o userId do localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      // Se não tiver userId salvo, redireciona pro login
      navigate("/");
      return;
    }
    fetchItems();
  }, []);

  // ✅ Busca itens do usuário no backend
  const fetchItems = async () => {
    try {
      if (!userId) return;
      setLoading(true);
      const res = await getItemsByUser(userId);
      setItems(res.data);
    } catch (err) {
      console.error("Erro ao buscar itens:", err);
      alert("Erro ao buscar itens.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove item e atualiza lista
  const handleRemoveItem = async (id: string) => {
    try {
      await deleteItem(id);
      fetchItems(); // Atualiza a lista após remover
    } catch (err) {
      console.error("Erro ao remover item:", err);
      alert("Erro ao remover item.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-lg text-center space-y-8">
        <p className="text-xl font-semibold text-blue-600">Lista de Compras</p>

        <div className="mt-6 w-full space-y-4">
          {loading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : items.length === 0 ? (
            <p className="text-xl text-gray-500">Nenhum item adicionado ainda.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex-1 text-lg font-semibold text-gray-800 text-left">
                  <div className="text-sm">{item.name}</div>
                </div>
                <div className="flex-1 text-lg font-semibold text-gray-800 text-left">
                  <div className="text-sm">
                    R$
                    {item.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/Editprice/${item.id}`)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Botão de Voltar */}
        <div className="mt-8 w-1 flex items-center justify-center cursor-pointer bg-[#D4F3A2] rounded-lg p-3 shadow-md hover:bg-[#A2DFA3] transition duration-300 ease-in-out m-auto">
          <button
            onClick={() => navigate("/Home")}
            className="flex items-center justify-center space-x-2"
          >
            <ChevronLeft className="m-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageList;
