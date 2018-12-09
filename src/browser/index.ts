import { IInputComponentProps, IReactronComponentDefinition } from '@schirkan/reactron-interfaces';
import { Dashboard } from './components/Dashboard/Dashboard';

export const components: IReactronComponentDefinition[] = [{
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
    inputControl: (props: IInputComponentProps) => {
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
}];

export * from './components/Dashboard/Dashboard';