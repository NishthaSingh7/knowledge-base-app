import { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      router.replace("/login");  
      return;
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setTimeout(() => {
          setUser(parsedUser?.user || parsedUser);
        }, 0);
      } catch (err) {
        console.error("User parse error:", err);
      }
    }
  }, []); 

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getArticles(page);

        setArticles(data?.articles || data || []);
        setTotalPages(data?.totalPages || 1);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [page]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out 👋");
    router.push("/login");
  };

  const handleDelete = async (id, createdBy) => {
    if (!user?._id || createdBy !== user._id) {
      toast.error("Unauthorized ❌");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:5001/api/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Deleted ✅");

      const data = await getArticles(page);
      setArticles(data?.articles || data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = articles.filter(
    (a) =>
      a?.title?.toLowerCase().includes(search.toLowerCase()) ||
      a?.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen" style={{ background: "#FFDAB3" }}>
      {/* NAVBAR */}
      <div
        className="flex justify-between items-center px-6 py-4"
        style={{ background: "#574964", color: "white" }}
      >
        <h1 className="text-xl font-bold">📚 Knowledge Base</h1>

        <div className="flex gap-4 items-center">
          {user && <span>👤 {user.name}</span>}

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded"
            style={{ background: "#9F8383" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="p-6">
        {/* SEARCH + CREATE */}
        <div className="flex justify-between mb-6">
          <input
            placeholder="Search..."
            className="w-1/2 p-3 rounded border"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => router.push("/create")}
            className="px-4 py-2 rounded text-white"
            style={{ background: "#574964" }}
          >
            + Create
          </button>
        </div>

        {/* ARTICLES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 ? (
            <p>No articles found</p>
          ) : (
            filtered.map((article) => (
              <div
                key={article._id}
                className="p-5 rounded shadow"
                style={{ background: "#C8AAAA" }}
              >
                <h2
                  className="font-bold cursor-pointer"
                  style={{ color: "#574964" }}
                  onClick={() => router.push(`/articles/${article._id}`)}
                >
                  {article.title}
                </h2>

                <p className="text-sm mt-2" style={{ color: "#574964" }}>
                  {article.description}
                </p>

                <div className="flex justify-between mt-4">
                  <div>
                    <button
                      onClick={() => {
                        if (!user?._id || article.createdBy !== user._id) {
                          toast.error("Not allowed ❌");
                          return;
                        }

                        router.push(`/edit/${article._id}`);
                      }}
                      className="mr-3"
                      style={{ color: "#574964" }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(article._id, article.createdBy)
                      }
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  <span className="text-xs">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-8 gap-4 items-center">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded text-white"
            style={{ background: "#574964" }}
          >
            Prev
          </button>

          <span style={{ color: "#574964" }}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded text-white"
            style={{ background: "#574964" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
