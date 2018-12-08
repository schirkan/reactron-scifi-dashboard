System.register(['react'], function (exports, module) {
    'use strict';
    var createElement, Component;
    return {
        setters: [function (module) {
            createElement = module.createElement;
            Component = module.Component;
        }],
        execute: function () {

            /*! *****************************************************************************
            Copyright (c) Microsoft Corporation. All rights reserved.
            Licensed under the Apache License, Version 2.0 (the "License"); you may not use
            this file except in compliance with the License. You may obtain a copy of the
            License at http://www.apache.org/licenses/LICENSE-2.0

            THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
            KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
            WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
            MERCHANTABLITY OR NON-INFRINGEMENT.

            See the Apache Version 2.0 License for specific language governing permissions
            and limitations under the License.
            ***************************************************************************** */
            /* global Reflect, Promise */

            var extendStatics = function(d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };

            function __extends(d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }

            /**
             * Returns a function, that, as long as it continues to be invoked, will not
             * be triggered. The function will be called after it stops being called for
             * N milliseconds. If `immediate` is passed, trigger the function on the
             * leading edge, instead of the trailing. The function also has a property 'clear' 
             * that is a function which will clear the timer to prevent previously scheduled executions. 
             *
             * @source underscore.js
             * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
             * @param {Function} function to wrap
             * @param {Number} timeout in ms (`100`)
             * @param {Boolean} whether to execute at the beginning (`false`)
             * @api public
             */
            function debounce(func, wait, immediate){
              var timeout, args, context, timestamp, result;
              if (null == wait) wait = 100;

              function later() {
                var last = Date.now() - timestamp;

                if (last < wait && last >= 0) {
                  timeout = setTimeout(later, wait - last);
                } else {
                  timeout = null;
                  if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                  }
                }
              }
              var debounced = function(){
                context = this;
                args = arguments;
                timestamp = Date.now();
                var callNow = immediate && !timeout;
                if (!timeout) timeout = setTimeout(later, wait);
                if (callNow) {
                  result = func.apply(context, args);
                  context = args = null;
                }

                return result;
              };

              debounced.clear = function() {
                if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
                }
              };
              
              debounced.flush = function() {
                if (timeout) {
                  result = func.apply(context, args);
                  context = args = null;
                  
                  clearTimeout(timeout);
                  timeout = null;
                }
              };

              return debounced;
            }
            // Adds compatibility for ES modules
            debounce.debounce = debounce;

            var debounce_1 = debounce;

            var style = {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            };
            // Measure's the element's bounding box and then renders children
            var MeasureAndRender = /** @class */ (function (_super) {
                __extends(MeasureAndRender, _super);
                function MeasureAndRender() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.state = { position: undefined };
                    _this.onWindowResize = debounce_1(function () { return _this.measure(); }, 100);
                    return _this;
                }
                MeasureAndRender.prototype.componentDidMount = function () {
                    this.measure();
                    window.addEventListener("resize", this.onWindowResize);
                };
                MeasureAndRender.prototype.componentWillUnmount = function () {
                    window.removeEventListener("resize", this.onWindowResize);
                };
                MeasureAndRender.prototype.measure = function () {
                    if (this.el) {
                        this.setState({ position: this.el.getBoundingClientRect() });
                    }
                };
                MeasureAndRender.prototype.render = function () {
                    var _this = this;
                    return (createElement("div", { style: style, ref: function (node) { return _this.el = node; } }, this.state.position && this.props.children(this.state.position)));
                };
                return MeasureAndRender;
            }(Component));

            var styles = {
                position: "absolute",
                width: "100%",
                height: "100%"
            };
            var DynamicSVG = /** @class */ (function (_super) {
                __extends(DynamicSVG, _super);
                function DynamicSVG() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DynamicSVG.prototype.renderSVG = function (bounds) {
                    return (createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg", style: styles, viewBox: '0 0 ' + bounds.width + ' ' + bounds.height, preserveAspectRatio: "none" }, this.props.children(bounds)));
                };
                DynamicSVG.prototype.render = function () {
                    var _this = this;
                    return (createElement(MeasureAndRender, null, function (bounds) { return _this.renderSVG(bounds); }));
                };
                return DynamicSVG;
            }(Component));

            var SVGShape = /** @class */ (function (_super) {
                __extends(SVGShape, _super);
                function SVGShape(props) {
                    var _this = _super.call(this, props) || this;
                    _this.state = {
                        pathString: _this.getPathString(_this.props.path)
                    };
                    return _this;
                }
                SVGShape.prototype.componentDidUpdate = function (prevProps, prevState) {
                    var pathString = this.getPathString(this.props.path);
                    if (prevState.pathString !== pathString) {
                        this.setState({ pathString: pathString });
                    }
                };
                SVGShape.prototype.getPathString = function (points) {
                    var path = '';
                    points.forEach(function (p, index) {
                        path += (index ? ' L' : ' M') + p.x + ',' + p.y;
                    });
                    path += ' Z';
                    return path;
                };
                SVGShape.prototype.render = function () {
                    return (createElement("g", { 
                        // id="100-by-exact"
                        stroke: this.props.stroke, strokeWidth: this.props.strokeSize },
                        createElement("path", { vectorEffect: "non-scaling-stroke", fill: this.props.fill, d: this.state.pathString })));
                };
                return SVGShape;
            }(Component));

            function styleInject(css, ref) {
              if ( ref === void 0 ) ref = {};
              var insertAt = ref.insertAt;

              if (!css || typeof document === 'undefined') { return; }

              var head = document.head || document.getElementsByTagName('head')[0];
              var style = document.createElement('style');
              style.type = 'text/css';

              if (insertAt === 'top') {
                if (head.firstChild) {
                  head.insertBefore(style, head.firstChild);
                } else {
                  head.appendChild(style);
                }
              } else {
                head.appendChild(style);
              }

              if (style.styleSheet) {
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
            }

            var css = "";
            var styles$1 = {};
            styleInject(css);

            var Dashboard = exports('Dashboard', /** @class */ (function (_super) {
                __extends(Dashboard, _super);
                function Dashboard(props) {
                    return _super.call(this, props) || this;
                }
                Dashboard.prototype.renderFrame = function (bounds) {
                    var stroke = 5;
                    var points = [
                        { x: bounds.width - stroke, y: stroke },
                        { x: stroke, y: stroke },
                        { x: stroke, y: bounds.height - stroke },
                        { x: bounds.width - 77, y: bounds.height - stroke },
                        { x: bounds.width - 47, y: bounds.height - 30 },
                        { x: bounds.width - stroke, y: bounds.height - 30 },
                    ];
                    return createElement(SVGShape, { path: points, stroke: "#379", strokeSize: stroke, fill: "#444" });
                };
                Dashboard.prototype.render = function () {
                    var _this = this;
                    return (createElement("section", { className: styles$1['Dashboard'] },
                        createElement(DynamicSVG, null, function (bounds) { return _this.renderFrame(bounds); })));
                };
                return Dashboard;
            }(Component)));

            var components = exports('components', [{
                    component: Dashboard,
                    name: 'Dashboard',
                    description: 'Dashboard',
                    displayName: 'Dashboard',
                    type: 'content',
                    fields: [{
                            name: 'test',
                            displayName: 'test',
                            valueType: 'boolean'
                        }],
                }]);

        }
    };
});
//# sourceMappingURL=bundle.browser.js.map
