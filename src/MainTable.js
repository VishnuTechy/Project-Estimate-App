import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({ data, setData }) => {
  const navigate = useNavigate();

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleRowDoubleClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleEdit = (id, name) => {
    if (editId === id) {
      setData(
        data.map((row) => (row.id === id ? { ...row, name: editValue } : row))
      );
      setEditId(null);
    } else {
      setEditId(id);
      setEditValue(name);
    }
  };

  const handleRemove = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleAddRow = () => {
    const lastId = data.length > 0 ? data[data.length - 1].id : 0; // Get the last element ID
    const newRow = {
      id: lastId + 1, // Auto-increment from the last ID
      name: `New Section ${lastId + 1}`,
      estimate: 0,
      actual: 0,
      subsections: [],
    };
    setData([...data, newRow]);
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-purple-400 mb-6">
          Project Budget Table
        </h1>
        <div className="overflow-visible bg-gray-900 rounded-lg shadow-md">
          <table className="min-w-full ">
            <thead className="bg-gray-900">
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Estimate
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Actual
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Variance
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-purple-900/30 transition-colors cursor-pointer"
                  onDoubleClick={() => handleRowDoubleClick(row.id)}
                >
                  <td className="px-6 py-4 text-sm text-white">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-white">
                    {editId === row.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    ${row.estimate}
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    ${row.actual}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      row.estimate - row.actual  < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    ${row.estimate -row.actual }
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(row.id, row.name)}
                      className="text-white hover:text-blue-800 mr-4"
                    >
                      {editId === row.id ? "Save" : "Edit"}
                    </button>
                    <button
                      onClick={() => handleRemove(row.id)}
                      className="text-white hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="px-6 py-4 text-sm text-white" colSpan={2}>
                  Total
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  ${data.reduce((acc, row) => acc + row.estimate, 0)}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  ${data.reduce((acc, row) => acc + row.actual, 0)}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  $
                  {data.reduce(
                    (acc, row) => acc + (row.estimate - row.actual),
                    0
                  )}
                </td>
                <td className="px-6 py-4 text-sm"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddRow}
          className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Section
        </button>
      </div>
    </div>
  );
};

export default Table;
