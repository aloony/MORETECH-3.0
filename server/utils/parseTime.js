module.exports = (time) => {

  time = new Date(time)

  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  let hours = time.getHours()
  let minutes = time.getMinutes()

  if (date < 10)
    date = '0' + date

  if (month < 10)
    month = '0' + month

  if (hours < 10)
    hours = '0' + hours

  if (minutes < 10)
    minutes = '0' + minutes

  return `${date}.${month}.${year} ${hours}:${minutes}`
}