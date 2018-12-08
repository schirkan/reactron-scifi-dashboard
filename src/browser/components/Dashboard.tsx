import * as React from 'react';
import { DynamicSVG } from './DynamicSVG/DynamicSVG';
import { IPosition, SVGShape } from './SVGShape/SVGShape';

import styles from './Dashboard.scss';
// tslint:disable:no-string-literal

export interface IDashboardProps {

}

export class Dashboard extends React.Component<IDashboardProps> {
  constructor(props: IDashboardProps) {
    super(props);

  }

  private renderFrame(bounds: ClientRect) {
    const stroke = 5;

    const points: IPosition[] = [
      { x: bounds.width - stroke, y: stroke},
      { x: stroke, y: stroke},
      { x: stroke, y: bounds.height - stroke},
      { x: bounds.width - 77, y: bounds.height - stroke},
      { x: bounds.width - 47, y: bounds.height - 30},
      { x: bounds.width - stroke, y: bounds.height - 30},
    ];

    return <SVGShape path={points} stroke="#379" strokeSize={stroke} fill="#444" />
  }

  public render() {
    return (
      <section className={styles['Dashboard']}>
        <DynamicSVG>
          {bounds => this.renderFrame(bounds)}
        </DynamicSVG>
      </section>
    );
  }
}
