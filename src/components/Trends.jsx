// src/components/Trends.jsx
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Trends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllScenarios = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;

        const locations = ['san_diego', 'jacksonville', 'san_antonio', 'cleveland'];
        const allResults = await Promise.all(
          locations.map(async (location) => {
            const res = await fetch(
              `https://u0hewg9v3a.execute-api.us-east-2.amazonaws.com/scenarios?location=${location}`,
              {
                headers: {
                  Authorization: token,
                },
              }
            );
            const items = await res.json();
            return { location, items };
          })
        );

        const summarized = allResults.map(({ location, items }) => {
          const valid = items.filter(
            (item) => item.outputs && item.outputs.monthly_cash_flow && item.outputs.roi
          );
          const avg = (arr, key) =>
            arr.reduce((sum, item) => sum + parseFloat(item.outputs[key]), 0) / arr.length || 0;

          return {
            location: location.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            avgCashFlow: parseFloat(avg(valid, 'monthly_cash_flow').toFixed(2)),
            avgROI: parseFloat((avg(valid, 'roi') * 100).toFixed(2)),
            avgBreakEven: parseFloat(
              (valid.reduce((sum, item) => sum + parseFloat(item.outputs.break_even_months || 0), 0) /
                valid.length /
                12).toFixed(2)
            ),
          };
        });

        setData(summarized);
      } catch (err) {
        console.error('Failed to load trends:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllScenarios();
  }, []);

  if (loading) return <p className="text-white">Loading trends...</p>;

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white text-center">📊 Market Trends</h2>
      <p className="text-center text-[#94A3B8] max-w-xl mx-auto">
        These charts show average performance metrics across your saved scenarios by city.
      </p>

      <div className="bg-[#1C1F26] rounded-xl p-6 shadow border border-[#2D2F36]">
        <h3 className="text-xl font-semibold text-white mb-4">Average Monthly Cash Flow</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="location" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgCashFlow" fill="#0ea5e9" name="Avg Cash Flow" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1C1F26] rounded-xl p-6 shadow border border-[#2D2F36]">
        <h3 className="text-xl font-semibold text-white mb-4">Average ROI (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="location" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgROI" fill="#38bdf8" name="Avg ROI %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#1C1F26] rounded-xl p-6 shadow border border-[#2D2F36]">
        <h3 className="text-xl font-semibold text-white mb-4">Average Break-even Time (Years)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="location" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgBreakEven" fill="#94A3B8" name="Avg Break-even Years" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Trends;