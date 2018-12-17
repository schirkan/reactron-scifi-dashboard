import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import moment from 'moment';
import numeral from 'numeral';
import * as React from 'react';
import { IWeatherCondition, IWeatherForecast } from 'reactron-openweathermap/src/server';
import { IWeatherInfoItemProps, WeatherInfoItem } from './IWeatherInfoItemProps';

import styles from './WeatherInfo.scss';
// tslint:disable:no-string-literal

export interface IWeatherInfoProps {
  context: IReactronComponentContext;
  weatherForecast?: IWeatherForecast;
  timezone: string;
}

export class WeatherInfo extends React.Component<IWeatherInfoProps> {

  public componentDidMount() {
    // 
  }

  public componentWillUnmount() {
    // 
  }

  private renderItem(condition: IWeatherCondition, lastItem: IWeatherCondition | undefined) {
    const weatherIcon = this.props.context.renderComponent({
      moduleName: 'reactron-openweathermap',
      componentName: 'WeatherIcon',
      options: { weatherId: condition.weather_id },
      className: styles['weatherIcon']
    });

    const date = moment(condition.dt * 1000).tz(this.props.timezone);
    let valueTop = date.format('L');
    if (lastItem) {
      const lastDate = moment(lastItem.dt * 1000).tz(this.props.timezone);
      if (date.dayOfYear() === lastDate.dayOfYear()) {
        valueTop = '';
      }
    }

    const data: IWeatherInfoItemProps = {
      valueBottom: condition.weather_description,
      valueLeftBottom: numeral(condition.temp).format('0.0'),
      valueLeftTop: date.hour(),
      valueRight: weatherIcon,
      valueTop,
    };

    return (<WeatherInfoItem {...data} key={condition.dt} />);
  }

  private renderItems() {
    if (!this.props.weatherForecast) {
      return null;
    }
    let lastItem: IWeatherCondition | undefined;
    return this.props.weatherForecast.list.slice(0, 10).map(item => {
      const result = this.renderItem(item, lastItem)
      lastItem = item;
      return result;
    });
  }

  public render() {
    return (
      <section className={styles['WeatherInfo']}>
        {this.renderItems()}
      </section>
    );
  }
}
