export const formatCurrency = value => {
  if (!value) return '';
  const num = parseInt(value.toString(), 10);
  return `₦${num.toLocaleString()}`;
};
