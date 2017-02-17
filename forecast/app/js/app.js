"use strict";
$(document).ready(function() {

	// city - текущий город, который отображается в main
	// dafaultCities - список городов для localstorage
	// weather - объект, содержащий инфу о погоде в текущем городе
	// searchCity - название города, которое набирается в поле ввода
  var city;
	var listOfCities = [];
	var restoredCities;
  var weather;
	var searchCity;
	var template = function(searchCity) {
		return '<div class="cities__city"><span class="city__name">' + searchCity + '</span><i class="fa fa-times city__closeIcon" aria-hidden="true"></i></div>';
	};
	
	
	//	Если существует restoredCities, то приравниваем listOfCities ней
	//	Добавляем города из LS юзера
	//	Если городов нет, то при след входе он увидит города по умолчанию
	restoredCities = JSON.parse(localStorage.getItem('Cities'));
	if (restoredCities !== null) {
		listOfCities = restoredCities;
		$('.cities__city').remove();
		for (var i = 0; i < restoredCities.length; i++) {
			addCity( restoredCities[i] );
		}
	}
	else {
		listOfCities = ['Saint-Petersburg', 'Moscow', 'London'];
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}
	console.log(restoredCities);
	console.log(listOfCities);
	
	
	
	if( weather === undefined ) city = listOfCities[0];
	else city = weather.name;
	
	
  getWeather();
	
  $('.forecast__currentCity').text(city);
	
	// Клик по диву с городом
  $( '.cities' ).on( 'click', '.cities__city', function() {
		city = $(this).find('.city__name').text();
    getWeather();
  });
	
	// добавление города
	$('.search__btn').click(function() {
		addCityToLS( $('#search__input').val() );
		addCity( $('#search__input').val() );
	});
	
	// удаление города из списка
	$('.cities').on('click', '.city__closeIcon', function() {
		delCityFromLS( $(this).siblings('.city__name').val() );
		$(this).parent().remove();
	});
	
	
	// удаление списка городов
	$('.cities__closeIcon').click(function() {
		$('.cities__city').remove();
		listOfCities = [];
		localStorage.clear();
	});
	
	// сортировка городов
//	$('.cities').sortable();
	
//	$( ".cities" ).sortable({
//    update: function() {
//			listOfCities = [];
//			var name = $('.cities').find('.city__name');
//			var len = $('.cities').find('.city__name').length;
//			alert (len);
//			for (var i = 0; i < len; i++ ) {
//				addCityToLS( $('.city__name').eq(i) );
//				console.log(listOfCities);
//			}
//		}
//});
	
	console.log( $('.city__name').length );
	console.log( $('.city__name').eq(0).text() );
	
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
		// Костыль для Питера
		if (city === 'Novaya Gollandiya') {
			$('.forecast__currentCity').text('Saint-Petersburg');
		}
		else $('.forecast__currentCity').text( city );
  }

	// -273 потому что ответ с сервака в Кельвинах
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
	
	// Функция добавления городов в aside
	function addCity(source) {
//		searchCity = $('#search__input').val();
		searchCity = source;
		$('#search__input').val('');
		if (searchCity !== '') {
			$('.cities').append( template(searchCity) );
		}
	}
	
	// добавление городов в local storage
	function addCityToLS(source) {
		listOfCities.push(source);
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}
	
	function delCityFromLS(source) {
		var find = function(source, value) {
			return listOfCities.indexOf(value);
		}
		if (find !== -1) listOfCities.splice(find, 1);
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}

});
