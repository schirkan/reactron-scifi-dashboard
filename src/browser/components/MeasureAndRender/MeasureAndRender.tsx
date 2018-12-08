import debounce from 'debounce';
import * as React from 'react';

export interface IMeasureAndRenderProps {
  children: (position: ClientRect | DOMRect) => any;
}

export interface IMeasureAndRenderState {
  position: ClientRect | DOMRect | undefined;
}

const style: React.CSSProperties = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

// Measure's the element's bounding box and then renders children
export class MeasureAndRender extends React.Component<IMeasureAndRenderProps, IMeasureAndRenderState> {
  public state: IMeasureAndRenderState = { position: undefined };
  private el: HTMLDivElement | null;
  private onWindowResize = debounce(() => this.measure(), 100);

  public componentDidMount() {
    this.measure();
    window.addEventListener("resize", this.onWindowResize);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  private measure() {
    if (this.el) {
      this.setState({ position: this.el.getBoundingClientRect() });
    }
  }

  public render() {
    return (
      <div style={style} ref={node => this.el = node}>
        {this.state.position && this.props.children(this.state.position)}
      </div>
    );
  }
}
