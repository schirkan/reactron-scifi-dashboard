import numeral from 'numeral';
import { IWeatherCondition } from 'reactron-openweathermap/src/server/index';
import { IInfoItemProps } from '../InfoItem/InfoItem';

export const getInfoItemData = (info: string, units: string, condition: IWeatherCondition): IInfoItemProps | undefined => {
  switch (info) {
    case 'temp':
      let tempCelsius = 0;
      let tempUnit = '';
      if (units === 'metric') {
        tempUnit = '°C';
        tempCelsius = condition.temp;
      }
      else if (units === 'imperial') {
        tempUnit = '°F';
        tempCelsius = (condition.temp - 32) / 1.8;
      }
      else {
        tempUnit = '°K';
        tempCelsius = condition.temp - 273.15;
      }
      return {
        title: 'Temp',
        value: numeral(condition.temp).format('0.00'),
        circleContent: tempUnit,
        circleStart: 90,
        circlePercent: (100 / 40) * tempCelsius
      };
      
    case 'rain':
      const maxRain = 10;
      const rainPercent = (100 / maxRain) * condition.rain;
      return {
        title: 'rain',
        value: numeral(condition.rain).format('0.00'),
        circleContent: 'mm',
        circleStart: 90,
        circlePercent: rainPercent
      };

    case 'pressure':
      const minPressure = 900;
      const maxPressure = 1100;
      const pressurePercent = (100 / (maxPressure - minPressure)) * (condition.pressure - minPressure);
      return {
        title: 'Pressure',
        value: numeral(condition.pressure).format('0'),
        circleContent: 'hPa',
        circleStart: 90,
        circlePercent: pressurePercent
      };

    case 'clouds':
      return {
        title: 'Clouds',
        value: numeral(condition.clouds).format('0'),
        circleContent: '%',
        circleStart: 90,
        circlePercent: condition.clouds
      };

    case 'humidity':
      return {
        title: 'Humidity',
        value: numeral(condition.humidity).format('0'),
        circleContent: '%',
        circleStart: 90,
        circlePercent: condition.humidity
      };

    case 'wind':
      return {
        title: 'Wind',
        value: numeral(condition.wind_speed).format('0.00'),
        circleContent: units === 'imperial' ? 'mph' : 'km/h',
        circleStart: 88 + condition.wind_deg,
        circlePercent: 4
      };
  }
  return undefined;
};