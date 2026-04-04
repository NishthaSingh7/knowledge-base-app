import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔥 FETCH ARTICLE
  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/api/articles/${id}`);
        const data = await res.json();

        setForm({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
          tags: data.tags ? data.tags.join(",") : "",
        });

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // 🔥 UPDATE ARTICLE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login required ❌");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Updated successfully ✅");
        router.push("/dashboard");
      } else {
        toast.error(data.message || "Update failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FFDAB3" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

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
          ✏️ Edit Article
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.title}
            className="w-full p-3 rounded border"
            placeholder="Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            value={form.description}
            className="w-full p-3 rounded border"
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <textarea
            value={form.content}
            rows="5"
            className="w-full p-3 rounded border"
            placeholder="Content"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />

          <input
            value={form.tags}
            className="w-full p-3 rounded border"
            placeholder="Tags (comma separated)"
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 rounded text-white"
            style={{ background: "#574964" }}
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
}
