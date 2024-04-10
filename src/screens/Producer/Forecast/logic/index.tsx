import {useEffect, useState} from 'react';
import {useBetween} from 'use-between';
import fetchCurrentData from '../../../../services/weather/openMeteo/currentData';
import fetchHourlyData from '../../../../services/weather/openMeteo/hourlyData';
import fetchForecastData from '../../../../services/weather/openMeteo/nextForecast';
import {
  requestLocationPermission,
  checkLocationPermission,
} from '../../../../services/weather/askPermission';
import {getDescription} from '../../../../components/ProducerComponents/Weather/getDescription';
import {getPosition} from '../../../../services/weather/getPosition';
import {storage} from '../../../../helpers/storage';

type PositionType = {
  latitude: number;
  longitude: number;
};

export const useStateVariables = () => {
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [humidity, setHumidity] = useState(0);
  const [rain, setRain] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [date, setDate] = useState<string[]>([]);
  const [temperatureHourly, setTemperatureHourly] = useState<number[]>([]);
  const [weatherCodeHourly, setWeatherCodeHourly] = useState<number[]>([]);
  const [weatherCodeDaily, setWeatherCodeDaily] = useState([]);
  const [hour, setHour] = useState<string[]>([]);
  const [week, setWeek] = useState<string[]>([]);
  const [temperatureDaily, setTemperatureDaily] = useState({
    tempMin: [] as number[],
    tempMax: [] as number[],
  });
  const [position, setPosition] = useState<PositionType | null>(null);
  const [weatherCode, setWeatherCode] = useState<number | null>(null);
  const [updateAllData, setUpdateAllData] = useState(true);

  const [loading, setLoading] = useState(false);

  return {
    cityName,
    setCityName,
    description,
    setDescription,
    humidity,
    setHumidity,
    rain,
    setRain,
    temperature,
    setTemperature,
    windSpeed,
    setWindSpeed,
    date,
    setDate,
    temperatureHourly,
    setTemperatureHourly,
    weatherCodeHourly,
    setWeatherCodeHourly,
    weatherCodeDaily,
    setWeatherCodeDaily,
    hour,
    setHour,
    week,
    setWeek,
    temperatureDaily,
    setTemperatureDaily,
    position,
    setPosition,
    weatherCode,
    setWeatherCode,
    updateAllData,
    setUpdateAllData,
    loading,
    setLoading,
  };
};

export const useSharedState = () => useBetween(useStateVariables);

export const useInit = () => {
  const {
    setDescription,
    setTemperatureHourly,
    setHour,
    setHumidity,
    setRain,
    setTemperature,
    setWindSpeed,
    setTemperatureDaily,
    setWeatherCode,
    setWeatherCodeHourly,
    setWeatherCodeDaily,
    setDate,
    setWeek,
    setLoading,
  } = useSharedState();

  useEffect(() => {
    console.log('useInit funcionando em Home!!');
    setLoading(true);
    // ==================================================================
    const storedCurrentDay = storage.getString('currentDay');
    const currentDate = new Date();
    const currentDay = currentDate.getDate().toString().padStart(2, '0');
    // ==================================================================
    // if not loading for the first time, load the data stored
    // TITLE AREA =====================================================
    // GET STORED DATA ================================================
    const currentTemperature = storage.getNumber('currentTemperature') || 0;
    const relativeHumidity = storage.getNumber('relativeHumidity') || 0;
    const rain = storage.getNumber('rain') || 0;
    const weatherCode = storage.getNumber('weatherCode') || 0;
    const windSpeed = storage.getNumber('windSpeed') || 0;
    const description = storage.getString('description') || '';
    // SET ============================================================
    setTemperature(currentTemperature);
    setHumidity(relativeHumidity);
    setRain(rain);
    setWeatherCode(weatherCode);
    setWindSpeed(windSpeed);
    setDescription(description);
    // TODAY AREA =====================================================
    // GET STORED DATA ================================================

    const currentMonth = storage.getString('currentMonth') || '';
    const jsonTemperatureHourly = storage.getString('temperatureHourly') || '';
    const temperatureHourlyArray = jsonTemperatureHourly
      ? JSON.parse(jsonTemperatureHourly)
      : [];
    const jsonWeatherCodeHourly = storage.getString('weatherCodeHourly') || ''; // If empty, set to empty string
    const weatherCodeHourlyArray = jsonWeatherCodeHourly
      ? JSON.parse(jsonWeatherCodeHourly)
      : []; // Check if not empty before parsing

    // SET ============================================================
    setDate([currentDay, currentMonth]);
    setTemperatureHourly(temperatureHourlyArray);
    setWeatherCodeHourly(Array.from(weatherCodeHourlyArray));
    // FORECAST AREA ==================================================
    // GET STORED DATA ================================================
    const stringCurrentWeekdays = storage.getString('currentWeekdays') || '';
    let currentWeekdays =
      stringCurrentWeekdays && JSON.parse(stringCurrentWeekdays);

    const jsonTemperatureDaily = storage.getString('temperatureDaily') || '';
    const temperatureDailyArray =
      jsonTemperatureDaily && JSON.parse(jsonTemperatureDaily);

    const jsonWeatherCodeDaily = storage.getString('weatherCodeDaily') || '';
    const weatherCodeDailyArray =
      jsonWeatherCodeDaily && JSON.parse(jsonWeatherCodeDaily);

    // SET ========================================================
    setWeek(currentWeekdays);
    setWeatherCodeDaily(weatherCodeDailyArray);
    setTemperatureDaily(temperatureDailyArray);
    // ================================================
    //Asking for Permission only if not granted to optimize the app
    /* const checkAndRequestLocationPermission = async () => {
      const isLocationPermissionGranted = await checkLocationPermission();
      if (!isLocationPermissionGranted) {
        await requestLocationPermission();
      }
      setLocationPermission(isLocationPermissionGranted);
    };

    checkAndRequestLocationPermission(); */
    // ================================================
    const fetchCurrent = async (
      lat: any /* : Geocoder.fromParams */,
      long: any /* : Geocoder.fromParams */,
    ) => {
      try {
        const {current} = await fetchCurrentData(lat, long);
        // TITLE AREA =================================================
        // SET ========================================================
        setTemperature(current.temperature2m);
        setHumidity(current.relativeHumidity2m);
        setRain(current.rain);
        setWeatherCode(Math.floor(current.weatherCode));
        setWindSpeed(Math.floor(current.windSpeed10m));
        const weatherDescription = getDescription(current.weatherCode);
        setDescription(weatherDescription);
        // GET STORED DATA ================================================

        storage.set('currentTemperature', current.temperature2m);
        storage.set('relativeHumidity', current.relativeHumidity2m);
        storage.set('rain', current.rain);
        storage.set('weatherCode', Math.floor(current.weatherCode));
        storage.set('windSpeed', current.windSpeed10m.toString().slice(0, 2));
        storage.set('description', weatherDescription);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    // ==============================  ==================
    const fetchHourly = async (
      lat: any /* Geocoder.fromParams */,
      long: any /* Geocoder.fromParams */,
    ) => {
      try {
        // TODAY AREA =====================================================
        const {hourly} = await fetchHourlyData(lat, long);
        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        // Formatting all the temperatures to get two decimal places
        const formattedArray = Array.from(hourly.temperature2m).map(value =>
          Math.floor(value),
        );
        // SET ===========================================================
        setHour(hoursArray);
        setTemperatureHourly(formattedArray);
        setWeatherCodeHourly(Array.from(hourly.weatherCode));
        // GET STORED DATA ================================================

        storage.set('temperatureHourly', JSON.stringify(formattedArray));
        storage.set(
          'weatherCodeHourly',
          JSON.stringify(Array.from(hourly.weatherCode)),
        );
      } catch (error) {
        console.error('Failed to fetch Daily Data:', error);
      }
    };
    // ================================================

    const fetchForecast = async (
      lat: any /* Geocoder.fromParams */,
      long: any /* Geocoder.fromParams */,
    ) => {
      try {
        // FORECAST AREA ==================================================
        const forecastData = await fetchForecastData(lat, long);
        const temperatureObject = {
          tempMin: forecastData.daily.temperature2mMin,
          tempMax: forecastData.daily.temperature2mMax,
        };
        // SET ===========================================================
        setTemperatureDaily(temperatureObject);
        setWeatherCodeDaily(forecastData.daily.weatherCode);
        // GET STORED DATA ================================================

        storage.set('temperatureDaily', JSON.stringify(temperatureObject));
        storage.set(
          'weatherCodeDaily',
          JSON.stringify(forecastData.daily.weatherCode),
        );
      } catch (error) {
        console.error('Failed to fetch forecast Data:', error);
      }
    };
    // ================================================
    //If permission is granted, getCurrentPosition
    const requestCurrentPosition = async () => {
      const {positionLatitude, positionLongitude} = await getPosition();

      return {positionLatitude, positionLongitude};
    };
    // ================================================
    const optimizer = async () => {
      console.log('chegou em optimizer');
      console.log('currentDay = ', currentDay);
      console.log('storedCurrentDay = ', storedCurrentDay);
      const {positionLatitude, positionLongitude} =
        await requestCurrentPosition();
      //Store the currentDay, if the storedCurrentDay is the same as currentDay,
      //You don't need to request daily and hourly Weather Data, else, request all
      if (currentDay === storedCurrentDay) {
        console.log('atualiza dados do momento');
        fetchCurrent(positionLatitude, positionLongitude);

        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        setHour(hoursArray);
        setLoading(false);
      } else {
        console.log('atualiza tudo');
        const fullDate = getDate();
        setDate(fullDate);
        currentWeekdays = getWeek();
        setWeek(currentWeekdays);
        fetchCurrent(positionLatitude, positionLongitude);

        const hoursArray = Array.from({length: 25}, (_, index) =>
          index.toString().padStart(2, '0'),
        );
        setHour(hoursArray);

        fetchHourly(positionLatitude, positionLongitude);
        fetchForecast(positionLatitude, positionLongitude);
        setLoading(false);
      }
    };
    optimizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const getDate = () => {
  console.log('chamou getDate');
  const getCurrentMonth = (monthIndex: number): string => {
    const months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    return months[monthIndex];
  };

  const currentDate = new Date();
  const month = getCurrentMonth(currentDate.getMonth());
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const fullDate = [currentDay, month];

  storage.set('currentDay', currentDay);
  storage.set('currentMonth', month);
  return fullDate;
};

export const getWeek = () => {
  console.log('chamou getWeek');

  const weekdays = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  const today = new Date();
  const currentDayIndex = today.getDay();
  const currentWeekdays = [];

  for (let i = 0; i < 7; i++) {
    const index = (currentDayIndex + i) % 7;
    currentWeekdays.push(weekdays[index]);
  }
  storage.set('currentWeekdays', JSON.stringify(currentWeekdays));
  return currentWeekdays;
};
