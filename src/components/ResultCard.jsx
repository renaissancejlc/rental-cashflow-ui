import React from 'react';
import { Auth } from 'aws-amplify';

const ResultCard = ({ result, form }) => {
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
        alert('✅ Scenario saved!');
      } else {
        alert('❌ Save failed.');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('❌ Save failed.');
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