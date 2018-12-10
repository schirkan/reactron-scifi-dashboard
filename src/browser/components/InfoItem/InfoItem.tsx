import * as React from 'react';

import styles from './InfoItem.scss';
// tslint:disable:no-string-literal

export interface IInfoItemProps {
  title: any;
  value: any;
  circleContent: any;
  circleStart: number;
  circlePercent: number;
}

export class InfoItem extends React.Component<IInfoItemProps> {
  constructor(props: IInfoItemProps) {
    super(props);
  }

  private renderCircle() {
    const dark = '#444';
    const light = '#fff';

    const percent = Math.min(this.props.circlePercent, 100);
    const angle = 360 * (percent / 100);
    let start = Math.min(this.props.circleStart, 360);
    if (angle < 0) {
      start += 180;
    }
    console.log({ percent, angle, start });

    let bg = '';

    if (percent > 50) {
      bg = `
      linear-gradient(${start + angle}deg, ${light} 50%, transparent 50%, transparent), 
      linear-gradient(${start + 180}deg, ${light} 50%, ${dark} 50%, ${dark})
      `;
    } else {
      bg = `
      linear-gradient(${start + angle + 180}deg, ${dark} 50%, transparent 50%, transparent), 
      linear-gradient(${start + 180}deg, ${light} 50%, ${dark} 50%, ${dark})
      `;
    }

    const circleStyle: React.CSSProperties = {
      backgroundImage: bg
    };

    const circleStyleContent: React.CSSProperties = {
      background: dark
    };

    return (
      <div className={styles['circle']} style={circleStyle}>
        <div className={styles['circleContent']} style={circleStyleContent}>
          {this.props.circleContent}
        </div>
      </div>
    );
  }

  public render() {
    return (
      <section className={styles['InfoItem']}>
        <div className={styles['title']} >{this.props.title}</div>
        <div className={styles['value']} >{this.props.value}</div>
        {this.renderCircle()}
      </section>
    );
  }
}
