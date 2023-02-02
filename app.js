const key = '92db029d56eae8b82b463bfb9fb4350a';
const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`;

const findCity = document.querySelector("#inputCity");
const deleteData = document.querySelector("#clear");
const app = document.querySelector('#cards');

const history = [];

async function fetchApp(city) {

	const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

	const response = await fetch(baseUrl);
	const res = await response.json();

	const objCard = toObj(res.name, res.sys.country, res.main.temp, res.weather);
	console.log(objCard);

	cardWeather(objCard);



	//return {...objCard};
}

function toObj(name, country, temp, weather) {

	return objWeather = {
		name: name,
		country: country,
		temp: temp,
		weather: weather
	}
}

function ConverTemp(k) {
	const celsiusTemp = Math.round(k - 273.15).toFixed(1);

	return celsiusTemp;
}
function cardWeather(data) {

	const {name, country, temp, weather} = data;

	const close = document.createElement('BUTTON');
	const container = document.createElement('DIV');
	const icon = document.createElement('IMG');
	const title = document.createElement('h1');
	const textTemp = document.createElement('P');
	const weatherData = document.createElement('P');

	close.textContent = 'X';
	icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
	title.textContent = name + ', ' + country;
	textTemp.textContent = ConverTemp(temp) + ' °C';
	weatherData.textContent = data.weather[0].description;

	close.addEventListener('click', () => {
		app.removeChild(container);
	})


	container.classList.add('container-card');
	close.classList.add('card-close');
	icon.classList.add('card-icon');
	title.classList.add('card-title');
	textTemp.classList.add('card-temp');
	weatherData.classList.add('card-data');


	container.append(close, icon, title, textTemp, weatherData);
	app.appendChild(container);
	
}

const addAlert = () => {

	const container = document.querySelector("#alert");
	container.classList.toggle('hidden');
	setTimeout(() => {
		container.classList.toggle('hidden');
	}, 1000);

}

function search() {

	deleteData.addEventListener('click', () => {
		while(app.firstChild) {
			app.removeChild(app.lastChild);
			history.pop();
			console.log(history);
		}
	});

	findCity.addEventListener("keypress", (e) => {
		if(e.key === "Enter") {
			
			e.preventDefault();
			const value = e.target.value;
			
			if(!history.includes(value)) {
				fetchApp(value);
				history.push(value);
				e.target.value = '';
				return;
			} else {
				addAlert();
			}
		}
	});
}

search();
//console.log(searchInput);
//const searchInput = getCity();
//const result = fetchApp('London');
//console.log(result);