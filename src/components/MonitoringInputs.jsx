import React from 'react';

const MonitoringInputs = ({ form, setForm }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    const taxRates = {
      san_diego: 0.01,
      jacksonville: 0.0098,
      san_antonio: 0.023,
      cleveland: 0.025
    };

    setForm({
      ...form,
      location: newLocation,
      property_tax: (parseFloat(form.purchase_price || 250000) * taxRates[newLocation]).toFixed(0)
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Location</label>
        <select
          name="location"
          value={form.location}
          onChange={handleLocationChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        >
          <option value="cleveland">Cleveland</option>
          <option value="jacksonville">Jacksonville</option>
          <option value="san_antonio">San Antonio</option>
          <option value="san_diego">San Diego</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Zillow Link</label>
        <input
          type="text"
          name="zillow_link"
          placeholder="https://www.zillow.com/"
          value={form.zillow_link || 'https://www.zillow.com/'}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Asking Price</label>
        <input
          type="number"
          step="any"
          name="purchase_price"
          value={form.purchase_price}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Zip Code</label>
        <input
          type="text"
          name="zip_code"
          value={form.zip_code || '92071'}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Monthly Projected Rent</label>
        <input
          type="number"
          step="any"
          name="monthly_rent"
          value={form.monthly_rent}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Annual Property Tax (%)</label>
        <input
          type="number"
          step="0.01"
          name="property_tax"
          value={form.property_tax}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Down Payment (%)</label>
        <input
          type="number"
          step="any"
          name="down_payment"
          value={form.down_payment}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">HOA ($)</label>
        <input
          type="number"
          name="hoa"
          value={form.hoa || 0}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Loan Term (Years)</label>
        <input
          type="number"
          name="loan_term_years"
          value={form.loan_term_years || 30}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Rehab Rating</label>
        <select
          name="rehab_rating"
          value={form.rehab_rating || ''}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        >
          <option value="">Select</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Crime Rating</label>
        <select
          name="crime_rating"
          value={form.crime_rating || ''}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        >
          <option value="">Select</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Population Growth (%)</label>
        <input
          type="number"
          name="population_growth"
          step="any"
          value={form.population_growth || ''}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Contacted?</label>
        <select
          name="contacted"
          value={form.contacted || 'no'}
          onChange={handleChange}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
    </div>
  );
};

export default MonitoringInputs;