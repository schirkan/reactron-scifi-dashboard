import * as React from 'react';

import styles from './WeatherInfoItem.scss';
// tslint:disable:no-string-literal

export interface IWeatherInfoItemProps {
  valueTop?: any;
  valueLeftTop?: any;
  valueLeftBottom?: any;
  valueRight?: any;
  valueBottom?: any;
}

export class WeatherInfoItem extends React.Component<IWeatherInfoItemProps> {
  public render() {
    return (<div className={styles['WeatherInfoItem']}>
      <div className={styles['top']} hidden={!this.props.valueTop}>{this.props.valueTop}</div>
      <div className={styles['left-top']}><div>{this.props.valueLeftTop}</div></div>
      <div className={styles['left-bottom']}><div>{this.props.valueLeftBottom}</div></div>
      <div className={styles['right']}>{this.props.valueRight}</div>
      <div className={styles['bottom']}>{this.props.valueBottom}</div>
    </div>);
  }
}
