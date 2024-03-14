import {fetchWeatherApi} from 'openmeteo';
import 'url-search-params-polyfill';
import 'text-encoding';

async function fetchForecastData(
  positionLatitude: Geocoder.fromParams,
  positionLongitude: Geocoder.fromParams,
): Promise<any> {
  const params = {
    latitude: positionLatitude,
    longitude: positionLongitude,
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
    /* temperature_unit: 'fahrenheit',
    wind_speed_unit: 'ms', */
    timezone: 'America/Sao_Paulo',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  const range = (start: number, stop: number, step: number) =>
    Array.from({length: (stop - start) / step}, (_, i) => start + i * step);

  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const daily = response.daily()!;

  const weatherData = {
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval(),
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      weatherCode: daily.variables(0)!.valuesArray()!,
      temperature2mMax: daily
        .variables(1)!
        .valuesArray()!
        .map(value => Math.floor(value)),
      temperature2mMin: daily
        .variables(2)!
        .valuesArray()!
        .map(value => Math.floor(value)),
    },
  };
  return weatherData;
}

export default fetchForecastData;
