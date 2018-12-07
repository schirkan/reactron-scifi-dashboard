import * as React from 'react';

import styles from './Dashboard.scss';
// tslint:disable:no-string-literal

export interface IDashboardProps {

}

export class Dashboard extends React.Component<IDashboardProps> {
  constructor(props: IDashboardProps) {
    super(props);

  }

  public render() {
    return (
      <section className={styles['Dashboard']}>
        Dashboard
      </section>
    );
  }
}
