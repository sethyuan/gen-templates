export function capitalize(s) {
  if (!s) return s;
  return s[0].toUpperCase() + s.substring(1);
}
