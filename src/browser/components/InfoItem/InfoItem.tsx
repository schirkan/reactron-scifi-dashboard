import * as React from 'react';

import styles from './InfoItem.scss';
// tslint:disable:no-string-literal

export interface IInfoItemProps {
  title: any;
  value: any;
  circleContent: any;
  circleStart: number;
  circleEnd: number;
}

export class InfoItem extends React.Component<IInfoItemProps> {
  constructor(props: IInfoItemProps) {
    super(props);
  }

  private renderCircle() {
    const dark = '#444';
    const light = '#fff';
    const bg = `
    linear-gradient(${this.props.circleStart}deg, ${dark} 50%, transparent 50%, transparent), 
    linear-gradient(${this.props.circleEnd}deg, ${light} 50%, ${dark} 50%, ${dark})
    `;

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
