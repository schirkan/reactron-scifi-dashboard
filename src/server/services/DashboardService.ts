import { IReactronService, IReactronServiceContext, IWebComponentOptions, IWebPageOptions } from '@schirkan/reactron-interfaces';

export class DashboardService implements IReactronService {
  public async start(context: IReactronServiceContext): Promise<void> {
    console.log('DashboardService.start');

    const page: IWebPageOptions = {
      id: 'scifi-dashboard-page',
      title: 'Scifi Dashboard',
      path: '/dashboard',
      webComponentId: 'scifi-dashboard',
      style: {}
    };

    const component: IWebComponentOptions = {
      id: 'scifi-dashboard',
      parentId: 'scifi-dashboard-page',
      componentName: 'Dashboard',
      moduleName: 'reactron-scifi-dashboard',
      options: {}
    };

    // register component
    const components = context.backendService.webComponentsManager.getAll();
    if (!components.find(x => x.id === component.id)) {
      context.backendService.webComponentsManager.createOrUpdate(component);
    }

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