import { IReactronComponentDefinition } from '@schirkan/reactron-interfaces';
import { Dashboard } from './components/Dashboard';

export const components: IReactronComponentDefinition[] = [{
    component: Dashboard,
    name: 'Dashboard',
    description: 'Dashboard',
    displayName: 'Dashboard',
    type: 'content',
    fields: [],
}];

export * from './components/Dashboard';