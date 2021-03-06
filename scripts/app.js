const cityForm = document.querySelector('form')
const details = document.querySelector('.details')
const card = document.querySelector('.card')
const icon = document.querySelector('.icon img')
const appBody = document.querySelector('body')
const appHeader = document.querySelector('header h1')
const appInput = document.querySelector('form input')
const socialButtons = document.querySelectorAll('.social-buttons a')
const button = document.querySelector('.btnCSS')
const spinner = document.querySelector('.spinner')

const forecast = new Forecast()

// Updating the HTML with the API values
const updateUI = (data) => {
  const {
    cityDetails,
    weather
  } = data

  // Setting Day or Night
  if (weather.IsDayTime) {
    appBody.style.backgroundImage = "url('./day.svg')"
    appHeader.style.backgroundImage =
      'linear-gradient(114.2deg, #63C7B2 10%, #0E273C 50%, #FF5964 67.7%)'
    cityForm.style.color = '#6c757d'
    appInput.style.backgroundColor = '#6c757d'
    appInput.style.color = '#f8f9fa'
    card.style.border = '2px solid #343a40'
    document.querySelector('.icon').style.border = '2px solid #343a40'
    button.style.backgroundImage = 'linear-gradient(to right, #343a40 40%, #1C2735 99%)'
    button.style.color = '#fff'
    socialButtons.forEach(current => {
      current.style.color = '#000'
    });
    // Manipulating B5 Class
    if (card.classList.contains('bg-dark')) {
      // Removing Classes
      card.classList.remove('bg-dark')
      document.querySelector('.icon').classList.remove('bg-dark')
      details.classList.remove('text-secondary')
      // Adding Classes
      card.classList.add('bg-light')
      document.querySelector('.icon').classList.add('bg-light')
      details.classList.add('text-secondary')
    } else {
      card.classList.add('bg-light')
      document.querySelector('.icon').classList.add('bg-light')
      details.classList.add('text-secondary')
    }
  } else {
    appBody.style.backgroundImage = "url('./night.svg')"
    appHeader.style.backgroundImage =
      'linear-gradient(114.2deg, #63C7B2 30%, #FF5964 67.7%)'
    cityForm.style.color = '#6c757d'
    appInput.style.backgroundColor = '#6c757d'
    appInput.style.color = '#f8f9fa'
    card.style.border = '2px solid #ff5964'
    document.querySelector('.icon').style.border = '2px solid #ff5964'
    button.style.backgroundImage = 'linear-gradient(to right, #343a40 40%, #1C2735 99%)'
    button.style.color = '#ff5964'
    socialButtons.forEach(current => {
      current.style.color = '#ff5964'
    });
    // Manipulating B5 Class
    if (card.classList.contains('bg-light')) {
      // Removing Classes
      card.classList.remove('bg-light')
      document.querySelector('.icon').classList.remove('bg-light')
      details.classList.remove('text-secondary')
      // Adding Classes
      card.classList.add('bg-dark')
      document.querySelector('.icon').classList.add('bg-dark')
      details.classList.add('text-secondary')
    } else {
      card.classList.add('bg-dark')
      document.querySelector('.icon').classList.add('bg-dark')
      details.classList.add('text-secondary')
    }
  }

  // Updating Details
  details.innerHTML = `
    <h5 class="pt-3"> ${cityDetails.EnglishName} </h5> 
    <div class="mt-3"> ${weather.WeatherText} </div> 
    <div class="display-4 mt-3 mb-4">
      <span> ${weather.Temperature.Metric.Value} &deg;C </span>
    </div>
  `

  // Setting Icon
  const iconsrc = `./img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconsrc)

  // Remove Class if there is values
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none')
  }
}

// Main Calling Function
cityForm.addEventListener('submit', (e) => {
  // Prevent from Loading Page
  e.preventDefault()

  // Getting the Value typed in input box
  const city = cityForm.city.value.trim()
  cityForm.reset()

  // Spinner Starts
  spinner.classList.remove('d-none')

  // Card is display none untill data is fetched
  if (!card.classList.contains('d-none'))
    card.classList.add('d-none')

  // Update the City Name
  forecast.getWeatherReport(city)
    .then((data) => updateUI(data))
    .catch((err) => {
      console.log(err)
      alert('No Such City Name Exist')
    })

  // Setting Local Storage
  localStorage.setItem('city', city)
})

// // Updating Page with Local Storage
// if (localStorage.getItem('city')) {
//   forecast.getWeatherReport(localStorage.getItem('city'))
//     .then((data) => updateUI(data))
//     .catch((err) => {
//       console.log(err)
//       alert('No Such City Name Exist')
//     })
// }