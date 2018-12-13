import { IReactronService, IReactronServiceContext, IWebComponentOptions, IWebPageOptions } from '@schirkan/reactron-interfaces';

export class DashboardService implements IReactronService {
  public async start(context: IReactronServiceContext): Promise<void> {
    console.log('DashboardService.start');

    const component: IWebComponentOptions = {
      id: 'scifi-dashboard',
      componentName: 'Dashboard',
      moduleName: 'reactron-scifi-dashboard',
      options: {}
    };

    // register component
    const components = context.backendService.webComponentsManager.getAll();
    if (!components.find(x => x.id === component.id)) {
      context.backendService.webComponentsManager.createOrUpdate(component);
    }

    const page: IWebPageOptions = {
      id: 'scifi-dashboard-page',
      title: 'Scifi Dashboard',
      path: '/dashboard',
      webComponentId: 'scifi-dashboard',
      style: {}
    };

    // register page
    const pages = context.backendService.webPageManager.getAll();
    if (!pages.find(x => x.id === page.id)) {

      context.backendService.webPageManager.createOrUpdate(page);

      // set start page
      const settings = context.backendService.settings.get();
      settings.startupPath = page.path;
      context.backendService.settings.set(settings);
    }
  }
}