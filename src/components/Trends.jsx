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
  LineChart,
  Line,
} from 'recharts';

const Trends = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('san_diego');
  const [token, setToken] = useState('');
  const [cityData, setCityData] = useState([]);

  const fetchAllScenarios = async (token) => {
    if (!token) return;
    try {
      const locations = ['san_diego', 'jacksonville', 'san_antonio', 'cleveland'];
      const allResults = await Promise.all(
        locations.map(async (location) => {
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
          console.log("Fetched scenarios for", location, items);
          return { location, items };
        })
      );

      const summarized = allResults.map(({ location, items }) => {
        const valid = items.filter(
          (item) =>
            !isNaN(parseFloat(item.monthly_cash_flow)) &&
            !isNaN(parseFloat(item.roi))
        );
        const avg = (arr, key) =>
          arr.reduce((sum, item) => sum + parseFloat(item[key]), 0) / arr.length || 0;

        return {
          location: location.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          avgCashFlow: parseFloat(avg(valid, 'monthly_cash_flow').toFixed(2)),
          avgROI: parseFloat((avg(valid, 'roi') * 100).toFixed(2)),
          avgBreakEven: parseFloat(
            (valid.reduce((sum, item) => sum + parseFloat(item.break_even_months || 0), 0) /
              valid.length /
              12).toFixed(2)
          ),
        };
      });

      console.log("🔍 Summarized trend data (all cities):", summarized);
      setData(summarized);
    } catch (err) {
      console.error('Failed to load trends:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCityData = async (location) => {
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
      console.log("Fetched city data:", items);

      const groupedByMonth = {};
      items.forEach((item) => {
        // Flat structure: check for timestamp and direct keys
        if (item.timestamp && item.monthly_cash_flow != null && item.roi != null) {
          const month = item.timestamp.slice(0, 7);
          if (!groupedByMonth[month]) groupedByMonth[month] = [];
          groupedByMonth[month].push(item);
        }
      });

      const chartData = Object.entries(groupedByMonth).map(([month, group]) => {
        const avg = (arr, key) =>
          arr.reduce((sum, item) => sum + parseFloat(item[key] || 0), 0) / arr.length || 0;
        return {
          month,
          avgCashFlow: parseFloat(avg(group, 'monthly_cash_flow').toFixed(2)),
          avgROI: parseFloat((avg(group, 'roi') * 100).toFixed(2)),
        };
      });

      console.log("📈 Final city chart data:", chartData);
      setCityData(chartData.sort((a, b) => a.month.localeCompare(b.month)));
      if (chartData.length === 0) {
        console.warn("⚠️ No city chart data found for", location);
      }
    } catch (err) {
      console.error(`Error loading trend for ${location}:`, err);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const token = user.signInUserSession.idToken.jwtToken;
        setToken(token);
        fetchAllScenarios(token);
        fetchCityData(selectedLocation);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) fetchCityData(selectedLocation);
  }, [selectedLocation, token]);

  if (loading) return <p className="text-white">Loading trends...</p>;

  if (!loading && data.length === 0) {
    return (
      <div className="text-white text-center mt-8">
        <p>No trend data available yet. Try saving more scenarios across different cities.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white text-center">📊 Market Trends</h2>
      <p className="text-center text-[#94A3B8] max-w-xl mx-auto">
        View average performance metrics by city based on your saved scenarios.
        <br />Sign in and save data to start tracking trends.
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

      <div className="text-white flex items-center justify-center gap-4 mb-6">
        <label htmlFor="location-select" className="text-lg">Select City:</label>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="bg-[#1C1F26] border border-[#2D2F36] rounded px-3 py-2 text-white"
        >
          <option value="san_diego">San Diego</option>
          <option value="jacksonville">Jacksonville</option>
          <option value="san_antonio">San Antonio</option>
          <option value="cleveland">Cleveland</option>
        </select>
      </div>

      <div className="bg-[#1C1F26] rounded-xl p-6 shadow border border-[#2D2F36]">
        <h3 className="text-xl font-semibold text-white mb-4">
          Monthly Trend – {selectedLocation.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgCashFlow" stroke="#0ea5e9" name="Avg Cash Flow" />
            <Line type="monotone" dataKey="avgROI" stroke="#38bdf8" name="Avg ROI (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Trends;