import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import CalculatorForm from './CalculatorForm';
import ResultCard from './ResultCard';
import ScenarioTable from './ScenarioTable';

const Dashboard = ({ user }) => {
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
    location: 'san_diego',
    zip_code: '92071',
    zillow_link: 'https://www.zillow.com/',
    rehab_rating: '',
    crime_rating: '',
    population_growth: '',
    contacted: 'no',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [location, setLocation] = useState('san_diego');

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
          Authorization: token,
        },
      }
    );

    const items = await res.json();
    console.log('📦 Raw scenario items:', items);

        const cleaned = items.map((item) => {
  const scenarioId = item.scenarioId;
  const inputs = item.inputs || {};
  const outputs = item.outputs || {};

  return {
    // Display
    id: scenarioId?.slice(0, 8),
    fullId: scenarioId,
    dateAdded: item.timestamp
      ? new Date(item.timestamp).toLocaleDateString()
      : '—',

    // Financial metrics
    cashFlow: parseFloat(outputs.monthly_cash_flow ?? item.monthly_cash_flow),
    roi: parseFloat(outputs.roi ?? item.roi) * 100,
    breakEven: outputs.break_even_months
          ? parseFloat(outputs.break_even_months) / 12
          : null,

    // Required Inputs (core)
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

    // Monitoring Extras
    asking_price: parseFloat(item.asking_price),
    rehab_rating: item.rehab_rating ?? '',
    crime_rating: item.crime_rating ?? '',
    population_growth: item.population_growth ?? '',
    contacted: item.contacted ?? 'no',
    notes: item.notes ?? ''
  };
});

    console.log('✅ Cleaned scenarios:', cleaned);
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
    <>
      <CalculatorForm
        form={form}
        setForm={setForm}
        setResult={setResult}
        loading={loading}
        setLoading={setLoading}
      />
      {result && <ResultCard result={result} form={form} />}
      <ScenarioTable
        scenarios={scenarios}
        setScenarios={setScenarios}
        location={location}
        setLocation={setLocation}
      />
    </>
  );
};

export default Dashboard;
