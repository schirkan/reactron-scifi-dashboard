System.register(['moment', 'react'], function (exports, module) {
    'use strict';
    var moment, createElement, Component;
    return {
        setters: [function (module) {
            moment = module.default;
        }, function (module) {
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

            var __assign = function() {
                __assign = Object.assign || function __assign(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };

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

            var css = "section.InfoItem_InfoItem__2RPRN {\n  position: relative;\n  min-height: 90px;\n  margin-bottom: 2em;\n  color: white; }\n  section.InfoItem_InfoItem__2RPRN .InfoItem_title__3j7Pt {\n    text-transform: uppercase;\n    color: #ccc;\n    font-size: 25px;\n    margin-left: 120px;\n    padding-top: 5px; }\n  section.InfoItem_InfoItem__2RPRN .InfoItem_value__swja9 {\n    font-size: 50px;\n    font-weight: bold;\n    margin-left: 140px; }\n  section.InfoItem_InfoItem__2RPRN .InfoItem_circle__1j-mo {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 90px;\n    width: 90px;\n    border-radius: 50%; }\n    section.InfoItem_InfoItem__2RPRN .InfoItem_circle__1j-mo .InfoItem_circleContent__3EoPR {\n      position: relative;\n      height: 60px;\n      width: 60px;\n      border-radius: 50%;\n      background: #444;\n      border: 8px solid #000;\n      text-align: center;\n      line-height: 60px;\n      font-size: 25px;\n      left: 50%;\n      top: 50%;\n      transform: translateX(-50%) translateY(-50%);\n      color: white;\n      font-weight: bold; }\n";
            var styles = {"InfoItem":"InfoItem_InfoItem__2RPRN","title":"InfoItem_title__3j7Pt","value":"InfoItem_value__swja9","circle":"InfoItem_circle__1j-mo","circleContent":"InfoItem_circleContent__3EoPR"};
            styleInject(css);

            var InfoItem = /** @class */ (function (_super) {
                __extends(InfoItem, _super);
                function InfoItem(props) {
                    return _super.call(this, props) || this;
                }
                InfoItem.prototype.renderCircle = function () {
                    var dark = '#444';
                    var light = '#fff';
                    var percent = Math.min(this.props.circlePercent, 100);
                    var angle = 360 * (percent / 100);
                    var start = Math.min(this.props.circleStart, 360);
                    if (angle < 0) {
                        start += 180;
                    }
                    console.log({ percent: percent, angle: angle, start: start });
                    var bg = '';
                    if (percent > 50) {
                        bg = "\n      linear-gradient(" + (start + angle) + "deg, " + light + " 50%, transparent 50%, transparent), \n      linear-gradient(" + (start + 180) + "deg, " + light + " 50%, " + dark + " 50%, " + dark + ")\n      ";
                    }
                    else {
                        bg = "\n      linear-gradient(" + (start + angle + 180) + "deg, " + dark + " 50%, transparent 50%, transparent), \n      linear-gradient(" + (start + 180) + "deg, " + light + " 50%, " + dark + " 50%, " + dark + ")\n      ";
                    }
                    var circleStyle = {
                        backgroundImage: bg
                    };
                    var circleStyleContent = {
                        background: dark
                    };
                    return (createElement("div", { className: styles['circle'], style: circleStyle },
                        createElement("div", { className: styles['circleContent'], style: circleStyleContent }, this.props.circleContent)));
                };
                InfoItem.prototype.render = function () {
                    return (createElement("section", { className: styles['InfoItem'] },
                        createElement("div", { className: styles['title'] }, this.props.title),
                        createElement("div", { className: styles['value'] }, this.props.value),
                        this.renderCircle()));
                };
                return InfoItem;
            }(Component));

            var css$1 = "section.Dashboard_Dashboard__2t1GB {\n  height: 100%;\n  width: 100%;\n  background: #000;\n  color: white; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH {\n    position: absolute;\n    left: 40px;\n    top: 40px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_dayOfWeek__2kp-Y {\n      text-transform: uppercase;\n      font-size: 35px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_monthAndDay__1TIWe {\n      position: relative;\n      display: inline-block;\n      z-index: 1;\n      line-height: 60px;\n      background: #fff;\n      color: #000;\n      font-weight: bold;\n      font-size: 50px;\n      padding: 0 0.2em;\n      border-radius: 2px; }\n      section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_monthAndDay__1TIWe .Dashboard_month__nT_Mh {\n        text-transform: uppercase; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block1__1R9fJ,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block2__3qHsy,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block3__R7UUQ,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block4__2gXjX {\n      height: 60px;\n      transform: skew(-20deg) translateX(-35px);\n      float: right;\n      margin-right: 3px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block1__1R9fJ {\n      width: 50px;\n      background: #fff; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block2__3qHsy {\n      width: 35px;\n      background: #eee; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block3__R7UUQ {\n      width: 15px;\n      background: #ddd; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block4__2gXjX {\n      width: 10px;\n      background: #ccc; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm,\n  section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI {\n    position: absolute;\n    right: 40px;\n    font-size: 25px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm .Dashboard_label__1oDz7,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI .Dashboard_label__1oDz7 {\n      text-transform: uppercase;\n      font-weight: bold;\n      color: #ccc;\n      margin-right: 0.5em; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm {\n    top: 40px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI {\n    top: 70px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_infos__1Iiv6 {\n    position: absolute;\n    left: 50px;\n    top: 200px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_week__24XXp {\n    position: absolute;\n    left: 40px;\n    bottom: 40px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_content__2ay2Q {\n    position: absolute;\n    left: 400px;\n    top: 200px;\n    right: 40px;\n    bottom: 40px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_leftLine__1PY7o {\n    position: absolute;\n    top: 20px;\n    left: 17px;\n    bottom: 20px;\n    width: 3px;\n    background: #ccc;\n    border-radius: 2px; }\n";
            var styles$1 = {"Dashboard":"Dashboard_Dashboard__2t1GB","date":"Dashboard_date__2lNeH","dayOfWeek":"Dashboard_dayOfWeek__2kp-Y","monthAndDay":"Dashboard_monthAndDay__1TIWe","month":"Dashboard_month__nT_Mh","block1":"Dashboard_block1__1R9fJ","block2":"Dashboard_block2__3qHsy","block3":"Dashboard_block3__R7UUQ","block4":"Dashboard_block4__2gXjX","time":"Dashboard_time__1FMqm","location":"Dashboard_location__3xgOI","label":"Dashboard_label__1oDz7","infos":"Dashboard_infos__1Iiv6","week":"Dashboard_week__24XXp","content":"Dashboard_content__2ay2Q","leftLine":"Dashboard_leftLine__1PY7o"};
            styleInject(css$1);

            var Dashboard = exports('Dashboard', /** @class */ (function (_super) {
                __extends(Dashboard, _super);
                function Dashboard(props) {
                    return _super.call(this, props) || this;
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
                Dashboard.prototype.renderDate = function () {
                    // TODO
                    moment.locale('de');
                    moment.locale('de-de');
                    var m = moment();
                    var dayOfWeek = m.format('dddd');
                    var month = m.format("MMM");
                    var day = m.format("Do");
                    return (createElement("div", { className: styles$1['date'] },
                        createElement("div", { className: styles$1['dayOfWeek'] }, dayOfWeek),
                        createElement("div", { className: styles$1['monthAndDay'] },
                            createElement("span", { className: styles$1['month'] }, month),
                            " ",
                            createElement("span", null, day)),
                        createElement("div", { className: styles$1['block4'] }),
                        createElement("div", { className: styles$1['block3'] }),
                        createElement("div", { className: styles$1['block2'] }),
                        createElement("div", { className: styles$1['block1'] })));
                };
                Dashboard.prototype.renderTime = function () {
                    return (createElement("div", { className: styles$1['time'] },
                        createElement("span", { className: styles$1['label'] }, "TIME"),
                        createElement("span", { className: styles$1['value'] }, "17:15")));
                };
                Dashboard.prototype.renderLocation = function () {
                    return (createElement("div", { className: styles$1['location'] },
                        createElement("span", { className: styles$1['label'] }, "LOCATION"),
                        createElement("span", { className: styles$1['value'] }, "D\u00FCsseldorf")));
                };
                Dashboard.prototype.renderInfoItems = function () {
                    var _this = this;
                    var items = this.props.infoItems.map(function (info, index) { return _this.renderInfoItem(info, index); });
                    return (createElement("div", { className: styles$1['infos'] }, items));
                };
                // export type InfoItemType = 'temp' | 'rain' | 'pressure' | 'clouds' | 'humidity' | 'wind';
                Dashboard.prototype.renderInfoItem = function (info, index) {
                    var condition = { temp: -5, clounds: 85, humidity: 76, pressure: 1018, rain: 2.5 };
                    var infoProps;
                    switch (info) {
                        case 'temp':
                            infoProps = {
                                title: 'Temp',
                                value: condition.temp,
                                circleContent: this.props.units === 'metric' ? '°C' : '°F',
                                circleStart: 90,
                                circlePercent: (100 / 40) * condition.temp
                            };
                            break;
                        case 'rain':
                            var maxRain = 10;
                            var rainPercent = (100 / maxRain) * condition.rain;
                            infoProps = {
                                title: 'rain',
                                value: condition.rain,
                                circleContent: 'mm',
                                circleStart: 90,
                                circlePercent: rainPercent
                            };
                            break;
                        case 'pressure':
                            var minPressure = 900;
                            var maxPressure = 1100;
                            var pressurePercent = (100 / (maxPressure - minPressure)) * (condition.pressure - minPressure);
                            infoProps = {
                                title: 'Pressure',
                                value: condition.pressure,
                                circleContent: 'hPa',
                                circleStart: 90,
                                circlePercent: pressurePercent
                            };
                            break;
                        case 'clouds':
                            infoProps = {
                                title: 'Clouds',
                                value: condition.clounds,
                                circleContent: '%',
                                circleStart: 90,
                                circlePercent: condition.clounds
                            };
                            break;
                        case 'humidity':
                            infoProps = {
                                title: 'Humidity',
                                value: condition.humidity,
                                circleContent: '%',
                                circleStart: 90,
                                circlePercent: condition.humidity
                            };
                            break;
                        case 'wind':
                            infoProps = {
                                title: 'Wind',
                                value: 7,
                                circleContent: this.props.units === 'metric' ? 'km/h' : 'mph',
                                circleStart: 180,
                                circlePercent: 10
                            };
                            break;
                        default:
                            return 'unknown';
                    }
                    return (createElement(InfoItem, __assign({ key: index }, infoProps)));
                };
                Dashboard.prototype.renderWeekCalendar = function () {
                    return (createElement("div", { className: styles$1['week'] }, "Week"));
                };
                Dashboard.prototype.render = function () {
                    return (createElement("section", { className: styles$1['Dashboard'] },
                        createElement("div", { className: styles$1['leftLine'] }),
                        this.renderDate(),
                        this.renderTime(),
                        this.renderLocation(),
                        this.renderInfoItems(),
                        this.renderWeekCalendar(),
                        createElement("div", { className: styles$1['content'] }, this.props.contentId && this.context.renderComponent({ id: this.props.contentId }))));
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
                            name: 'hour24',
                            displayName: '24 hour',
                            valueType: 'boolean',
                            defaultValue: true
                        }, {
                            name: 'units',
                            displayName: 'Temperature unit',
                            valueType: 'string',
                            values: [
                                { value: 'metric', text: 'Celsius' },
                                { value: 'imperial', text: 'Fahrenheit' }
                            ],
                            defaultValue: 'metric'
                        }, {
                            name: 'location',
                            displayName: 'Location',
                            valueType: 'object',
                            fields: [{
                                    name: 'cityName',
                                    description: 'City Name',
                                    displayName: 'City Name',
                                    valueType: 'string'
                                }, {
                                    name: 'zip',
                                    description: 'Zip, Country Code',
                                    displayName: 'Zip, Country Code',
                                    valueType: 'string'
                                }],
                            inputControl: function (props) {
                                return props && props.value && (props.value.cityName || props.value.zip);
                            }
                        }, {
                            name: 'infoItems',
                            displayName: 'Infos',
                            valueType: 'string',
                            isArray: true,
                            values: [
                                { value: 'temp', text: 'Temperature' },
                                { value: 'rain', text: 'Rain' },
                                { value: 'pressure', text: 'Pressure' },
                                { value: 'clouds', text: 'Clouds' },
                                { value: 'humidity', text: 'Humidity' },
                                { value: 'wind', text: 'Wind' }
                            ]
                        }, {
                            name: 'contentId',
                            displayName: 'Content',
                            valueType: 'webComponent',
                        }]
                }]);

        }
    };
});
//# sourceMappingURL=bundle.browser.js.map
