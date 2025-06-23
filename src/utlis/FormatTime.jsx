export const formatTime =(date)=> {
  // Convert to GMT-7
 const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const gmtMinus7 = new Date(utc - 7 * 60 * 60 * 1000);

  let hours = gmtMinus7.getHours(); // 0-23
  const minutes = gmtMinus7.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  if (hours === 0) hours = 12; // convert 0 to 12 for 12AM/12PM

  return `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`;}
