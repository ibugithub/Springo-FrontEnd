"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { EditProduct } from "./editProduct";
import { toast } from "react-toastify";
import { Product } from "./interface";

export const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const fetch = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/company/show_device/");
    setProducts(response.data);
    console.log('the response is: ' , response)
  };

  useEffect(() => {
    const fetchProducts = async () => {
      fetch();
    };
    fetchProducts();
  }, []);

  const handleEdit = (prod: Product) => {
    setEditingProd(prod);
  };

  const handleSave = (newProd: Product) => {
    fetch();
    const isChanged =
      newProd._id === editingProd?._id &&
      newProd.name === editingProd?.name &&
      newProd.description === editingProd?.description &&
    setEditingProd(null);
    if (!isChanged) {
      toast.success("Device updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingProd(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/prod/del/${id}`);
      fetch();
      toast.success("Device deleted successfully");
    } catch (err) {
      console.error("Error deleting device", err);
    }
  };

  return (
    <div className="bg-white text-red-900 pl-10 pb-10">
      <h1 className="text-center"> Products </h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            {editingProd && editingProd.id === product.id ? (
              <EditProduct
                key={product.id}
                product={editingProd}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <h2 className="text-3xl">{product.name}</h2>
                <p>Description: {product.description}</p>
                <div className="text-white flex gap-2">
                  <button
                    className="bg-blue-500 px-4 py-1"
                    onClick={() => {
                      handleEdit(product);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                  <button
                    className="bg-red-400 px-4 py-1"
                    onClick={() => {
                      handleDelete(product.id);
                    }}
                  >
                    {" "}
                    Delete{" "}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
