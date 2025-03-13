import React, { useEffect, useRef, useState } from 'react'
import './NewWeather.css'
import search_icon from '../Image/search3.png'
import clear_icon from '../Image/clear.png'
import humidity_icon from '../Image/humidity.png'
import cloud_icon from '../Image/cloud.png'
import drizzle_icon from '../Image/drizzle.png'
import rain_icon from '../Image/rain.png'
import snow_icon from '../Image/snow.png'
import wind_icon from '../Image/wind.png'
import { type } from '@testing-library/user-event/dist/type'


const NewWeather = () => {
      const inputRef = useRef()
      const [weatherData,setWeatherData]=useState(false)
      const api = "03103fad2c233e9e6d46664d546fba42"
      const allIcons = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":rain_icon,
        "13n":rain_icon,
      }

  const search = async (city)=>{
      try{
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
          const response = await fetch(url);
          const data = await response.json()
          console.log(data)
          if(!response.ok){
            setWeatherData(false);
            return
          }
          const icon = allIcons[data.weather[0].icon] || clear_icon
          setWeatherData({
            humidity:data.main.humidity,
            temperature:Math.floor(data.main.temp),
            windSpeed: data.wind.speed,
            location:data.name,
            icon:icon
          })
      }
      catch(error){
          setWeatherData(false);
          console.error("Error in fetching data")
      }
  }
  useEffect(()=>{
    search("Bengaluru")
  },[])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' onChange={(e)=> {search(e.target.value)} } />
        {/* <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} /> */}
      </div>
     {
      weatherData?<>
       <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
         <img src={humidity_icon} alt="" />
         <div>
          <p>{weatherData.humidity}%</p>
          <span>Humidity</span>
         </div>
         </div>
         <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windspeed}km/h</p>
            <span>Wind Speed</span>
          </div>
         </div>
      </div>
      </>:<div className='no-data'>No Data Found!</div>
     }
    </div>
  )
}

export default NewWeather