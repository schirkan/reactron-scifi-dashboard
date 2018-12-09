import * as React from 'react';

export interface IPosition {
  x: number;
  y: number;
}

export interface ISVGShapeProps {
  stroke?: any;
  strokeSize?: any;
  fill?: any;
  path: IPosition[];
}

export interface ISVGShapeState {
  pathString: string;
}

export class SVGShape extends React.Component<ISVGShapeProps, ISVGShapeState>{
  constructor(props: ISVGShapeProps) {
    super(props);

    this.state = {
      pathString: this.getPathString(this.props.path)
    };
  }

  public componentDidUpdate(prevProps: ISVGShapeProps, prevState: ISVGShapeState) {
    const pathString = this.getPathString(this.props.path);
    if (prevState.pathString !== pathString) {
      this.setState({ pathString });
    }
  }

  private getPathString(points: IPosition[]) {
    let path = '';
    points.forEach((p, index) => {
      path += (index ? ' L' : ' M') + p.x + ',' + p.y;
    });
    path += ' Z';
    return path;
  }

  public render() {
    return (
      <path
        vectorEffect="non-scaling-stroke"
        stroke-linejoin="round"
        stroke={this.props.stroke}
        strokeWidth={this.props.strokeSize}
        fill={this.props.fill}
        d={this.state.pathString}
      />
    );
  }
}
