import { useState } from "react";
import { signupUser } from "../services/api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signupUser(form);

    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user || res));

      toast.success("Account created 🎉");
      router.push("/dashboard");
    } else {
      toast.error(res.message || "Signup failed ❌");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#FFDAB3" }}
    >
      <div
        className="p-8 rounded-xl shadow-lg w-full max-w-md"
        style={{ background: "#C8AAAA" }}
      >
        <h2
          className="text-2xl font-bold text-center mb-6"
          style={{ color: "#574964" }}
        >
          ✨ Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Name"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full py-3 rounded text-white"
            style={{ background: "#574964" }}
          >
            Signup
          </button>
        </form>

        <p className="text-center mt-4" style={{ color: "#574964" }}>
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
