System.register(['@schirkan/reactron-interfaces', 'moment', 'react', 'numeral'], function (exports, module) {
    'use strict';
    var topicNames, moment, Component, createElement, numeral;
    return {
        setters: [function (module) {
            topicNames = module.topicNames;
        }, function (module) {
            moment = module.default;
        }, function (module) {
            Component = module.Component;
            createElement = module.createElement;
        }, function (module) {
            numeral = module.default;
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

            function __awaiter(thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                    function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            }

            class DigitalClock extends Component {
                componentDidMount() {
                    this.timer = window.setInterval(() => this.forceUpdate(), 60000);
                }
                componentWillUnmount() {
                    window.clearInterval(this.timer);
                }
                render() {
                    const time = moment().tz(this.props.timezone);
                    return time.format('LT');
                }
            }

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

            class InfoItem extends Component {
                constructor(props) {
                    super(props);
                }
                renderCircle() {
                    const dark = '#444';
                    const light = '#fff';
                    const percent = Math.min(this.props.circlePercent, 100);
                    const angle = 360 * (percent / 100);
                    let start = Math.min(this.props.circleStart, 360);
                    if (angle < 0) {
                        start += 180;
                    }
                    const circleStyle = {};
                    const circleStyleContent = { background: dark };
                    if (percent > 50) {
                        circleStyle.backgroundImage = `
        linear-gradient(${start + angle}deg, ${light} 50%, transparent 50%, transparent), 
        linear-gradient(${start + 180}deg, ${light} 50%, ${dark} 50%, ${dark})
      `;
                    }
                    else {
                        circleStyle.backgroundImage = `
        linear-gradient(${start + angle + 180}deg, ${dark} 50%, transparent 50%, transparent), 
        linear-gradient(${start + 180}deg, ${light} 50%, ${dark} 50%, ${dark})
      `;
                    }
                    return (createElement("div", { className: styles['circle'], style: circleStyle },
                        createElement("div", { className: styles['circleContent'], style: circleStyleContent }, this.props.circleContent)));
                }
                render() {
                    return (createElement("section", { className: styles['InfoItem'] },
                        createElement("div", { className: styles['title'] }, this.props.title),
                        createElement("div", { className: styles['value'] }, this.props.value),
                        this.renderCircle()));
                }
            }

            var css$1 = ".WeatherInfoItem_WeatherInfoItem__6gKjc {\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  box-sizing: border-box;\n  width: 130px;\n  height: 100px;\n  margin-right: -18px; }\n  .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_top__2jkvN {\n    position: absolute;\n    top: 0;\n    width: 110px;\n    line-height: 20px;\n    text-align: center;\n    font-size: 15px;\n    color: #000;\n    background: #ccc;\n    font-weight: bold;\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px; }\n  .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-top__3V6kY {\n    font-size: 1.2em;\n    line-height: 27px;\n    position: absolute;\n    left: 6px;\n    top: 22px;\n    width: 45px;\n    text-align: center; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-top__3V6kY > div {\n      position: relative; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-top__3V6kY:before {\n      content: \"\";\n      background: #444;\n      transform: skew(20deg);\n      right: 0;\n      top: 0;\n      position: absolute;\n      display: block;\n      width: 100%;\n      bottom: 0;\n      border-right: 1px solid #777; }\n  .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-bottom__MiGmY {\n    font-size: 1.2em;\n    line-height: 27px;\n    position: absolute;\n    left: 6px;\n    top: 51px;\n    width: 45px;\n    text-align: center; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-bottom__MiGmY > div {\n      position: relative; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_left-bottom__MiGmY:before {\n      content: \"\";\n      background: #444;\n      transform: skew(-20deg);\n      right: 0px;\n      top: 0;\n      position: absolute;\n      display: block;\n      width: 100%;\n      bottom: 0;\n      border-right: 1px solid #777; }\n  .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_right__2nlSj {\n    font-size: 2em;\n    line-height: 56px;\n    position: absolute;\n    right: 15px;\n    top: 22px;\n    width: 61px;\n    text-align: center; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_right__2nlSj > * {\n      position: relative;\n      z-index: 1; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_right__2nlSj:before {\n      content: \"\";\n      background: #444;\n      transform: skew(20deg);\n      right: 0;\n      top: 0;\n      position: absolute;\n      display: block;\n      width: 100%;\n      height: 50%;\n      border-right: 1px solid #777; }\n    .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_right__2nlSj:after {\n      content: \"\";\n      background: #444;\n      transform: skew(-20deg);\n      right: 0;\n      position: absolute;\n      display: block;\n      width: 100%;\n      bottom: 0;\n      z-index: 0;\n      height: 50%;\n      border-right: 1px solid #777; }\n  .WeatherInfoItem_WeatherInfoItem__6gKjc .WeatherInfoItem_bottom__2UkaX {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    width: 110px;\n    background: #333;\n    line-height: 20px;\n    text-align: center;\n    font-size: 14px;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    border-bottom-left-radius: 4px;\n    border-bottom-right-radius: 4px; }\n";
            var styles$1 = {"WeatherInfoItem":"WeatherInfoItem_WeatherInfoItem__6gKjc","top":"WeatherInfoItem_top__2jkvN","left-top":"WeatherInfoItem_left-top__3V6kY","left-bottom":"WeatherInfoItem_left-bottom__MiGmY","right":"WeatherInfoItem_right__2nlSj","bottom":"WeatherInfoItem_bottom__2UkaX"};
            styleInject(css$1);

            class WeatherInfoItem extends Component {
                render() {
                    return (createElement("div", { className: styles$1['WeatherInfoItem'] },
                        createElement("div", { className: styles$1['top'], hidden: !this.props.valueTop }, this.props.valueTop),
                        createElement("div", { className: styles$1['left-top'] },
                            createElement("div", null, this.props.valueLeftTop)),
                        createElement("div", { className: styles$1['left-bottom'] },
                            createElement("div", null, this.props.valueLeftBottom)),
                        createElement("div", { className: styles$1['right'] }, this.props.valueRight),
                        createElement("div", { className: styles$1['bottom'] }, this.props.valueBottom)));
                }
            }

            var css$2 = "section.WeatherInfo_WeatherInfo__1_2il {\n  position: relative; }\n";
            var styles$2 = {"WeatherInfo":"WeatherInfo_WeatherInfo__1_2il"};
            styleInject(css$2);

            class WeatherInfo extends Component {
                componentDidMount() {
                    // 
                }
                componentWillUnmount() {
                    // 
                }
                renderItem(condition, lastItem) {
                    const night = condition && condition.weatherIcon.endsWith('n');
                    const weatherIcon = this.props.context.renderComponent({
                        moduleName: 'reactron-openweathermap',
                        componentName: 'WeatherIcon',
                        options: { weatherId: condition.weatherId, night },
                        className: styles$2['weatherIcon']
                    });
                    const date = moment(condition.timestamp * 1000).tz(this.props.timezone);
                    let valueTop = date.format('L');
                    if (lastItem) {
                        const lastDate = moment(lastItem.timestamp * 1000).tz(this.props.timezone);
                        if (date.dayOfYear() === lastDate.dayOfYear()) {
                            valueTop = '';
                        }
                    }
                    const data = {
                        valueBottom: condition.weatherDescription,
                        valueLeftBottom: numeral(condition.temp).format('0.0'),
                        valueLeftTop: date.hour(),
                        valueRight: weatherIcon,
                        valueTop,
                    };
                    return (createElement(WeatherInfoItem, Object.assign({}, data, { key: condition.timestamp })));
                }
                renderItems() {
                    if (!this.props.weatherForecast) {
                        return null;
                    }
                    let lastItem;
                    return this.props.weatherForecast.conditions.slice(0, 10).map(item => {
                        const result = this.renderItem(item, lastItem);
                        lastItem = item;
                        return result;
                    });
                }
                render() {
                    return (createElement("section", { className: styles$2['WeatherInfo'] }, this.renderItems()));
                }
            }

            const getInfoItemData = (info, units, condition) => {
                switch (info) {
                    case 'temp':
                        let tempCelsius = 0;
                        let tempUnit = '';
                        if (units === 'metric') {
                            tempUnit = '°C';
                            tempCelsius = condition.temp;
                        }
                        else if (units === 'imperial') {
                            tempUnit = '°F';
                            tempCelsius = (condition.temp - 32) / 1.8;
                        }
                        else {
                            tempUnit = '°K';
                            tempCelsius = condition.temp - 273.15;
                        }
                        return {
                            title: 'Temp',
                            value: numeral(condition.temp).format('0.0'),
                            circleContent: tempUnit,
                            circleStart: 90,
                            circlePercent: (100 / 40) * tempCelsius
                        };
                    case 'rain':
                        const maxRain = 10;
                        const rainPercent = (100 / maxRain) * condition.rain;
                        return {
                            title: 'rain',
                            value: numeral(condition.rain).format('0.0'),
                            circleContent: 'mm',
                            circleStart: 90,
                            circlePercent: rainPercent
                        };
                    case 'pressure':
                        const minPressure = 900;
                        const maxPressure = 1100;
                        const pressurePercent = (100 / (maxPressure - minPressure)) * (condition.pressure - minPressure);
                        return {
                            title: 'Pressure',
                            value: numeral(condition.pressure).format('0'),
                            circleContent: 'hPa',
                            circleStart: 90,
                            circlePercent: pressurePercent
                        };
                    case 'clouds':
                        return {
                            title: 'Clouds',
                            value: numeral(condition.clouds).format('0'),
                            circleContent: '%',
                            circleStart: 90,
                            circlePercent: condition.clouds
                        };
                    case 'humidity':
                        return {
                            title: 'Humidity',
                            value: numeral(condition.humidity).format('0'),
                            circleContent: '%',
                            circleStart: 90,
                            circlePercent: condition.humidity
                        };
                    case 'wind':
                        return {
                            title: 'Wind',
                            value: numeral(condition.windSpeed).format('0.0'),
                            circleContent: units === 'imperial' ? 'mph' : 'km/h',
                            circleStart: 88 + condition.windDegree,
                            circlePercent: 4
                        };
                }
                return undefined;
            };

            var css$3 = "section.Dashboard_Dashboard__2t1GB {\n  height: 100%;\n  width: 100%;\n  background: #000;\n  color: white; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH {\n    position: absolute;\n    left: 40px;\n    top: 40px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_dayOfWeek__2kp-Y {\n      text-transform: uppercase;\n      font-size: 35px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_monthAndDay__1TIWe {\n      position: relative;\n      display: inline-block;\n      z-index: 1;\n      line-height: 60px;\n      background: #fff;\n      color: #000;\n      font-weight: bold;\n      font-size: 50px;\n      padding: 0 0.2em;\n      border-radius: 2px; }\n      section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_monthAndDay__1TIWe .Dashboard_month__nT_Mh {\n        text-transform: uppercase; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block1__1R9fJ,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block2__3qHsy,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block3__R7UUQ,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block4__2gXjX {\n      height: 60px;\n      transform: skew(-20deg) translateX(-35px);\n      float: right;\n      margin-right: 3px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block1__1R9fJ {\n      width: 50px;\n      background: #fff; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block2__3qHsy {\n      width: 35px;\n      background: #eee; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block3__R7UUQ {\n      width: 15px;\n      background: #ddd; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_block4__2gXjX {\n      width: 10px;\n      background: #ccc; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_date__2lNeH .Dashboard_weatherIcon__2DKkm {\n      width: auto;\n      float: right;\n      font-size: 60px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm,\n  section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI {\n    position: absolute;\n    right: 40px;\n    font-size: 25px; }\n    section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm .Dashboard_label__1oDz7,\n    section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI .Dashboard_label__1oDz7 {\n      text-transform: uppercase;\n      font-weight: bold;\n      color: #ccc;\n      margin-right: 0.5em; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_time__1FMqm {\n    top: 40px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_location__3xgOI {\n    top: 70px; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_infos__1Iiv6 {\n    position: absolute;\n    left: 50px;\n    width: 340px;\n    top: 200px;\n    bottom: 40px;\n    overflow: auto; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_weatherForecast__1fzIt {\n    position: absolute;\n    left: 40px;\n    right: 40px;\n    bottom: 40px;\n    height: 100px;\n    overflow: hidden; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_content__2ay2Q {\n    position: absolute;\n    left: 400px;\n    top: 200px;\n    right: 40px;\n    bottom: 40px;\n    overflow: auto; }\n  section.Dashboard_Dashboard__2t1GB .Dashboard_leftLine__1PY7o {\n    position: absolute;\n    top: 20px;\n    left: 17px;\n    bottom: 20px;\n    width: 3px;\n    background: #ccc;\n    border-radius: 2px; }\n";
            var styles$3 = {"Dashboard":"Dashboard_Dashboard__2t1GB","date":"Dashboard_date__2lNeH","dayOfWeek":"Dashboard_dayOfWeek__2kp-Y","monthAndDay":"Dashboard_monthAndDay__1TIWe","month":"Dashboard_month__nT_Mh","block1":"Dashboard_block1__1R9fJ","block2":"Dashboard_block2__3qHsy","block3":"Dashboard_block3__R7UUQ","block4":"Dashboard_block4__2gXjX","weatherIcon":"Dashboard_weatherIcon__2DKkm","time":"Dashboard_time__1FMqm","location":"Dashboard_location__3xgOI","label":"Dashboard_label__1oDz7","infos":"Dashboard_infos__1Iiv6","weatherForecast":"Dashboard_weatherForecast__1fzIt","content":"Dashboard_content__2ay2Q","leftLine":"Dashboard_leftLine__1PY7o"};
            styleInject(css$3);

            class Dashboard extends Component {
                constructor(props) {
                    super(props);
                    this.state = {};
                    this.loadData = this.loadData.bind(this);
                }
                componentDidMount() {
                    this.context.topics.subscribe(topicNames.refresh, this.loadData);
                    this.loadData();
                }
                componentWillUnmount() {
                    this.context.topics.unsubscribe(topicNames.refresh, this.loadData);
                }
                componentDidUpdate(prevProps) {
                    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
                        this.loadData();
                    }
                }
                loadData() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (this.props.location.zip || this.props.location.cityName) {
                            const weatherService = yield this.context.getService('WeatherService', 'reactron-openweathermap');
                            if (weatherService) {
                                const weatherForecast = yield weatherService.getFiveDaysForecast({ zip: this.props.location.zip, cityName: this.props.location.cityName });
                                const options = yield weatherService.getOptions();
                                this.setState({
                                    weatherForecast,
                                    units: options && options.units || 'metric'
                                });
                            }
                        }
                    });
                }
                renderDate() {
                    const m = moment().tz(this.context.settings.timezone);
                    const dayOfWeek = m.format('dddd');
                    const month = m.format("MMM");
                    const day = m.format("Do");
                    const condition = this.state.weatherForecast && this.state.weatherForecast.conditions[0];
                    const weatherId = condition && condition.weatherId;
                    const night = condition && condition.weatherIcon.endsWith('n');
                    const weatherIcon = this.context.renderComponent({
                        moduleName: 'reactron-openweathermap',
                        componentName: 'WeatherIcon',
                        options: { weatherId, night },
                        className: styles$3['weatherIcon']
                    });
                    return (createElement("div", { className: styles$3['date'] },
                        createElement("div", { className: styles$3['dayOfWeek'] }, dayOfWeek),
                        createElement("div", { className: styles$3['monthAndDay'] },
                            createElement("span", { className: styles$3['month'] }, month),
                            " ",
                            createElement("span", null, day)),
                        weatherIcon,
                        createElement("div", { className: styles$3['block4'] }),
                        createElement("div", { className: styles$3['block3'] }),
                        createElement("div", { className: styles$3['block2'] }),
                        createElement("div", { className: styles$3['block1'] })));
                }
                renderTime() {
                    return (createElement("div", { className: styles$3['time'] },
                        createElement("span", { className: styles$3['label'] }, "TIME"),
                        createElement("span", { className: styles$3['value'] },
                            createElement(DigitalClock, { timezone: this.context.settings.timezone }))));
                }
                renderLocation() {
                    return (createElement("div", { className: styles$3['location'] },
                        createElement("span", { className: styles$3['label'] }, "LOCATION"),
                        createElement("span", { className: styles$3['value'] }, this.state.weatherForecast && this.state.weatherForecast.location.name)));
                }
                renderInfoItems() {
                    const items = this.props.infoItems.map((info, index) => this.renderInfoItem(info, index));
                    return (createElement("div", { className: styles$3['infos'] }, items));
                }
                renderInfoItem(info, index) {
                    if (!this.state.weatherForecast || !this.state.units) {
                        return null;
                    }
                    const condition = this.state.weatherForecast.conditions[0];
                    const infoProps = getInfoItemData(info, this.state.units, condition);
                    if (!infoProps) {
                        return null;
                    }
                    return createElement(InfoItem, Object.assign({ key: index }, infoProps));
                }
                renderWeatherForecast() {
                    return (createElement("div", { className: styles$3['weatherForecast'] },
                        createElement(WeatherInfo, { timezone: this.context.settings.timezone, weatherForecast: this.state.weatherForecast, context: this.context })));
                }
                render() {
                    return (createElement("section", { className: styles$3['Dashboard'] },
                        createElement("div", { className: styles$3['leftLine'] }),
                        this.renderDate(),
                        this.renderTime(),
                        this.renderLocation(),
                        this.renderInfoItems(),
                        this.renderWeatherForecast(),
                        createElement("div", { className: styles$3['content'] }, this.props.contentId && this.context.renderComponent({ id: this.props.contentId }))));
                }
            } exports('Dashboard', Dashboard);
            Dashboard.defaultProps = {
                location: { cityName: '', zip: '' },
                infoItems: []
            };

            const locationInput = (props) => {
                return props && props.value && (props.value.cityName || props.value.zip) ||
                    (createElement("span", { style: { color: 'red' } }, "missing"));
            };

            const components = exports('components', [{
                    component: Dashboard,
                    name: 'Dashboard',
                    description: 'Dashboard',
                    displayName: 'Dashboard',
                    type: 'content',
                    fields: [{
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
                            inputControl: locationInput
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
