module.exports = (time) => {

  time = new Date(time)

  let date = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();

  if (date < 10)
    date = '0' + date

  if (month < 10)
    month = '0' + month

  return `${date}.${month}.${year}`
}