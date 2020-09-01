//API Key
const api = b0e816ad7b86bc25e7ed845526754dc9;

//Search by city name
const form = document.querySelector('section-1 form');
const city = document.querySelector('section-1 input');
const msg = document.querySelector('section-1 msg');
const list = document.querySelector('section-1 cities');











const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=${unit}`
/*    concat: &units=metric -> Gives temperature in metric, same for imperial
*/