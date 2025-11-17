export const formatNumber = (num) => {
  if (num === null || num === undefined) return "0";

  const n = Number(num);
  if (isNaN(n)) return "0";

  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";

  if (n >= 1_000)
    return (n / 1_000).toFixed(1).replace(".0", "") + "K";

  return n.toString();
};
