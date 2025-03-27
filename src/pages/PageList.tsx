import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ChevronLeft } from "lucide-react"; // Ícone de lixeira e de voltar

type Item = {
  id: string;
  name: string;
  price: number;
};

function PageList() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Recupera os itens do localStorage quando a página é carregada
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Função para remover um item
  const handleRemoveItem = (id: string) => {
    const updatedItems = items.filter((item: Item) => item.id !== id);
    setItems(updatedItems);
    
    // Atualiza o localStorage com os itens restantes
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-lg text-center space-y-8">
        <p className="text-xl font-semibold text-blue-600">Lista de Compras</p>

        <div className="mt-6 w-full space-y-4">
          {items.length === 0 ? (
            <p className="text-xl text-gray-500">Nenhum item adicionado ainda.</p>
          ) : (
            items.map((item: Item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex-1 text-lg font-semibold text-gray-800">
                  <div className="text-sm">{item.name}</div>
                </div>
                <div className="flex-1 text-lg font-semibold text-gray-800">
                  <div className="text-sm">
                    R${item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)} // Passando o ID para remover
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Botão de Voltar */}
        <div className="mt-8 w-1 flex items-center justify-center cursor-pointer  bg-[#D4F3A2] rounded-lg p-3 shadow-md hover:bg-[#A2DFA3] transition duration-300 ease-in-out m-auto">
          <button
            onClick={() => navigate("/Home")}
            className="flex items-center justify-center space-x-2"
            
          >
            <ChevronLeft 
            className="m-auto"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageList;