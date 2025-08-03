"use client";

import { useEffect, useState } from "react";

interface Product {
  name: string;
  description: string;
  price: number | string;
  image: string;
}

export default function Table() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(prev => [...prev, formData]);
    setFormData({ name: "", description: "", price: "", image: "" });
    setModalOpen(false);
  };

  const handleDelete = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <p className="text-2xl font-semibold">Products</p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          New +
        </button>
      </div>

      <table className="w-full shadow-md">
        <thead>
          <tr className="bg-gray-800 text-white text-center rounded-tl-xl rounded-tr-xl">
            <th className="py-2 px-4 rounded-tl-xl">Image</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4 rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="text-center py-8">
              <td className="px-5 py-6  flex items-center justify-center">
                <img src={p.image} alt="Product" width={80} className="rounded-md"/>
              </td>
              <td className="px-5 py-6">{p.name}</td>
              <td className="px-5 py-6">{p.description}</td>
              <td className="px-5 py-6">${p.price}</td>
              <td >
                <button
                  onClick={() => handleDelete(i)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-[#413f3f] bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="col-span-2 bg-green-700 text-white px-4 py-2 rounded mt-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
