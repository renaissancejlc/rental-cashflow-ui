import React from 'react';
import { Auth } from 'aws-amplify';

const ScenarioTable = ({ scenarios, location, setLocation, setScenarios }) => {
  const handleDelete = async (fullId) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

      const res = await fetch(
        `https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/scenarios?scenarioId=${fullId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: token
          }
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${text}`);
      }

      setScenarios((prev) => prev.filter((s) => s.fullId !== fullId));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('❌ Failed to delete entry.');
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-2">Saved Scenarios for: {location}</h3>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="mb-4 p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
      >
        <option value="cleveland">Cleveland</option>
        <option value="jacksonville">Jacksonville</option>
        <option value="san_antonio">San Antonio</option>
        <option value="san_diego">San Diego</option>
      </select>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1C1F26] text-left">
            <th className="p-3 border-b border-[#2D2F36]">Scenario ID</th>
            <th className="p-3 border-b border-[#2D2F36]">Monthly Cash Flow</th>
            <th className="p-3 border-b border-[#2D2F36]">ROI (%)</th>
            <th className="p-3 border-b border-[#2D2F36]">Break-Even (Years)</th>
            <th className="p-3 border-b border-[#2D2F36]">Date Added</th>
            <th className="p-3 border-b border-[#2D2F36]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((s) => (
            <tr key={s.id} className="hover:bg-[#1E1E26]">
              <td className="p-3 border-b border-[#2D2F36]">{s.id}</td>
              <td className="p-3 border-b border-[#2D2F36]">
                {s.cashFlow != null ? `$${s.cashFlow.toFixed(2)}` : '—'}
              </td>
              <td className="p-3 border-b border-[#2D2F36]">
                {s.roi != null ? `${s.roi.toFixed(2)}%` : '—'}
              </td>
              <td className="p-3 border-b border-[#2D2F36]">
                {s.breakEven != null ? s.breakEven.toFixed(1) : '—'}
              </td>
              <td className="p-3 border-b border-[#2D2F36]">{s.dateAdded}</td>
              <td className="p-3 border-b border-[#2D2F36]">
                <button
                  onClick={() => {
                        console.log("🧨 Deleting scenario:", s.fullId);
                        handleDelete(s.fullId)}}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScenarioTable;