import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org'

const getWeather = (lat, lon, api_key) => {
  const request = axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api_key}`)
  return request.then(response => response.data)
}

export default { getWeather }