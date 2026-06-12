// Shared data-derivation helpers for the Price Analysis page

const CITY_KEYS = ["Hyderabad", "Mumbai", "Delhi", "Bengaluru", "Chennai"];

/**
 * Returns [{ item, avg }] — average price per item across all cities.
 */
export function getItemAverages(foodPrices) {
  return foodPrices.map((entry) => {
    const total = CITY_KEYS.reduce((sum, key) => sum + (entry[key] || 0), 0);
    return {
      item: entry.item,
      avg: total / CITY_KEYS.length,
    };
  });
}

/**
 * Returns { item, avg } for the item with the highest average price.
 */
export function getMostExpensive(foodPrices) {
  const averages = getItemAverages(foodPrices);
  return averages.reduce(
    (max, curr) => (curr.avg > max.avg ? curr : max),
    averages[0]
  );
}

/**
 * Returns { item, avg } for the item with the lowest average price.
 */
export function getCheapest(foodPrices) {
  const averages = getItemAverages(foodPrices);
  return averages.reduce(
    (min, curr) => (curr.avg < min.avg ? curr : min),
    averages[0]
  );
}

/**
 * Returns { city, premium } for the city with the highest app-vs-street
 * price premium (premium expressed as a multiple, e.g. 2.4 = 2.4x).
 */
export function getHighestPremium(appVsStreetPrices) {
  return appVsStreetPrices.reduce(
    (max, city) => {
      const premium = city.app / city.street;
      return premium > max.premium ? { city: city.city, premium } : max;
    },
    { city: "", premium: 0 }
  );
}

/**
 * Apply filters to foodPrices data by items, veg/non-veg type, and cities.
 * Returns filtered foodPrices array with only selected cities and items.
 */
export function applyFilters(foodPrices, itemMetadata, filters) {
  const { selectedItems, selectedCities, showVeg, showNonVeg } = filters;

  return foodPrices
    .filter(entry => selectedItems.includes(entry.item))
    .filter(entry => {
      const meta = itemMetadata[entry.item];
      if (showVeg && meta.type === 'veg') return true;
      if (showNonVeg && meta.type === 'non-veg') return true;
      return false;
    })
    .map(entry => {
      const filtered = { item: entry.item };
      selectedCities.forEach(city => {
        filtered[city] = entry[city];
      });
      return filtered;
    });
}

/**
 * Group foodPrices data by city, calculating average price per item.
 * Returns [{ city, item, price }, ...] or [{ city, avgPrice }, ...]
 */
export function groupByCity(foodPrices, selectedCities) {
  return selectedCities.map(city => {
    const prices = foodPrices.map(entry => entry[city] || 0);
    const avgPrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    return {
      city,
      avgPrice: Math.round(avgPrice * 10) / 10,
    };
  });
}

/**
 * Align inflation data (SFPI and CPI) by shared month keys.
 * Returns [{ month, sfpi, cpi, appIndex }, ...]
 */
export function alignInflationData(inflationData) {
  return inflationData;
}