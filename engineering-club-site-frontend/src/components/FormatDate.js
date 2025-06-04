const FormatDate = (isoDate) => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
};

export default FormatDate;