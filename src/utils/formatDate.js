export function formatDate(date, showTime = false) {
  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(showTime && { hour: "numeric", minute: "numeric" }),
  });
}
