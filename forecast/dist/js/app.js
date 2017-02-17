"use strict";
$(document).ready(function () {

	// city - текущий город, который отображается в main
	// dafaultCities - список городов для localstorage
	// weather - объект, содержащий инфу о погоде в текущем городе
	// searchCity - название города, которое набирается в поле ввода
	var city;
	var listOfCities = [];
	var geolocation = true;
	var restoredCities;
	var weather;
	var searchCity;
	var template = function (searchCity) {
		return '<div class="cities__city"><span class="city__name">' + searchCity + '</span><i class="fa fa-times city__closeIcon" aria-hidden="true"></i></div>';
	};



	init();

	// Клик по диву с городом
	$('.cities').on('click', '.cities__city', function () {
		city = $(this).find('.city__name').text();
		getWeather();
	});

	// добавление города
	$('.search__btn').click(function () {
		addCityToLS($('#search__input').val());
		addCity($('#search__input').val());

		city = searchCity;
		getWeather();
	});

	// удаление города из списка
	$('.cities').on('click', '.city__closeIcon', function () {
		delCityFromLS($(this).siblings('.city__name').text());
		$(this).parent().remove();
	});


	// удаление списка городов
	$('.cities__closeIcon').click(function () {
		$('.cities__city').remove();
		listOfCities = [];
		localStorage.clear();
	});

	// сортировка городов
	$('.cities').sortable();

	//	Если существует restoredCities, то приравниваем listOfCities ней
	//	Добавляем города из LS юзера
	//	Если юзер тут впервые, запуститься проверка на геолокацию
	//	Если да - покажет город юзера
	//	Если нет, то он увидит города по умолчанию
	function init() {
		restoredCities = JSON.parse(localStorage.getItem('Cities'));
		if (restoredCities !== null) {
			listOfCities = restoredCities;
			$('.cities__city').remove();
			for (var i = 0; i < restoredCities.length; i++) {
				addCity(restoredCities[i]);
			}
			city = listOfCities[0];
			getWeather();
		} else {
			checkGeo();
			if (geolocation === true) {
				getGeo();
			} else if (geolocation === false) {
				listOfCities = ['Saint-Petersburg', 'Moscow', 'London'];
				localStorage.setItem('Cities', JSON.stringify(listOfCities));
				city = listOfCities[0];
				getWeather();
			}
		}
	}

	function setDefaultCity() {
		addCity(city);
		listOfCities.push(city);
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}

	//	geo
	function checkGeo() {
		if ("geolocation" in navigator) {
			geolocation = true;
		} else {
			geolocation = false;
			console.log('geolocation is offline');
		}
	}

	function getGeo() {
			$.ajax({
				dataType: 'json',
				crossDomain: 'true',
				url: 'https://api.apixu.com/v1/current.json?key=66a4c90913bd4052811210101171702&q=auto:ip',
				timeout: 500,
				success: function (json) {
					weather = json;
					city = weather.location.name;
					setDefaultCity();
					setWeather();
				}
			});
	}

	function getWeather() {
		$.ajax({
			dataType: 'json',
			crossDomain: 'true',
			url: 'https://api.apixu.com/v1/current.json?key=66a4c90913bd4052811210101171702&q=' + city,
			success: function (json) {
				weather = json;
				city = weather.location.name;
				setWeather();
			}
		});
	}

	function setWeather() {
		changeCurrentCity();
		setTemp();
		setIcon();
		setDescription();
		setHumidity();
		setBarometer();
	}

	function changeCurrentCity() {
		$('.forecast__currentCity').text(city);
	}

	function setTemp() {
		$('.forecast__temp').text((weather.current.temp_c).toFixed(0) + '°');
	}

	function setIcon() {
		$('.forecast__weatherIcon').attr('src', weather.current.condition.icon);
	}
	
	function setDescription() {
		$('.forecast__description').text(weather.current.condition.text);
	}

	function setHumidity() {
		$('.forecast__humidity').text('Humidity: ' + weather.current.humidity + '%');
	}

	function setBarometer() {
		$('.forecast__barometer').text('Barometer: ' + weather.current.pressure_mb.toFixed(0) + 'hPa');
	}

	// Функция добавления городов в aside
	function addCity(source) {
		searchCity = source;
		$('#search__input').val('');
		if (searchCity !== '') {
			$('.cities').append(template(searchCity));
		}
	}

	// добавление городов в local storage
	function addCityToLS(source) {
		listOfCities.push(source);
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}

	function delCityFromLS(arr, value = 1) {
		var f = arr;
		var find = function (array) {
			return listOfCities.indexOf(f.toString());
		}
		if (find() !== -1) listOfCities.splice(find(), value);
		localStorage.setItem('Cities', JSON.stringify(listOfCities));
	}

});
