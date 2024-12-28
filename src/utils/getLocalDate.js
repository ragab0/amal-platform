/**
 * Returns a date in YYYY-MM-DD format given a date in ISO format.
 * @param {String} date A date in ISO format.
 * @returns {String} A date string in YYYY-MM-DD format.
 */
export default function getLocalDate(date) {
  if (!date) return undefined;
  try {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  } catch (error) {
    return null;
  }
}
