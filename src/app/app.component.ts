import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onStart: boolean = true; //boolean value to determine if the application is just starting
  title = 'weather-app';
  city = '';

  awaitingWeather = false;
  
  searchingCity: boolean = true;
  //Weather data to be rendered in the HTML
  name: any;
  country: any;
  temperature: any = '--';
  temp_min: any;
  temp_max: any;
  humidity: any = '--';
  windSpeed: any = '--';
  weather: any;
  description: any;
  time: any;

  //Longitide and latitude for automatic weather retrieval based on location
  longitude: any;
  latitude: any;

  icon: string = ''; //Path to the svg icon depending on the weather data
  message: string = '' //Message displayed to the user depending on the weather
  
  
  


  searchActive(){
    this.searchingCity = !this.searchingCity;
  }
  
  /*showLocation = (postion: any) =>{
    this.longitude = postion.coords.longitude;
    this.latitude = postion.coords.latitude;

  }

  getError = (error: any) =>{
    console.log("There is an error")
  }

  getLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showLocation, this.getError)
      //console.log(navigator.geolocation.getCurrentPosition(this.showLocation))
    } else {
      let error = 'Cannot get your coordinates. Please manually search.'
    }
  }

  fetchAutomaticWeather = () => {
    console.log(this.latitude)
    this.awaitingWeather = true;
    console.log(this.latitude,this.longitude);
    const proxy: string = 'https://cors-anywhere.herokuapp.com/'
    const key: string = 'e0a10d0713bf59b75b148cdcb7930444';
    const api: string = `${proxy}api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&appid=${key}`
    fetch(api)
      .then(response => response.json())
      .then( data => {
        const weatherData = data;
        this.name = weatherData.city.name;
        this.country = weatherData.city.country;

        let hour = weatherData.city.timezone/3600 + (new Date().getUTCHours());
        let minute = new Date().getUTCMinutes();
        this.time = `${hour}:${minute}`;

        this.temperature = `${(weatherData.list[0].main.temp - 273).toFixed(1)}ºC`
        this.temp_max = `${(weatherData.list[0].main.temp_max - 273).toFixed(1)}ºC`
        this.temp_min = `${(weatherData.list[0].main.temp_min - 273).toFixed(1)}ºC`;
        this.humidity = weatherData.list[0].main.humidity += '%';
        this.weather = weatherData.list[0].weather[0].main;          
        this.description = weatherData.list[0].weather[0].description;
        this.windSpeed = weatherData.list[0].wind.speed += 'km/hr';
        
        this.awaitingWeather = false;
      }
    )
  }*/

  fetchWeatherByCity = () =>{
    this.awaitingWeather = true;
    this.onStart = false;
    this.searchingCity = !this.searchingCity;
    let thereIsError: boolean = false;
    console.log(this.city)
    const key = 'e0a10d0713bf59b75b148cdcb7930444';
    const api = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${key}`
    fetch(api)
      .then(response => response.json())
      .then(data => {
        const weatherData = data;
        console.log(weatherData);
        
        const details = {
          name: weatherData.city.name,
          country: weatherData.city.country,
          time: weatherData.city.timezone/3600 + (new Date().getUTCHours()),
          temperature: weatherData.list[0].main.temp - 273,
          temp_max: weatherData.list[0].main.temp_max - 273,
          temp_min: weatherData.list[0].main.temp_min - 273,
          humidity: weatherData.list[0].main.humidity,
          weather: weatherData.list[0].weather[0].main,          
          description: weatherData.list[0].weather[0].description,
          wind_speed: weatherData.list[0].wind.speed,
        }
        this.awaitingWeather = false;
        this.name = details.name;
        this.country = details.country;
        this.time = `${details.time}:${new Date().getUTCMinutes()}`;
        this.temperature = `${details.temperature.toFixed(1)}ºC`;
        this.temp_min = `${details.temp_min.toFixed(1)}ºC`;
        this.temp_max = `${details.temp_max.toFixed(1)}ºC`;
        this.humidity = details.humidity += '%';
        this.weather = details.weather;
        this.description = details.description;
        this.windSpeed = details.wind_speed +='km/hr';
        
        console.log(details.temp_max)
        console.log(details.time)

        if(details.time>=13){
          this.time = `${("0"+(details.time-12)).slice(-2)}:${("0"+(new Date().getUTCMinutes())).slice(-2)}`
          this.time+='PM'
        }
        else if(details.time==12){
          this.time+='PM'
        }
        else{
          this.time+='AM'
        }


        if(this.time>=6 && this.time<=19){
      
          if(this.weather=='Clouds'){
            this.icon = './assets/icons/cloudy-day.svg';
          } else if(this.weather=='Rain'){
            this.icon = './assets/icons/rainy-sun.svg';
          } else if(this.weather=='Clear'){
            this.icon = './assets/icons/day.svg';
            
          }
          console.log(this.icon);
        
        } else {
            if(this.weather=='Clouds'){
              this.icon = './assets/icons/cloudy-night.svg';
            } else if(this.weather=='Rain'){
              this.icon = './assets/icons/rainy.svg';
            } else if(this.weather=='Clear'){
              this.icon = './assets/icons/night.svg';
            
          }
        }



        if(this.weather=="Clouds"){
          this.message = 'Nothing to see here, just a bunch a clouds hanging in the sky.';
        } else if(this.weather=="Rain"){
          this.message = "Yup, the clouds decided to cry today. Looks like you'll be needing your coat or you'll get soaked";
        } else if(this.weather=="Clear"){
            this.message = "Weather's absolutely perfect!"
        }
    
      })
      .catch(err => {
        thereIsError = true;
        console.log(err.message);
        let error = "Something went wrong. Try again"
      })

  }
  

}
