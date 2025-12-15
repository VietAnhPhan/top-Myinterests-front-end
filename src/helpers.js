function getDuration(datetime) {
  const MONTH_WEEKS = 4;
  const today = new Date();
  const event = new Date(datetime);

  const years = today.getFullYear() - event.getFullYear();
  const months = today.getMonth() - event.getMonth();
  const days = today.getDate() - event.getDate();
  const hours = today.getHours() - event.getHours();
  const mins = today.getMinutes() - event.getMinutes();

  if (years > 0) {
    return years + "y";
  }

  if (months > 0) {
    const weeks = months * MONTH_WEEKS;
    return weeks + "w";
  }

  if (days > 0) {
    return days + "d";
  }

  if (hours > 0) {
    return hours + "h";
  }

  if (mins > 0) {
    return mins + "min";
  }
}

export { getDuration };
