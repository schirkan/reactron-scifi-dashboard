import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import moment from 'moment';
import * as React from 'react';
import { IWeatherCondition, IWeatherForecast, IWeatherService } from 'reactron-openweathermap/src/server/index';
import { DigitalClock } from '../DigitalClock/DigitalClock';
import { IInfoItemProps, InfoItem } from '../InfoItem/InfoItem';
import { InfoItemType } from '../InfoItem/InfoItemType';

import styles from './Dashboard.scss';
// tslint:disable:no-string-literal

export interface IDashboardProps {
  units: 'metric' | 'imperial';
  location: { cityName: string, zip: string }
  infoItems: InfoItemType[];
  contentId: string;
}

interface IDashboardState {
  weatherForecast?: IWeatherForecast;
}

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  public context: IReactronComponentContext;

  constructor(props: IDashboardProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount() {
    this.context.topics.subscribe('system-settings-updated', () => this.forceUpdate());

    const weatherService = this.context.getService<IWeatherService>('WeatherService', 'reactron-openweathermap');
    if (weatherService) {
      weatherService.getFiveDaysForecast({ zip: this.props.location.zip, cityName: this.props.location.cityName })
        .then((response: any) => this.setState({ weatherForecast: response }));
    }
  }

  /* <DynamicSVG>
      {bounds => this.renderFrame(bounds)}
    </DynamicSVG> */

  // private renderFrame(bounds: ClientRect) {
  //   const stroke = 5;

  //   const points: IPosition[] = [
  //     { x: bounds.width - stroke, y: stroke },
  //     { x: stroke, y: stroke },
  //     { x: stroke, y: bounds.height - stroke },
  //     { x: bounds.width - 77, y: bounds.height - stroke },
  //     { x: bounds.width - 47, y: bounds.height - 30 },
  //     { x: bounds.width - stroke, y: bounds.height - 30 },
  //   ];

  //   return (
  //     <React.Fragment>
  //       <SVGShape path={points} stroke="#379" strokeSize={stroke} fill="#444" />
  //       <CircuitBoard />
  //     </React.Fragment>
  //   );
  // }

  private renderDate() {
    const timezone = this.context.backendService.settings.get().timezone;
    const m = moment().tz(timezone);
    const dayOfWeek = m.format('dddd');
    const month = m.format("MMM");
    const day = m.format("Do");

    return (
      <div className={styles['date']}>
        <div className={styles['dayOfWeek']}>{dayOfWeek}</div>
        <div className={styles['monthAndDay']}>
          <span className={styles['month']}>{month}</span> <span>{day}</span>
        </div>
        <div className={styles['block4']} />
        <div className={styles['block3']} />
        <div className={styles['block2']} />
        <div className={styles['block1']} />
      </div>
    );
  }

  private renderTime() {
    const timezone = this.context.backendService.settings.get().timezone;
    return (
      <div className={styles['time']}>
        <span className={styles['label']}>TIME</span>
        <span className={styles['value']}><DigitalClock timezone={timezone} /></span>
      </div>
    );
  }

  private renderLocation() {
    return (
      <div className={styles['location']}>
        <span className={styles['label']}>LOCATION</span>
        <span className={styles['value']}>{this.state.weatherForecast && this.state.weatherForecast.city.name}</span>
      </div>
    );
  }

  private renderInfoItems() {
    const items = this.props.infoItems.map((info, index) => this.renderInfoItem(info, index));
    return (
      <div className={styles['infos']}>
        {items}
      </div>
    );
  }

  private renderInfoItem(info: InfoItemType, index: number) {
    const condition: IWeatherCondition = this.state.weatherForecast && this.state.weatherForecast.list[0] ||
      { temp: 0, clouds: 0, humidity: 0, pressure: 1000, rain: 0 } as IWeatherCondition;

    let infoProps: IInfoItemProps;

    switch (info) {
      case 'temp':
        infoProps = {
          title: 'Temp',
          value: condition.temp,
          circleContent: this.props.units === 'metric' ? '°C' : '°F',
          circleStart: 90,
          circlePercent: (100 / 40) * condition.temp
        };
        break;
      case 'rain':
        const maxRain = 10;
        const rainPercent = (100 / maxRain) * condition.rain;

        infoProps = {
          title: 'rain',
          value: condition.rain,
          circleContent: 'mm',
          circleStart: 90,
          circlePercent: rainPercent
        };
        break;
      case 'pressure':
        const minPressure = 900;
        const maxPressure = 1100;
        const pressurePercent = (100 / (maxPressure - minPressure)) * (condition.pressure - minPressure);

        infoProps = {
          title: 'Pressure',
          value: condition.pressure,
          circleContent: 'hPa',
          circleStart: 90,
          circlePercent: pressurePercent
        };
        break;
      case 'clouds':
        infoProps = {
          title: 'Clouds',
          value: condition.clouds,
          circleContent: '%',
          circleStart: 90,
          circlePercent: condition.clouds
        };
        break;
      case 'humidity':
        infoProps = {
          title: 'Humidity',
          value: condition.humidity,
          circleContent: '%',
          circleStart: 90,
          circlePercent: condition.humidity
        };
        break;
      case 'wind':
        infoProps = {
          title: 'Wind',
          value: condition.wind_speed,
          circleContent: this.props.units === 'metric' ? 'km/h' : 'mph',
          circleStart: 88 + condition.wind_deg,
          circlePercent: 4
        };
        break;
      default:
        return 'unknown';
    }

    return (<InfoItem key={index} {...infoProps} />);
  }

  private renderWeekCalendar() {
    return (
      <div className={styles['week']}>
        Week
      </div>
    );
  }

  public render() {
    return (
      <section className={styles['Dashboard']}>
        <div className={styles['leftLine']} />
        {this.renderDate()}
        {this.renderTime()}
        {this.renderLocation()}
        {this.renderInfoItems()}
        {this.renderWeekCalendar()}
        <div className={styles['content']}>
          {this.props.contentId && this.context.renderComponent({ id: this.props.contentId })}
        </div>
      </section>
    );
  }
}