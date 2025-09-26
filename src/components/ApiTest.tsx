import { useState, useEffect } from "react";
import { apiService } from "../services/api";

export function ApiTest() {
  const [apiUrl, setApiUrl] = useState("");
  const [healthStatus, setHealthStatus] = useState<
    "checking" | "success" | "error"
  >("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obter URL da API
    const url = apiService.getApiUrl();
    setApiUrl(url);

    // Testar health check
    const testHealth = async () => {
      try {
        const isHealthy = await apiService.healthCheck();
        setHealthStatus(isHealthy ? "success" : "error");
        if (!isHealthy) {
          setError("API não está respondendo");
        }
      } catch (err) {
        setHealthStatus("error");
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    };

    testHealth();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">🔍 Teste da API</h3>

      <div className="space-y-2">
        <div>
          <strong>URL da API:</strong>
          <code className="ml-2 bg-white px-2 py-1 rounded text-sm">
            {apiUrl}
          </code>
        </div>

        <div>
          <strong>Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded text-sm ${
              healthStatus === "success"
                ? "bg-green-100 text-green-800"
                : healthStatus === "error"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {healthStatus === "checking"
              ? "🔄 Verificando..."
              : healthStatus === "success"
              ? "✅ Conectado"
              : "❌ Erro"}
          </span>
        </div>

        {error && (
          <div className="text-red-600 text-sm">
            <strong>Erro:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
}
