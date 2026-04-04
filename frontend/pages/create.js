import { useState } from "react";
import { createArticle } from "../services/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login ❌");
      router.push("/login");
      return;
    }

    const data = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    };

    try {
      await createArticle(data, token);
      toast.success("Article created 🎉");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Creation failed ❌");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#FFDAB3" }}
    >
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-2xl"
        style={{ background: "#C8AAAA" }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#574964" }}
        >
          ➕ Create Article
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <textarea
            placeholder="Content"
            rows="5"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            placeholder="Tags (comma separated)"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 rounded text-white"
            style={{ background: "#574964" }}
          >
            Create Article
          </button>
        </form>
      </div>
    </div>
  );
}
