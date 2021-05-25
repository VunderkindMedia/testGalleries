export const arrayMin = (arr, key) => {
  return arr.reduce(function(p, v) {
    return (p[key] < v[key] ? p[key] : v[key]);
  });
};

export const arrayMax = (arr, key) => {
  return arr.reduce(function(p, v) {
    return (p[key] > v[key] ? p[key] : v[key]);
  });
};
