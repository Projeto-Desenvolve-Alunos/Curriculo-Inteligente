import React, { useState } from "react";

const App = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    summary: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (value.trim().length < 3) {
          error = "O nome precisa ter pelo menos 3 caracteres";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Digite um email válido";
        }
        break;
      case "phone":
        if (!/^\d{10,11}$/.test(value)) {
          error = "Digite um telefone válido com DDD (10 ou 11 dígitos)";
        }
        break;
      case "linkedin":
        if (!value.startsWith("https://www.linkedin.com/")) {
          error = "Digite um link válido do LinkedIn";
        }
        break;
      case "summary":
        if (value.length > 200) {
          error = "O resumo pode ter no máximo 200 caracteres";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Construir Currículo
        </h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-1 font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={resumeData.name}
            onChange={handleChange}
            className={`p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            className={`p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="phone" className="mb-1 font-medium text-gray-700">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            className={`p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.phone ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="linkedin" className="mb-1 font-medium text-gray-700">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={resumeData.linkedin}
            onChange={handleChange}
            className={`p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.linkedin ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
            }`}
          />
          {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="summary" className="mb-1 font-medium text-gray-700">
            Resumo Profissional
          </label>
          <textarea
            id="summary"
            name="summary"
            rows="4"
            maxLength="200"
            value={resumeData.summary}
            onChange={handleChange}
            className={`p-2 border rounded focus:outline-none focus:ring-2 ${
              errors.summary ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-indigo-500"
            }`}
          ></textarea>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">
              {resumeData.summary.length}/200 caracteres
            </span>
            {errors.summary && <span className="text-red-500">{errors.summary}</span>}
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Salvar Dados
        </button>
      </div>
    </div>
  );
};

export default App;