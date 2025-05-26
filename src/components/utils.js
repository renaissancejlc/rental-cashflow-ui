// utils.js

/**
 * Calculates estimated property tax based on location and purchase price.
 * @param {string} location - The city or market name.
 * @param {number|string} purchasePrice - The property price.
 * @returns {string} - Estimated yearly property tax as a stringified number.
 */
export const getPropertyTaxByLocation = (location, purchasePrice) => {
  const taxRates = {
    san_diego: 0.01,
    jacksonville: 0.0077,
    san_antonio: 0.027,
    cleveland: 0.025
  };

  const rate = taxRates[location] || 0.01;
  const price = parseFloat(purchasePrice || 250000);

  return (price * rate).toFixed(0);
};
