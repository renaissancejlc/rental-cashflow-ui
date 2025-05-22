// ScenarioTable.jsx
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ScenarioTable = ({ scenarios, location, setLocation, setScenarios }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [editingScenario, setEditingScenario] = useState(null);

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
      toast.error('Failed to delete entry.');
    }
  };

  const handleChange = (field, value) => {
    setEditingScenario((prev) => ({ ...prev, [field]: value }));
  };

const handleSave = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    const {
      fullId,
      notes,
      contacted,
      asking_price,
      zip_code,
      rehab_rating,
      crime_rating,
      population_growth,
      zillow_link,
      purchase_price,
      down_payment,
      loan_term_years,
      interest_rate,
      property_tax,
      insurance,
      monthly_rent,
      hoa,
      vacancy_rate,
      repairs,
    } = editingScenario;

    const res = await fetch(
      `https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/updateScenario?scenarioId=${fullId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          inputs: {
            purchase_price,
            down_payment,
            loan_term_years,
            interest_rate,
            property_tax,
            insurance,
            monthly_rent,
            hoa,
            vacancy_rate,
            repairs,
          },
          notes,
          contacted,
          asking_price,
          zip_code,
          rehab_rating,
          crime_rating,
          population_growth,
          zillow_link,
        }),
      }
    );

    if (!res.ok) throw new Error('Failed to update');

    // ⬇️ Recalculate outputs
    const loanAmount = purchase_price - down_payment;
    const monthlyRate = interest_rate / 12;
    const numPayments = loan_term_years * 12;
    const monthlyMortgage =
      monthlyRate === 0
        ? loanAmount / numPayments
        : loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyExpenses =
      monthlyMortgage +
      insurance / 12 +
      property_tax / 12 +
      hoa +
      repairs +
      (monthly_rent * vacancy_rate);

    const monthlyCashFlow = monthly_rent - monthlyExpenses;
    const annualCashFlow = monthlyCashFlow * 12;
    const roi = annualCashFlow / down_payment;
    const breakEvenMonths = down_payment / monthlyCashFlow;

    // ⬇️ Update state with outputs included
    setScenarios((prev) =>
      prev.map((scenario) =>
        scenario.fullId === fullId
          ? {
              ...scenario,
              purchase_price,
              down_payment,
              loan_term_years,
              interest_rate,
              property_tax,
              insurance,
              monthly_rent,
              hoa,
              vacancy_rate,
              repairs,
              asking_price: parseFloat(asking_price),
              zip_code,
              rehab_rating,
              crime_rating,
              population_growth,
              zillow_link,
              notes,
              contacted,
              cashFlow: parseFloat(monthlyCashFlow.toFixed(2)),
              roi: parseFloat((roi * 100).toFixed(2)),
              breakEven: parseFloat((breakEvenMonths / 12).toFixed(2)),
            }
          : scenario
      )
    );

    toast.success('Scenario updated successfully.');
    setActiveScenario(null);
  } catch (err) {
    console.error('Update failed:', err);
    toast.error('Failed to update scenario.');
  }
};

  const renderInputRow = (label, field, type = 'text') => (
    <div className="flex justify-between text-sm py-1 border-b border-[#2D2F36]">
      <span className="text-[#94A3B8]">{label}</span>
      <input
        type={type}
        value={editingScenario?.[field] ?? ''}
        onChange={(e) => handleChange(field, e.target.value)}
        className="bg-[#1C1F26] text-white border border-[#2D2F36] rounded px-2 py-1 text-right w-1/2"
      />
    </div>
  );

  return (
    <div className="mt-10">
<h3 className="text-xl font-semibold mb-2">
  Saved Scenarios for: {location.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
</h3>      <select
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
              onClick={() => {
                setActiveScenario(s);
                setEditingScenario(s);
              }}
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
              {renderInputRow('Purchase Price', 'purchase_price', 'number')}
              {renderInputRow('Down Payment', 'down_payment', 'number')}
              {renderInputRow('Loan Term (Years)', 'loan_term_years', 'number')}
              {renderInputRow('Interest Rate', 'interest_rate', 'number')}
              {renderInputRow('Property Tax', 'property_tax', 'number')}
              {renderInputRow('Insurance', 'insurance', 'number')}
              {renderInputRow('Monthly Rent', 'monthly_rent', 'number')}
              {renderInputRow('HOA', 'hoa', 'number')}
              {renderInputRow('Vacancy Rate', 'vacancy_rate', 'number')}
              {renderInputRow('Repairs', 'repairs', 'number')}
              {renderInputRow('Asking Price', 'asking_price', 'number')}
              {renderInputRow('Rehab Rating', 'rehab_rating')}
              {renderInputRow('Crime Rating', 'crime_rating')}
              {renderInputRow('Population Growth', 'population_growth', 'number')}
              {renderInputRow('Contacted', 'contacted')}
              {renderInputRow('Notes', 'notes')}
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioTable;
