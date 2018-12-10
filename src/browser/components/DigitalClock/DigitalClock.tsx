import moment from 'moment';
import * as React from 'react';

export interface IDigitalClockProps{
  timezone: string;
}

export class DigitalClock extends React.Component<IDigitalClockProps> {
  private timer: number;

  public componentDidMount() {
    this.timer = window.setInterval(() => this.forceUpdate(), 60000);
  }

  public componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  public render() {
    const time = moment().tz(this.props.timezone);
    return time.format('LT');
  }
}
