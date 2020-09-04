const form = document.querySelector(".section-1 form");
const input = document.querySelector(".section-1 input");
const msg = document.querySelector(".section-1 .msg");
const list = document.querySelector(".section-2 .cities");

//Your API key
const api;

//Form
form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;

  //This is a list of the cities already searched for. '.city' is a future class of <li> element
  //which will be created after the user has made their first search.
  const listItems = list.querySelectorAll('.section-2 .city');
  //Creates an array of each <li> item
  const listItemsArray = Array.from(listItems);

  //This checks if the inputVal (City entered in search bar) has already been searched for
  if(listItemsArray.length > 0) {
    //Filter through listItemsArray to see if any items match what is being searched for
    const filteredArr = listItemsArray.filter(i => {
      let content = "";
      //If user entered City, with Country -> 'athens, gr'
      if(inputVal.includes(',')) {
        //Athens, grrr => Invalid
        if(inputVal.split(',')[1].length > 2) {
          //Only take the first word
          inputVal = inputVal.split(',')[0];
          content = i.querySelector('city-name span').textContent.toLowerCase();
        //Otherwise it'll be Athens, gr or less
        } else {
          content = i.querySelector('.city-name').textContent.dataset.name.toLowerCase();
        }
      //Else Athens
      } else {
        content = i.querySelector('.city-name span').textContent.toLowerCase();
      }
      //return the final value in lowercase
      return content == inputVal.toLowerCase();
    });
    //If the filteredArr contains anything, instruct them to search for something else
    if (filteredArr.length > 0) {
      msg.textContent = `It seems already know the weather for ${filteredArr[0].querySelector('.city-name span').textContent
    }! ...otherwise try being more specific by providing the country code as well :)`;
    //Empty the form
    form.reset();
    //Focus user to input bar
    input.focus();
    return;
    }
  }

  //Url; uses inputVal & apikey, returns data in metric values
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;
  
  //Fetch the data from the url
  fetch(url)
  //Format response in json
  .then(response => response.json())
  //Data is the name of the fetched object
  .then(data => {
    //Destructuring assignment => const main = data.main; data.name etc..
    const {main, name, sys, weather} = data;
    //This returns the relevant icon to the weather, as the json holds an 'icon' code
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
    //Create a HTML element called li
    const li = document.createElement('li');
    //With class = 'city'
    li.classList.add('city');
    //The html that will be added to home.html when a valid city is found.
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>`;
    //The new html element is now equal to markup
    li.innerHTML = markup;
    //Add li to the end of list (Identified above)
    list.appendChild(li);
  //If response returns invalid
  }).catch(() => {
    msg.textContent = "Please search for a valid city :)";
  });
  //Finally return no message, reset and focus on bar.
  msg.textContent = "";
  form.reset();
  input.focus();
});