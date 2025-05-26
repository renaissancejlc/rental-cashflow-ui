import React from 'react';
import { getPropertyTaxByLocation } from '../utils';

const MonitoringInputs = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    if (name === 'purchase_price') {
      const price = parseFloat(value) || 0;
      updatedForm.down_payment = (price * 0.2).toFixed(0);
      updatedForm.closing_costs = (price * 0.03).toFixed(0);
    }

    setForm(updatedForm);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-[#94A3B8] mb-1">Location</label>
        <select
          name="location"
          value={form.location}
          onChange={(e) => {
            const value = e.target.value;
            const updatedForm = {
              ...form,
              location: value,
              property_tax: getPropertyTaxByLocation(value, form.purchase_price)
            };
            setForm(updatedForm);
          }}
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
        <label className="block text-sm text-[#94A3B8] mb-1">Closing Costs ($)</label>
        <input
          type="number"
          name="closing_costs"
          value={form.closing_costs || ''}
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

      <div className="md:col-span-2">
        <label className="block text-sm text-[#94A3B8] mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes || ''}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg text-white"
          placeholder="Additional observations or reminders about this property..."
        />
      </div>
    </div>
  );
};

export default MonitoringInputs;