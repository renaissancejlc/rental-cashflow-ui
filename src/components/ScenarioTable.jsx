// ScenarioTable.jsx
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Trash2 } from 'lucide-react';

const ScenarioTable = ({ scenarios, location, setLocation, setScenarios }) => {
  const [activeScenario, setActiveScenario] = useState(null);

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

  const renderRow = (label, value) => (
    <div className="flex justify-between text-sm py-1 border-b border-[#2D2F36]">
      <span className="text-[#94A3B8]">{label}</span>
      <span className="text-right max-w-[50%] truncate">{value || '—'}</span>
    </div>
  );

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
            <tr
              key={s.id}
              className="hover:bg-[#1E1E26] cursor-pointer"
              onClick={() => setActiveScenario(s)}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('🧨 Deleting scenario:', s.fullId);
                    handleDelete(s.fullId);
                  }}
                  className="text-red-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {activeScenario && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1C1F26] text-white p-6 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setActiveScenario(null)}
              className="absolute top-3 right-4 text-white text-2xl hover:text-gray-300"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Scenario Details</h2>
            <div className="space-y-2">
              {renderRow('Asking Price', `$${activeScenario.asking_price}`)}
              {renderRow('Down Payment', `$${activeScenario.down_payment}`)}
              {renderRow('Loan Term (Years)', activeScenario.loan_term_years)}
              {renderRow('Interest Rate', `${activeScenario.interest_rate}`)}
              {renderRow('Property Tax', `$${activeScenario.property_tax}`)}
              {renderRow('Insurance', `$${activeScenario.insurance}`)}
              {renderRow('Monthly Rent', `$${activeScenario.monthly_rent}`)}
              {renderRow('HOA', `$${activeScenario.hoa}`)}
              {renderRow('Vacancy Rate', `${(parseFloat(activeScenario.vacancy_rate || 0) * 100).toFixed(1)}%`)}
              {renderRow('Repairs', `$${activeScenario.repairs}`)}
              {renderRow('Rehab Rating', activeScenario.rehab_rating)}
              {renderRow('Crime Rating', activeScenario.crime_rating)}
              {renderRow('Population Growth', `${activeScenario.population_growth}%`)}
              {renderRow('Contacted', activeScenario.contacted)}
              {renderRow('Notes', activeScenario.notes)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioTable;
