import { useEffect, useState } from "react";
import {
  getReports,
  addReport,
  updateReport,
  deleteReport,
} from "../services/reportService";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  const [newReport, setNewReport] = useState({
    reportName: "",
    reportType: "Fire Report",
    generatedDate: "",
    status: "Generated",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      await addReport(newReport);

      alert("✅ Report Added Successfully!");

      setNewReport({
        reportName: "",
        reportType: "Fire Report",
        generatedDate: "",
        status: "Generated",
      });

      loadReports();
    } catch (error) {
      console.log(error);
      alert("Failed to add report");
    }
  };

  const handleEdit = (report) => {
    setNewReport({
      reportName: report.reportName,
      reportType: report.reportType,
      generatedDate: report.generatedDate,
      status: report.status,
    });

    setEditingId(report.id);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await updateReport(editingId, newReport);

      alert("✅ Report Updated Successfully!");

      setEditingId(null);
      setIsEditing(false);

      setNewReport({
        reportName: "",
        reportType: "Fire Report",
        generatedDate: "",
        status: "Generated",
      });

      loadReports();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      await deleteReport(id);
      alert("✅ Report Deleted Successfully!");
      loadReports();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredReports = reports.filter((report) =>
    report.reportName.toLowerCase().includes(search.toLowerCase())
  );

  const downloadBackendPdf = () => {
    window.open("http://localhost:8080/api/reports/pdf", "_blank");
  };
  const downloadExcel = () => {
  window.open("http://localhost:8080/api/reports/excel", "_blank");
};
  

const sendEmail = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/reports/email");

        const message = await response.text();
        alert(message);
    } catch (error) {
        console.error(error);
        alert("Failed to send email");
    }
};


  return (
    <div
      style={{
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>📄 Report Management</h1>

          <button
            onClick={downloadBackendPdf}
            style={{
              marginTop: "10px",
              background: "#1976d2",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            
            
            
          >
            📄 Download PDF
          </button>
         
          <button
  onClick={downloadExcel}
  style={{
    marginTop: "10px",
    marginLeft: "10px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  📊 Download Excel
</button>
 <button
    onClick={sendEmail}
    style={{
        marginTop: "10px",
        marginLeft: "10px",
        background: "#28a745",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "6px",
        cursor: "pointer",
    }}
>
    📧 Send Email
</button>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Report..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "280px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <h2>
          {isEditing ? "✏️ Update Report" : "➕ Add Report"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "15px",
            marginTop: "20px",
          }}
        >          <input
            type="text"
            placeholder="Report Name"
            value={newReport.reportName}
            onChange={(e) =>
              setNewReport({
                ...newReport,
                reportName: e.target.value,
              })
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={newReport.reportType}
            onChange={(e) =>
              setNewReport({
                ...newReport,
                reportType: e.target.value,
              })
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <option>Fire Report</option>
            <option>Sensor Report</option>
            <option>Alert Report</option>
            <option>Incident Report</option>
          </select>

          <input
            type="date"
            value={newReport.generatedDate}
            onChange={(e) =>
              setNewReport({
                ...newReport,
                generatedDate: e.target.value,
              })
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={newReport.status}
            onChange={(e) =>
              setNewReport({
                ...newReport,
                status: e.target.value,
              })
            }
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <option>Generated</option>
            <option>Pending</option>
            <option>Archived</option>
          </select>
        </div>

        <button
          onClick={isEditing ? handleUpdate : handleAdd}
          style={{
            marginTop: "20px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "💾 Update Report" : "➕ Add Report"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,.15)",
        }}
      >
        <thead>
          <tr style={{ background: "#c62828", color: "white" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Report Name</th>
            <th style={thStyle}>Report Type</th>
            <th style={thStyle}>Generated Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
                    {filteredReports.map((report) => (
            <tr key={report.id}>
              <td style={tdStyle}>{report.id}</td>

              <td style={tdStyle}>{report.reportName}</td>

              <td style={tdStyle}>{report.reportType}</td>

              <td style={tdStyle}>{report.generatedDate}</td>

              <td
                style={{
                  ...tdStyle,
                  fontWeight: "bold",
                  color:
                    report.status === "Archived"
                      ? "#d32f2f"
                      : report.status === "Pending"
                      ? "#f57c00"
                      : "#2e7d32",
                }}
              >
                {report.status}
              </td>

              <td style={tdStyle}>
                <button
                  onClick={() => handleEdit(report)}
                  style={{
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => handleDelete(report.id)}
                  style={{
                    background: "#d32f2f",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const thStyle = {
  padding: "14px",
  textAlign: "center",
};

const tdStyle = {
  padding: "14px",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};