function TodayDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const today = new Date();
  const year = today.getFullYear();
  let day;
  const month = months[today.getMonth()];
  const dayOfWeek = daysOfWeek[today.getDay() - 1];
  console.log("dayofWeek", dayOfWeek, today.getDay());
  switch (today.getDate()) {
    case 1:
      day = `${today.getDate()}st`;
      break;
    case 2:
      day = `${today.getDate()}nd`;
      break;
    case 3:
      day = `${today.getDate()}rd`;
      break;
    default:
      day = `${today.getDate()}th`;
  }

  const formatedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

  return (
    <p className="font-light text-[18px] leading-[1.2] text-neutral-3">
      {formatedDate}
    </p>
  );
}

export default TodayDate;
