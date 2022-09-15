import moment from "moment";
export const dateDaysDiff = (startDate, endDate) => {
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const dateDaysHoursDiff = (endDate) => {
  const currentTime = new Date();
  const diff = endDate - currentTime;
  const diffDays = Math.floor(diff / 86400000); // days
  const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
  return `${diffDays} days ${diffHrs} hours`;
};
