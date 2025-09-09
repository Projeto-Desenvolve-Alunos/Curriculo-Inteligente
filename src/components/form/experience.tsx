import React, { useState } from "react";

interface Experiencia {
  empresa: string;
  cargo: string;
  inicio: string;
  fim: string;
  atual: boolean;
  descricao: string;
}

const FormExperiencia: React.FC = () => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([
    { empresa: "", cargo: "", inicio: "", fim: "", atual: false, descricao: "" },
  ]);

  // Adicionar uma nova experiência
  const adicionarExperiencia = () => {
    setExperiencias([
      ...experiencias,
      { empresa: "", cargo: "", inicio: "", fim: "", atual: false, descricao: "" },
    ]);
  };

  // Remover a última experiência
  const removerUltimaExperiencia = () => {
    if (experiencias.length > 1) {
      setExperiencias(experiencias.slice(0, -1));
    }
  };

  // Atualizar os campos de cada experiência
  const handleChange = (index: number, field: keyof Experiencia, value: string | boolean) => {
    const novasExperiencias = [...experiencias];
    const experiencia = { ...novasExperiencias[index], [field]: value };

    // Se marcar "trabalho atual", limpa o campo fim
    if (field === "atual" && value === true) {
      experiencia.fim = "";
    }

    // Validação: fim não pode ser antes do início
    if (field === "fim" && value) {
      const inicio = new Date(novasExperiencias[index].inicio);
      const fim = new Date(value as string);

      if (inicio && fim && fim < inicio) {
        alert("A data final não pode ser anterior à data de início.");
        experiencia.fim = "";
      }
    }

    novasExperiencias[index] = experiencia;
    setExperiencias(novasExperiencias);
  };

  const handleSubmit = () => {
    for (const exp of experiencias) {
      if (!exp.empresa || !exp.cargo || !exp.inicio) {
        alert("Preencha os campos obrigatórios (Empresa, Cargo e Data de Início).");
        return;
      }
    }
    console.log("Experiências salvas:", experiencias);
    alert("Experiências salvas com sucesso!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Experiências Profissionais</h2>

      {experiencias.map((exp, index) => (
        <div key={index} className="border p-4 rounded mb-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Experiência {index + 1}</h3>

          <input
            type="text"
            placeholder="Empresa"
            value={exp.empresa}
            onChange={(e) => handleChange(index, "empresa", e.target.value)}
            className="w-full border p-2 mb-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Cargo"
            value={exp.cargo}
            onChange={(e) => handleChange(index, "cargo", e.target.value)}
            className="w-full border p-2 mb-2 rounded"
            required
          />

          <div className="flex gap-2 mb-2">
            <input
              type="date"
              value={exp.inicio}
              onChange={(e) => handleChange(index, "inicio", e.target.value)}
              className="border p-2 rounded w-1/2"
              required
            />

            <input
              type="date"
              value={exp.fim}
              onChange={(e) => handleChange(index, "fim", e.target.value)}
              className="border p-2 rounded w-1/2"
              disabled={exp.atual}
            />
          </div>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={exp.atual}
              onChange={(e) => handleChange(index, "atual", e.target.checked)}
            />
            Trabalho atual
          </label>

          <textarea
            placeholder="Descrição das atividades"
            value={exp.descricao}
            onChange={(e) => handleChange(index, "descricao", e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={adicionarExperiencia}
        >
          + Adicionar Experiência
        </button>

        <button
          type="button"
          onClick={removerUltimaExperiencia}
        >
          Remover Última
        </button>

        <button
          type="button"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default FormExperiencia;
