import { IReactronService, IReactronServiceContext, IWebComponentOptions, IWebPageOptions } from '@schirkan/reactron-interfaces';

export class DashboardService implements IReactronService {
  public async start(context: IReactronServiceContext): Promise<void> {
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
      options: { location: { cityName: 'New York' } }
    };

    // register component
    const components = await context.services.components.getWebComponentOptions();
    if (!components.find(x => x.id === component.id)) {
      await context.services.components.setWebComponentOptions(component);
    }

    // register page
    const pages = await context.services.pages.getWebPages();
    if (!pages.find(x => x.id === page.id)) {
      await context.services.pages.setWebPage(page);

      // set start page
      const settings =  {...context.settings};
      settings.startupPath = page.path;
      await context.services.application.setSettings(settings);
    }
  }
}