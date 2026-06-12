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