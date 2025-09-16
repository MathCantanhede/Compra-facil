import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItemById, updateItem } from "../services/api";

type Item = {
  id: string;
  name: string;
  price: number;
};

export default function Editprice() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await getItemById(id);
        setItem(res.data);
        setPrice(res.data.price.toString());
      } catch (err) {
        console.error("Erro ao buscar item:", err);
        alert("Item não encontrado.");
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const updatedPrice = parseFloat(price);
    if (isNaN(updatedPrice) || updatedPrice < 0) {
      alert("Preço inválido");
      return;
    }

    try {
      await updateItem(item.id, { price: updatedPrice });
      navigate("/PageList");
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      alert("Erro ao salvar o item.");
    }
  };

  if (!item) return <p className="text-center p-8">Produto não encontrado</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-300 w-full max-w-lg text-center space-y-6">
        <h2 className="text-xl font-semibold text-blue-600">Editar preço</h2>
        <p className="text-lg">{item.name}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-md px-4 py-2 w-full text-lg"
            autoFocus
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/PageList")}
              className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
