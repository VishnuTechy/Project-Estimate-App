import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailsPage = ({ data, updateData }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const rowData = data.find((row) => row.id === parseInt(id));
  const [subsections, setSubsections] = useState(rowData?.subsections || []);

  // Handle Editing Subsection
  const handleEditSubsection = (index, key, value) => {
    const updatedSubsections = [...subsections];
    updatedSubsections[index][key] = key === "name" ? value : Number(value); // Ensure numbers for estimate/actual
    setSubsections(updatedSubsections);
  };

  // Handle Adding New Subsection with Auto-Incremented ID
  const handleAddSubsection = () => {
    const lastId = subsections.length > 0 ? subsections[subsections.length - 1].id : 0;
    const newSubsection = {
      id: lastId + 1, // Auto-increment ID
      name: "New Subsection",
      estimate: 0,
      actual: 0,
    };
    setSubsections([...subsections, newSubsection]);
  };

  // Handle Removing a Subsection
  const handleRemoveSubsection = (subId) => {
    setSubsections(subsections.filter((sub) => sub.id !== subId));
  };

  // Save Data and Navigate Back
  const handleBackClick = () => {
    updateData(parseInt(id), subsections); // Ensure ID is a number
    navigate("/");
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-400 mb-6">
          Subsections for {rowData?.name}
        </h2>
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-md">
          <table className="min-w-full">
            <thead className="bg-gray-900">
              <tr className="bg-gray-900">
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">Estimate</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">Actual</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">Variance</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-blue-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subsections.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-purple-900/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm text-white">{sub.id}</td>
                  <td className="px-6 py-4 text-sm text-white">
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleEditSubsection(index, "name", e.target.value)}
                      className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    <input
                      type="number"
                      value={sub.estimate}
                      onChange={(e) => handleEditSubsection(index, "estimate", e.target.value)}
                      className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    <input
                      type="number"
                      value={sub.actual}
                      onChange={(e) => handleEditSubsection(index, "actual", e.target.value)}
                      className="px-2 py-1 bg-gray-800 text-white border border-gray-600 rounded"
                    />
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      sub.estimate - sub.actual  < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${sub.estimate - sub.actual}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleRemoveSubsection(sub.id)}
                      className="text-white hover:text-red-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="font-semibold">
                <td className="px-6 py-4 text-sm text-white" colSpan={2}>Total</td>
                <td className="px-6 py-4 text-sm text-white">
                  ${subsections.reduce((acc, sub) => acc + sub.estimate, 0)}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  ${subsections.reduce((acc, sub) => acc + sub.actual, 0)}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  ${subsections.reduce((acc, sub) => acc + ( sub.estimate -sub.actual ), 0)}
                </td>
                <td className="px-6 py-4 text-sm"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 space-x-4">
          <button
            onClick={handleAddSubsection}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            + Add Subsection
          </button>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Save & Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
