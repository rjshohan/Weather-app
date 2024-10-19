import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../Image/search3.png'
import clear_icon from '../Image/clear.png'
import cloud_icon from '../Image/cloud.png'
import drizzle_icon from '../Image/drizzle.png'
import rain_icon from '../Image/rain.png'
import humidiy_icon from '../Image/humidity.png'
import wind_icon from '../Image/wind.png'
import snow_icon from '../Image/snow.png'
import { type } from '@testing-library/user-event/dist/type'

const Weather = () => {

      const inputRef = useRef();
      
      const [weatherData,setWeatherData] = useState(false);
       
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

      const api = "03103fad2c233e9e6d46664d546fba42"

      const search = async (city)=>{
        // if(city === ""){
        //   alert("Enter City Name")
        //   return;
        // }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`;

            const response = await fetch(url)
            const data = await response.json()
            if(!response.ok){
              setWeatherData(false)
              // alert(data.message);
              return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeatherData({
              humidity:data.main.humidity,
              windspeed: data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location: data.name,
              icon: icon
            })
        } catch (error){
          setWeatherData(false);
          console.error("Error in fetching weather data")
        }
      }
      useEffect(()=>{
        search("london")
      },[])
 
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' onChange={(e)=>{
          search(e.target.value)
        }} />
        {/* <img src={search_icon}  alt="" onClick={()=>search(inputRef.current.value) } /> */}
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature' >{weatherData.temperature}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidiy_icon} alt="" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windspeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<div style={{height:"50vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      No Data Found!
        </div>}
      
    </div>
  )
}

export default Weather