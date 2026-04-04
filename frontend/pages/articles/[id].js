import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/api/articles/${id}`);
        const data = await res.json();

        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FFDAB3" }}
      >
        <p style={{ color: "#574964" }}>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FFDAB3" }}
      >
        <p style={{ color: "#574964" }}>Article not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: "#FFDAB3" }}>
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 px-4 py-2 rounded"
        style={{ background: "#574964", color: "white" }}
      >
        ← Back
      </button>

      {/* 📄 ARTICLE CARD */}
      <div
        className="p-8 rounded-xl shadow max-w-3xl mx-auto"
        style={{
          background: "#C8AAAA",
          fontFamily: "monospace serif",
          fontSize: "18px",
        }}
      >
        <h1 className="text-3xl font-bold mb-4" style={{ color: "#574964" }}>
          {article.title}
        </h1>

        <p className="mb-4" style={{ color: "#574964", fontStyle: "italic" }}>
          {article.description}
        </p>

        <div className="leading-relaxed mb-6" style={{ color: "#574964" }}>
          {article.content}
        </div>

        {/* 🏷️ TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded text-sm"
              style={{
                background: "#9F8383",
                color: "white",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 📅 DATE */}
        <p className="text-sm" style={{ color: "#574964" }}>
          Created on {new Date(article.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
