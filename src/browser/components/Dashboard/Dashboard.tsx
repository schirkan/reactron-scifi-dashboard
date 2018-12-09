import { IReactronComponentContext } from '@schirkan/reactron-interfaces';
import moment from 'moment';
import * as React from 'react';
import { IInfoItemProps, InfoItem } from '../InfoItem/InfoItem';
import { InfoItemType } from '../InfoItem/InfoItemType';

import styles from './Dashboard.scss';
// tslint:disable:no-string-literal

export interface IDashboardProps {
  hour24: boolean;
  units: 'metric' | 'imperial';
  location: { cityName: string, zip: string }
  infoItems: InfoItemType[];
  contentId: string;
}

export class Dashboard extends React.Component<IDashboardProps> {
  public context: IReactronComponentContext;

  constructor(props: IDashboardProps) {
    super(props);
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
    // TODO
    moment.locale('de');
    moment.locale('de-de');
    const m = moment();
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
    return (
      <div className={styles['time']}>
        <span className={styles['label']}>TIME</span>
        <span className={styles['value']}>17:15</span>
      </div>
    );
  }
  private renderLocation() {
    return (
      <div className={styles['location']}>
        <span className={styles['label']}>LOCATION</span>
        <span className={styles['value']}>Düsseldorf</span>
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

  // export type InfoItemType = 'temp' | 'rain' | 'pressure' | 'clouds' | 'humidity' | 'wind';

  private renderInfoItem(info: InfoItemType, index: number) {
    const condition = { temp: 5, clounds: 76 };

    let infoProps: IInfoItemProps;

    switch (info) {
      case 'temp':
        infoProps = {
          title: 'Temp',
          value: condition.temp,
          circleContent: this.props.units === 'metric' ? '°C' : '°F',
          circleStart: 0,
          circleEnd: 40 - condition.temp
        };
        break;
      case 'rain':
        infoProps = {
          title: 'rain',
          value: condition.clounds,
          circleContent: 'mm',
          circleStart: 0,
          circleEnd: 300
        };
        break;
      case 'pressure':
        infoProps = {
          title: 'Pressure',
          value: condition.clounds,
          circleContent: 'hPa',
          circleStart: 0,
          circleEnd: 300
        };
        break;
      case 'clouds':
        infoProps = {
          title: 'Clouds',
          value: condition.clounds,
          circleContent: '%',
          circleStart: 0,
          circleEnd: 300
        };
        break;
      case 'humidity':
        infoProps = {
          title: 'Humidity',
          value: condition.clounds,
          circleContent: '%',
          circleStart: 0,
          circleEnd: 300
        };
        break;
      case 'wind':
        infoProps = {
          title: 'Wind',
          value: condition.clounds,
          circleContent: this.props.units === 'metric' ? 'km/h' : 'mph',
          circleStart: 0,
          circleEnd: 300
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
