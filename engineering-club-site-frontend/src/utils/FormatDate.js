const FormatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};

export const FormatRelevantTime = (date) => {
  const now = new Date();
  const inputDate = new Date(date);
  const diffInMs = inputDate - now;
  const diffInSec = Math.round(diffInMs / 1000);
  const diffInMin = Math.round(diffInSec / 60);
  const diffInHours = Math.round(diffInMin / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(diffInSec) < 60) {
    return rtf.format(diffInSec, "second");
  } else if (Math.abs(diffInMin) < 60) {
    return rtf.format(diffInMin, "minute");
  } else if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, "hour");
  } else if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, "day");
  } else if (Math.abs(diffInWeeks) < 5) {
    return rtf.format(diffInWeeks, "week");
  } else if (Math.abs(diffInMonths) < 12) {
    return rtf.format(diffInMonths, "month");
  } else {
    return rtf.format(diffInYears, "year");
  }
};

export default FormatDate;