import { IReactronComponentDefinition } from '@schirkan/reactron-interfaces';
import { Dashboard } from './components/Dashboard/Dashboard';
import { locationInput } from './components/locationInput';

export const components: IReactronComponentDefinition[] = [{
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
}];

export * from './components/Dashboard/Dashboard';