import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import moment from 'moment';
import * as React from 'react';
import { IWeatherForecast, IWeatherService } from 'reactron-openweathermap/src/server';
import { DigitalClock } from '../DigitalClock/DigitalClock';
import { InfoItem } from '../InfoItem/InfoItem';
import { InfoItemType } from '../InfoItem/InfoItemType';
import { WeatherInfo } from '../WeatherInfo/WeatherInfo';
import { getInfoItemData } from './getInfoItemData';

import styles from './Dashboard.scss';
// tslint:disable:no-string-literal

export interface IDashboardProps {
  location: { cityName: string, zip: string }
  infoItems: InfoItemType[];
  contentId: string;
}

interface IDashboardState {
  weatherForecast?: IWeatherForecast;
  units?: string;
}

export class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  public context: IReactronComponentContext;
  public static defaultProps: Partial<IDashboardProps> = {
    location: { cityName: '', zip: '' },
    infoItems: []
  }

  constructor(props: IDashboardProps) {
    super(props);

    this.state = {};
  }

  public async componentDidMount() {
    this.context.topics.subscribe('system-settings-updated', () => this.forceUpdate());

    if (this.props.location.zip || this.props.location.cityName) {
      const weatherService = this.context.getService<IWeatherService>('WeatherService', 'reactron-openweathermap');
      if (weatherService) {
        const weatherForecast = await weatherService.getFiveDaysForecast({ zip: this.props.location.zip, cityName: this.props.location.cityName });
        const options = weatherService.getOptions && await weatherService.getOptions();

        this.setState({
          weatherForecast,
          units: options && options.units || 'metric'
        });
      }
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
    const m = moment().tz(this.context.settings.timezone);
    const dayOfWeek = m.format('dddd');
    const month = m.format("MMM");
    const day = m.format("Do");

    const condition = this.state.weatherForecast && this.state.weatherForecast.conditions[0];
    const weatherId = condition && condition.weatherId;
    const night = condition && condition.weatherIcon.endsWith('n');

    const weatherIcon = this.context.renderComponent({
      moduleName: 'reactron-openweathermap',
      componentName: 'WeatherIcon',
      options: { weatherId, night },
      className: styles['weatherIcon']
    });

    return (
      <div className={styles['date']}>
        <div className={styles['dayOfWeek']}>{dayOfWeek}</div>
        <div className={styles['monthAndDay']}>
          <span className={styles['month']}>{month}</span> <span>{day}</span>
        </div>
        {weatherIcon}
        <div className={styles['block4']} />
        <div className={styles['block3']} />
        <div className={styles['block2']} />
        <div className={styles['block1']} />
      </div>
    );
  }

  private renderTime() {
    return (
      <div className={styles['time']}>
        <span className={styles['label']}>TIME</span>
        <span className={styles['value']}><DigitalClock timezone={this.context.settings.timezone} /></span>
      </div>
    );
  }

  private renderLocation() {
    return (
      <div className={styles['location']}>
        <span className={styles['label']}>LOCATION</span>
        <span className={styles['value']}>{this.state.weatherForecast && this.state.weatherForecast.location.name}</span>
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
    if (!this.state.weatherForecast || !this.state.units) {
      return null;
    }

    const condition = this.state.weatherForecast.conditions[0];
    const infoProps = getInfoItemData(info, this.state.units, condition);

    if (!infoProps) {
      return null;
    }
    return (<InfoItem key={index} {...infoProps} />);
  }

  private renderWeatherForecast() {
    return (
      <div className={styles['weatherForecast']}>
        <WeatherInfo timezone={this.context.settings.timezone} weatherForecast={this.state.weatherForecast} context={this.context} />
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
        {this.renderWeatherForecast()}
        <div className={styles['content']}>
          {this.props.contentId && this.context.renderComponent({ id: this.props.contentId })}
        </div>
      </section>
    );
  }
}
