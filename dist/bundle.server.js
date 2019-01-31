'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

class DashboardService {
    start(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = {
                id: 'scifi-dashboard-page',
                title: 'Scifi Dashboard',
                path: '/dashboard',
                webComponentId: 'scifi-dashboard',
                style: {}
            };
            const component = {
                id: 'scifi-dashboard',
                parentId: 'scifi-dashboard-page',
                componentName: 'Dashboard',
                moduleName: 'reactron-scifi-dashboard',
                options: { location: { cityName: 'New York' } }
            };
            // register component
            const components = yield context.services.components.getAll();
            if (!components.find(x => x.id === component.id)) {
                yield context.services.components.createOrUpdate(component);
            }
            // register page
            const pages = yield context.services.pages.getAll();
            if (!pages.find(x => x.id === page.id)) {
                yield context.services.pages.createOrUpdate(page);
                // set start page
                const settings = Object.assign({}, context.settings);
                settings.startupPath = page.path;
                yield context.services.application.setSettings(settings);
            }
        });
    }
}

const services = [{
        name: 'ScifiDashboardService',
        displayName: 'Scifi-Dashboard Service',
        description: 'Registers Dashboard page on startup',
        service: DashboardService
    }];

exports.services = services;
//# sourceMappingURL=bundle.server.js.map
