"use strict";
$(document).ready(function() {

	// city - текущий город, который отображается в main
	// listOfCities - список городов для localstorage
	// weather - объект, содержащий инфу о погоде в текущем городе
	// searchCity - название города, которое набирается в поле ввода
  var city;
	var listOfCities;
  var weather;
	var searchCity;
	
	if( weather === undefined ) city = 'London';
	else city = weather.name;
	
  getWeather();
	
  $('.forecast__currentCity').text(city);
	
	// Клик по диву с городом
  $( '.cities' ).on( 'click', '.cities__city', function() {
		city = $(this).find('.city__name').text();
    getWeather();
  });
	
	var template = function(searchCity) {
		return '<div class="cities__city"><span class="city__name">' + searchCity + '</span><i class="fa fa-times city__closeIcon" aria-hidden="true"></i></div>';
	};
	
	$('.search__btn').click(function() {
		searchCity = $('#search__input').val();
		$('#search__input').val('');
		if (searchCity !== '') {
			$('.cities').append( template(searchCity) );
		}
	});
	
	$('.cities').on('click', '.city__closeIcon', function() {
		$(this).parent().remove();
	});

	
	
  function getWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=08a5dc1a636b7b57d11cb7d84abd2720", function(json) {
      weather = json;
			city = weather.name;
      setWeather();
      console.log(weather);
      console.log(city);
    });
  }

  function setWeather() {
    changeCurrentCity();
    setTemp();
    setIcon();
  }

  function changeCurrentCity() {
		if (city === 'Novaya Gollandiya') {
			// Костыль для Питера
			$('.forecast__currentCity').text('Saint-Petersburg');
		}
		else $('.forecast__currentCity').text( city );
  }

  function setTemp() {
    $('.forecast__temp').text( (weather.main.temp - 273).toFixed(0) + '°' );
  }

  function setIcon() {
		var weatherMain = weather.weather['0'].main;
    if ( weatherMain === 'Clouds' ) {
      $('.forecast__weatherIcon').attr('src', 'img/clouds.svg');
    }
    else if ( weatherMain === 'Sun' || weatherMain === 'Clear') {
      $('.forecast__weatherIcon').attr('src', 'img/sun.svg');
    }
    else if ( weatherMain === 'Rain' ) {
      $('.forecast__weatherIcon').attr('src', 'img/rain.svg');
    }
  }
	

});
