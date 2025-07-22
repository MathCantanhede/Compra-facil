import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      const items: Item[] = JSON.parse(storedItems);
      const found = items.find((i) => i.id === id);
      if (found) {
        setItem(found);
        setPrice(found.price.toString());
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;

    const updatedPrice = parseFloat(price);
    if (isNaN(updatedPrice) || updatedPrice < 0) {
      alert("Preço inválido");
      return;
    }

    const storedItems = localStorage.getItem("items");
    if (!storedItems) return;

    const items: Item[] = JSON.parse(storedItems);
    const updatedItems = items.map((i) =>
      i.id === item.id ? { ...i, price: updatedPrice } : i
    );

    localStorage.setItem("items", JSON.stringify(updatedItems));
    navigate("/PageList"); // volta para a lista após salvar
  };

  if (!item) return <p>Produto não encontrado</p>;

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
              onClick={() => navigate("/list")}
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
