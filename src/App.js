import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';

Amplify.configure(awsconfig);

function App() {
  const [form, setForm] = useState({
    purchase_price: '250000',
    down_payment: '50000',
    loan_term_years: '30',
    interest_rate: '0.06',
    property_tax: '3000',
    insurance: '1200',
    monthly_rent: '2000',
    hoa: '100',
    vacancy_rate: '0.08',
    repairs: '100',
    location: 'san_diego'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [location, setLocation] = useState('san_diego');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      const session = await Auth.currentSession();
      const token = session.getIdToken().getJwtToken();

      const response = await fetch('https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
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
        }),
      });

      if (response.ok) {
        alert("✅ Scenario saved!");
      } else {
        const err = await response.text();
        console.error("Server error:", err);
        alert("❌ Save failed.");
      }
    } catch (error) {
      console.error('Save error:', error);
      alert("❌ Save failed.");
    }
  };

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;

        const res = await fetch(`https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/scenarios?location=${location}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });

        const items = await res.json(); // ✅ Fix: no need to parse .body
        console.log("Scenarios:", items);

        const cleaned = items.map(item => ({
          id: item.scenarioId?.slice(0, 8),
          cashFlow: item.outputs?.monthly_cash_flow,
          roi: item.outputs?.roi * 100,
          breakEven: item.outputs?.break_even_months
        }));
        setScenarios(cleaned);
      } catch (err) {
        console.error("Error loading scenarios:", err);
        setScenarios([]);
      }
    };

    fetchScenarios();
  }, [location]);

  return (
    <Authenticator signUpAttributes={['nickname']}>
      {({ signOut, user }) => (
        <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={signOut}>Sign Out</button>
            <h2>Welcome, {user?.attributes?.nickname || user?.username}</h2>
          </div>

          <h2>Rental Property Cash Flow Calculator</h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(form).map((field) =>
              field === 'location' ? (
                <div key={field} style={{ marginBottom: '1rem' }}>
                  <label>
                    Location:
                    <select name="location" value={form.location} onChange={handleChange} style={{ marginLeft: 10 }}>
                      <option value="cleveland">Cleveland</option>
                      <option value="jacksonville">Jacksonville</option>
                      <option value="san_antonio">San Antonio</option>
                      <option value="san_diego">San Diego</option>
                    </select>
                  </label>
                </div>
              ) : (
                <div key={field} style={{ marginBottom: '1rem' }}>
                  <label>
                    {field.replace(/_/g, ' ')}:
                    <input
                      type="number"
                      step="any"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      style={{ marginLeft: 10, width: 150 }}
                      required={['hoa', 'vacancy_rate', 'repairs'].indexOf(field) === -1}
                    />
                  </label>
                </div>
              )
            )}
            <button type="submit" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate'}
            </button>
            {result && (
              <button type="button" onClick={handleSave} style={{ marginLeft: 10 }}>
                Save Scenario
              </button>
            )}
          </form>

          {result && (
            <div style={{ marginTop: '2rem' }}>
              <h3>Results:</h3>
              <p><strong>Monthly Cash Flow:</strong> ${result.monthly_cash_flow}</p>
              <p><strong>ROI:</strong> {(result.roi * 100).toFixed(2)}%</p>
              <p><strong>Break-Even Time:</strong> {result.break_even_months} months</p>
            </div>
          )}

          <div style={{ marginTop: '3rem' }}>
            <h3>Saved Scenarios for: {location}</h3>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="cleveland">Cleveland</option>
              <option value="jacksonville">Jacksonville</option>
              <option value="san_antonio">San Antonio</option>
              <option value="san_diego">San Diego</option>
            </select>

            <table style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Scenario ID</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Monthly Cash Flow</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>ROI (%)</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Break-Even (Months)</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.id}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.id}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>${s.cashFlow?.toFixed(2)}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{s.roi?.toFixed(2)}%</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {s.breakEven !== null && s.breakEven !== undefined ? s.breakEven : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;