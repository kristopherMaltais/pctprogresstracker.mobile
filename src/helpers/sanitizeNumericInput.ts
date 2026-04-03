/**
 * Sanitizes a numeric text input with optional decimal places.
 * - Strips leading zeros (e.g. "05" → "5"), but keeps "0" and "0.x"
 * - Returns "0" when the input is empty
 * - Returns null when the input is invalid (caller should reject the change)
 */
export const sanitizeNumericInput = (text: string, decimals: number): string | null => {
  const sanitized = /^0\d/.test(text) ? text.replace(/^0+/, "") || "0" : text;

  if (sanitized === "") return "0";

  const pattern = decimals > 0 ? new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`) : /^\d*$/;
  if (!pattern.test(sanitized)) return null;

  return sanitized;
};
