


import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/files"
      );

      setFiles(response.data);
    } catch (error) {
      console.error("File list error:", error);
      setMessage("Unable to load files.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setMessage(
        `${response.data.originalName} stored in ${response.data.storedIn}`
      );

      setFile(null);
      loadFiles();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("File upload failed.");
    }
  };

  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        loadFiles();
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/files/search?name=${encodeURIComponent(
          search
        )}`
      );

      setFiles(response.data);
    } catch (error) {
      console.error("Search error:", error);
      setMessage("Unable to search files.");
    }
  };

  const handleShowAll = () => {
    setSearch("");
    loadFiles();
  };

  const handleDownload = (node, filename) => {
    const url =
      `http://localhost:5000/download/${node}/` +
      encodeURIComponent(filename);

    window.open(url, "_blank");
  };

  const handleDelete = async (id, filename) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${filename}"?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/files/${id}`
      );

      setMessage(`${filename} deleted successfully.`);
      loadFiles();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("File deletion failed.");
    }
  };

  const node1Files = files.filter(
    (file) => file.node === "node1"
  ).length;

  const node2Files = files.filter(
    (file) => file.node === "node2"
  ).length;

  const node3Files = files.filter(
    (file) => file.node === "node3"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#1f2937",
            color: "white",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
          }}
        >
          <h1 style={{ margin: 0 }}>
            Distributed File System
          </h1>

          <p style={{ marginBottom: 0 }}>
            File storage and distribution dashboard
          </p>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Total Files</h3>
            <h2>{files.length}</h2>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Node 1</h3>
            <h2>{node1Files} Files</h2>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Node 2</h3>
            <h2>{node2Files} Files</h2>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <h3>Node 3</h3>
            <h2>{node3Files} Files</h2>
          </div>
        </div>

        {/* Upload */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <h2>Upload File</h2>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <button
            onClick={handleUpload}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>

          <p>{message}</p>
        </div>

        {/* Search */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <h2>Search Files</h2>

          <input
            type="text"
            placeholder="Enter file name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              padding: "9px",
              width: "300px",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              marginLeft: "10px",
              padding: "9px 15px",
              cursor: "pointer",
            }}
          >
            Search
          </button>

          <button
            onClick={handleShowAll}
            style={{
              marginLeft: "10px",
              padding: "9px 15px",
              cursor: "pointer",
            }}
          >
            Show All
          </button>
        </div>

        {/* Files */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "10px",
          }}
        >
          <h2>Stored Files</h2>

          <button
            onClick={loadFiles}
            style={{
              padding: "8px 15px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>

          {files.length === 0 ? (
            <p>No files found.</p>
          ) : (
            files.map((item) => (
              <div
                key={item._id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "8px",
                }}
              >
                <strong>
                  {item.filename}
                </strong>

                <span>
                  {" → "}
                  {item.node}
                </span>

                <button
                  onClick={() =>
                    handleDownload(
                      item.node,
                      item.filename
                    )
                  }
                  style={{
                    marginLeft: "15px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      item._id,
                      item.filename
                    )
                  }
                  style={{
                    marginLeft: "8px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;