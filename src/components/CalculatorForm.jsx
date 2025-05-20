import React from 'react';

const CalculatorForm = ({ form, setForm, setResult, loading, setLoading }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Calculation error:', err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">

        {[
          'purchase_price',
          'down_payment',
          'loan_term_years',
          'interest_rate',
          'property_tax',
          'insurance',
          'monthly_rent',
          'hoa',
          'vacancy_rate',
          'repairs'
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 text-sm text-[#94A3B8] capitalize">
              {field.replace(/_/g, ' ')}:
            </label>
            <input
              type="number"
              step="any"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required={['hoa', 'vacancy_rate', 'repairs'].indexOf(field) === -1}
              className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white placeholder:text-[#6B7280]"
            />
          </div>
        ))}
      </div>

      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </div>
    </form>
  );
};

export default CalculatorForm;