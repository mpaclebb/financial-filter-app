import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [incomeData, setIncomeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    dateRange: [2020, 2024], // Default filter for date range
    revenue: [0, Infinity], // Default filter for revenue range
    netIncome: [0, Infinity], // Default filter for net income range
  });
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });

  const API_KEY = "VKJJxD6xhFjEbAi1sttsUgQbrWZNbxr6";
  const API_URL =
    "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=VKJJxD6xhFjEbAi1sttsUgQbrWZNbxr6";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data); // Log the API response
        const financialData = response.data; //the data is in `response.data`
        setIncomeData(financialData);
        setFilteredData(financialData); // set filteredData to all fetched data
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching financial data.");
        setLoading(false);
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setFilter((prev) => {
      const newFilter = { ...prev, [filterKey]: value };
      filterData(newFilter);
      return newFilter;
    });
  };

  // Filter data based on filter state
  const filterData = (newFilter) => {
    const { dateRange, revenue, netIncome } = newFilter;
    const filtered = incomeData.filter((data) => {
      const date = parseInt(data.date);
      const revenueInRange =
        data.revenue >= revenue[0] && data.revenue <= revenue[1];
      const netIncomeInRange =
        data.netIncome >= netIncome[0] && data.netIncome <= netIncome[1];
      const dateInRange = date >= dateRange[0] && date <= dateRange[1];

      return revenueInRange && netIncomeInRange && dateInRange;
    });
    setFilteredData(filtered);
  };

  // Sorting function
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = key === "date" ? parseInt(a.date) : parseFloat(a[key]);
      const bValue = key === "date" ? parseInt(b.date) : parseFloat(b[key]);

      if (aValue < bValue) {
        return direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Financial Data for Apple (AAPL)
      </h1>

      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Filter Inputs */}
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Filters
            </h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    type="number"
                    value={filter.dateRange[0]}
                    onChange={(e) =>
                      handleFilterChange("dateRange", [
                        parseInt(e.target.value),
                        filter.dateRange[1],
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="number"
                    value={filter.dateRange[1]}
                    onChange={(e) =>
                      handleFilterChange("dateRange", [
                        filter.dateRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Min Revenue
                  </label>
                  <input
                    type="number"
                    value={filter.revenue[0]}
                    onChange={(e) =>
                      handleFilterChange("revenue", [
                        parseInt(e.target.value),
                        filter.revenue[1],
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Max Revenue
                  </label>
                  <input
                    type="number"
                    value={filter.revenue[1]}
                    onChange={(e) =>
                      handleFilterChange("revenue", [
                        filter.revenue[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Min Net Income
                  </label>
                  <input
                    type="number"
                    value={filter.netIncome[0]}
                    onChange={(e) =>
                      handleFilterChange("netIncome", [
                        parseInt(e.target.value),
                        filter.netIncome[1],
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Max Net Income
                  </label>
                  <input
                    type="number"
                    value={filter.netIncome[1]}
                    onChange={(e) =>
                      handleFilterChange("netIncome", [
                        filter.netIncome[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sorting */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Sort By
            </h2>
            <div className="space-x-4">
              <button
                onClick={() => handleSort("date")}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              >
                Sort by Date
              </button>
              <button
                onClick={() => handleSort("revenue")}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              >
                Sort by Revenue
              </button>
              <button
                onClick={() => handleSort("netIncome")}
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
              >
                Sort by Net Income
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Revenue</th>
                  <th className="p-4 text-left">Net Income</th>
                  <th className="p-4 text-left">Gross Profit</th>
                  <th className="p-4 text-left">EPS</th>
                  <th className="p-4 text-left">Operating Income</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((data, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="p-4">{data.date}</td>
                    <td className="p-4">{data.revenue}</td>
                    <td className="p-4">{data.netIncome}</td>
                    <td className="p-4">{data.grossProfit}</td>
                    <td className="p-4">{data.eps}</td>
                    <td className="p-4">{data.operatingIncome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
