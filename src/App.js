import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [loading, setloading] = useState(false);

  const handleQuery = async () => {
    if (!query) {
      alert("Enter your query first!");
      return;
    }
    setloading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log("data: ", data);

      setResult(data?.data ? data?.data : {});
      setQuery("");
      setloading(false);
    } catch (error) {
      setloading(false);
      alert("Something went wrong try again!\n"+error);

    }
  };

  const dataTable = () => {
    return (
      <div style={{ padding: 20, width: "100%" }}>
        <h3>Query: {result?.query ? result?.query : ""}</h3>
        <h3>
          Generated AI SQL Query: {result?.sql_query ? result?.sql_query : ""}
        </h3>
        <h3>Results: {result?.result?.length ? result?.result?.length : ""}</h3>

        {result?.result?.map((item, index) => (
          <div
            style={{ marginBottom: 20, borderBottom: "dashed 1px #000" }}
            key={index}
          >
            {item.map((header) => (
              <p>{header}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>ByteGenie Event Query App</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          style={{ width: 400, height: 40, borderRadius: 10 }}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <button
          style={{ width: 400, height: 40, borderRadius: 10 }}
          onClick={handleQuery}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {dataTable()}
    </div>
  );
}

export default App;
