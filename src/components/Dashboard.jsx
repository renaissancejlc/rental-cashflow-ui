import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import ResultCard from './ResultCard';
import ScenarioTable from './ScenarioTable';
import { toast } from 'sonner';

const Dashboard = ({ user }) => {
  const [form, setForm] = useState({
    purchase_price: '250000',
    down_payment: '50000',
    loan_term_years: '30',
    interest_rate: '0.06',
    property_tax: '0.012',
    insurance: '1200',
    monthly_rent: '2000',
    hoa: '100',
    vacancy_rate: '0.08',
    repairs: '100',
    location: 'san_diego',
    zip_code: '92071',
    zillow_link: 'https://www.zillow.com/',
    rehab_rating: '',
    crime_rating: '',
    population_growth: '',
    contacted: 'no',
    notes: ''
  });

  const [userInput, setUserInput] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [location, setLocation] = useState('san_diego');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };

    const price = parseFloat(name === 'purchase_price' ? value : form.purchase_price) || 0;
    const location = name === 'location' ? value : form.location;

    if (name === 'purchase_price' || name === 'location') {
      const taxRates = {
        san_diego: 0.01,
        jacksonville: 0.0077,
        san_antonio: 0.027,
        cleveland: 0.025
      };

      updatedForm.down_payment = (price * 0.2).toFixed(0);
      updatedForm.closing_costs = (price * 0.03).toFixed(0);
      updatedForm.property_tax = (price * (taxRates[location] || 0.01)).toFixed(0);
    }

    setForm(updatedForm);
    setUserInput({ ...userInput, [name]: true });
  };

  const inputClass = (field) =>
    `w-full p-2 bg-[#1C1F26] border border-[#2D2F36] rounded-lg ${
      userInput[field] ? 'text-white' : 'text-gray-400'
    }`;

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('❌ Calculation failed:', err);
      toast.error('Error calculating scenario.');
    }
    setLoading(false);
  };

  const fetchScenarios = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.idToken.jwtToken;

      const res = await fetch(
        `https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/scenarios?location=${location}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );

      const items = await res.json();
      const cleaned = items.map((item) => {
        const scenarioId = item.scenarioId;
        const inputs = item.inputs || {};
        const outputs = item.outputs || {};

        return {
          id: scenarioId?.slice(0, 8),
          fullId: scenarioId,
          dateAdded: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : '—',
          cashFlow: parseFloat(outputs.monthly_cash_flow ?? item.monthly_cash_flow),
          roi: parseFloat(outputs.roi ?? item.roi) * 100,
          breakEven: outputs.break_even_months ? parseFloat(outputs.break_even_months) / 12 : null,
          purchase_price: parseFloat(inputs.purchase_price ?? item.purchase_price),
          down_payment: parseFloat(inputs.down_payment ?? item.down_payment),
          loan_term_years: parseInt(inputs.loan_term_years ?? item.loan_term_years),
          interest_rate: parseFloat(inputs.interest_rate ?? item.interest_rate),
          property_tax: parseFloat(inputs.property_tax ?? item.property_tax),
          insurance: parseFloat(inputs.insurance ?? item.insurance),
          monthly_rent: parseFloat(inputs.monthly_rent ?? item.monthly_rent),
          hoa: parseFloat(inputs.hoa ?? item.hoa),
          vacancy_rate: parseFloat(inputs.vacancy_rate ?? item.vacancy_rate),
          repairs: parseFloat(inputs.repairs ?? item.repairs),
          asking_price: parseFloat(item.asking_price),
          rehab_rating: item.rehab_rating ?? '',
          crime_rating: item.crime_rating ?? '',
          population_growth: item.population_growth ?? '',
          contacted: item.contacted ?? 'no',
          notes: item.notes ?? ''
        };
      });

      setScenarios(cleaned);
    } catch (err) {
      console.error('❌ Error loading scenarios:', err);
      setScenarios([]);
    }
  };

  useEffect(() => {
    fetchScenarios();
  }, [location]);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">📈 Monitor & Evaluate</h1>
        <p className="text-[#94A3B8] max-w-xl mx-auto">
          Input your financial details, evaluate cash flow and ROI, and compare property performance across cities.
        </p>
      </div>

      <div className="bg-[#1C1F26] border border-[#2D2F36] rounded-xl p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Location', 'location', 'select', ['cleveland', 'jacksonville', 'san_antonio', 'san_diego']],
            ['Zillow Link', 'zillow_link'],
            ['Zip Code', 'zip_code'],
            ['Purchase Price', 'purchase_price', 'number'],
            ['Down Payment', 'down_payment', 'number'],
            ['Closing Costs', 'closing_costs', 'number'],
            ['Loan Term (Years)', 'loan_term_years', 'number'],
            ['Interest Rate (as decimal, e.g. 0.06 for 6%)', 'interest_rate', 'number'],
            ['Property Tax (annual $ amount)', 'property_tax', 'number'],
            ['Insurance', 'insurance', 'number'],
            ['Monthly Rent', 'monthly_rent', 'number'],
            ['HOA', 'hoa', 'number'],
            ['Vacancy Rate', 'vacancy_rate', 'number'],
            ['Repairs', 'repairs', 'number'],
            ['Rehab Rating', 'rehab_rating', 'select', ['', 'A', 'B', 'C', 'D', 'F']],
            ['Crime Rating', 'crime_rating', 'select', ['', 'A', 'B', 'C', 'D', 'F']],
            ['Population Growth %', 'population_growth', 'number'],
            ['Contacted', 'contacted', 'select', ['no', 'yes']]
          ].map(([label, name, type = 'text', options]) => (
            <div key={name}>
              <label className="block text-sm text-[#94A3B8] mb-1">{label}</label>
              {type === 'select' ? (
                <select
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputClass(name)}
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1).replace('_', ' ')}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className={inputClass(name)}
                />
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm text-[#94A3B8] mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className={inputClass('notes')}
              placeholder="Additional observations or reminders about this property..."
            />
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl"
        >
          {loading ? 'Calculating...' : 'Calculate'}
        </button>
      </div>

      {result && (
  <div className="bg-[#1C1F26] border border-[#2D2F36] rounded-xl p-6 shadow-md">
    <ResultCard result={result} form={form} setScenarios={setScenarios} />
  </div>
)}

      <div className="bg-[#1C1F26] border border-[#2D2F36] rounded-xl p-6 shadow-md">
        <ScenarioTable
          scenarios={scenarios}
          setScenarios={setScenarios}
          location={location}
          setLocation={setLocation}
        />
      </div>
    </div>
  );
};

export default Dashboard;