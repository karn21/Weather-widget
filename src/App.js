import React from 'react';
import './App.css';
import WeatherForm from './Form';
import Weather from './WeatherComponent';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      api_key: '7M6K7RmFyYed84uboNI0M2Pi1572tGTt',
      lat: '',
      lon: '',
      city: '',
      country: '',
      location_key: '',
      weather: '',
      today: '',
      last_update: '',
      icon: '',
    }
  }



  handleCityChange = (event) => {
    this.setState({
      city: event.target.value,
      weather: ''
    })
  }

  handleCountryChange = (event) => {
    this.setState({
      country: event.target.value,
      weather: ''
    })
  }

  get_weather = () => {
    let request = `http://dataservice.accuweather.com/currentconditions/v1/${this.state.location_key}?apikey=${this.state.api_key}&details=true HTTP/1.1`
    var today = new Date();
    var date = today.toDateString()
    fetch(request)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        var icon = data[0].WeatherIcon;
        if (icon < 10) {
          icon = '0' + icon;
        }
        this.setState({
          weather: data[0],
          today: date,
          icon: icon,
          last_update: today.toLocaleTimeString()
        })
      })
  }

  get_location_by_form = () => {
    let request = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.state.api_key}&q=${this.state.city}&details=false&offset=5 HTTP/1.1`;
    fetch(request)
      .then(res => res.json())
      .then(data => {
        console.log(data[0])
        if (data[0] == null) {
          alert("Cannot get weather for your Location.Check if location is Correct");
        }
        else if (data[0].Country.LocalizedName.toUpperCase() === this.state.country.toUpperCase()) {
          this.setState({
            location_key: data[0].Key,
          })
          this.get_weather();
        } else {
          alert("Cannot get weather for your Location.Check if location is Correct");
        }

      })
  }

  get_location = () => {
    let request = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.state.api_key}&q=26.8%2C75.8&details=false&toplevel=true HTTP/1.1`
    fetch(request)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          city: data.LocalizedName,
          country: data.Country.LocalizedName,
          location_key: data.Key
        })
        // this.get_weather();
      })
      .catch(error => {
        console.log("An error occured. Error Code:- ", error.code);
      });
  }

  get_location_cordinates = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos) => {
      var crd = pos.coords;
      this.setState({
        lat: crd.latitude,
        lon: crd.longitude,
      })
      this.get_location();
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1><i className='fa fa-sun-o'></i> Weather Widget</h1>

        </header>
        <div className='container mt-5'>
          <WeatherForm get_location={this.get_location_cordinates} city={this.state.city} country={this.state.country}
            city_change={this.handleCityChange} country_change={this.handleCountryChange} get_location_by_form={this.get_location_by_form}
          />
          {this.state.city && this.state.country && this.state.weather &&
            <Weather today={this.state.today} icon={this.state.icon} last_update={this.state.last_update} city={this.state.city} country={this.state.country} get_weather={this.get_weather} weather={this.state.weather} />
          }
        </div>


      </div>
    );
  }

}



export default App;
