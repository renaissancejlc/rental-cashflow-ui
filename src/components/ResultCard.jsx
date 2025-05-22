import React from 'react';
import { Auth } from 'aws-amplify';
import { toast } from 'sonner';

const ResultCard = ({ result, form, setScenarios }) => {
  const handleSave = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();
      const response = await fetch('https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          ...form,
          purchase_price: parseFloat(form.purchase_price),
          down_payment: parseFloat(form.down_payment),
          loan_term_years: parseInt(form.loan_term_years),
          interest_rate: parseFloat(form.interest_rate),
          property_tax: parseFloat(form.property_tax),
          insurance: parseFloat(form.insurance),
          monthly_rent: parseFloat(form.monthly_rent),
          hoa: parseFloat(form.hoa || 0),
          vacancy_rate: parseFloat(form.vacancy_rate || 0),
          repairs: parseFloat(form.repairs || 0),
          location: form.location.toLowerCase()
        })
      });

      if (response.ok) {
        const data = await response.json(); // ideally your API returns the saved item
        const fakeId = Math.random().toString(36).slice(2, 10); // generate temporary ID if needed
        const newScenario = {
          id: fakeId,
          fullId: data.scenarioId || fakeId,
          dateAdded: new Date().toLocaleDateString(),
          cashFlow: parseFloat(result.monthly_cash_flow),
          roi: result.roi * 100,
          breakEven: result.break_even_months / 12,
          ...form
        };
        setScenarios((prev) => [...prev, newScenario]);
        toast.success('Scenario saved!');
      } else {
        toast.error('Save failed.');
      }
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Save failed.');
    }
  };

  return (
    <div className="mt-8 bg-[#1C1F26] rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Results:</h3>
      <p><strong>Monthly Cash Flow:</strong> ${result.monthly_cash_flow}</p>
      <p><strong>ROI:</strong> {(result.roi * 100).toFixed(2)}%</p>
      <p><strong>Break-Even Time:</strong> {result.break_even_months} months</p>
      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
      >
        Save Scenario
      </button>
    </div>
  );
};

export default ResultCard;