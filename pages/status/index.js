import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

export default function StatusPage() {
  const response = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  console.log(response.isLoading);
  console.log(response.data);

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAtText = "Carregando...";

  if (!isLoading && data) {
    updateAtText = new Date(data.update_at).toLocaleString("pt-BR");
  }

  return <div>Última Atualização: {updateAtText}</div>;
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseInfo = "Carregando...";

  if (!isLoading && data) {
    databaseInfo = (
      <div>
        <p>Versão: {data.dependencies.database.version}</p>
        <p>Conexões Máximas: {data.dependencies.database.max_connections}</p>
        <p>Conexões Abertas: {data.dependencies.database.opened_connections}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Database</h2>
      {databaseInfo}
    </div>
  );
}
