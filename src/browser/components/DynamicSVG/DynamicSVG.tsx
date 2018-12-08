import * as React from 'react';
import { MeasureAndRender } from "../MeasureAndRender/MeasureAndRender";

export interface IDynamicSVGProps {
  children: (position: ClientRect | DOMRect) => any;
}

const styles: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%"
};

export class DynamicSVG extends React.Component<IDynamicSVGProps>{
  private renderSVG(bounds: ClientRect | DOMRect) {
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" style={styles}
        viewBox={'0 0 ' + bounds.width + ' ' + bounds.height} preserveAspectRatio="none">
        {this.props.children(bounds)}
      </svg>
    );
  }

  public render() {
    return (
      <MeasureAndRender>
        {bounds => this.renderSVG(bounds)}
      </MeasureAndRender>
    );
  }
}
