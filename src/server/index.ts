import { IReactronServiceDefinition } from "@schirkan/reactron-interfaces";
import { DashboardService } from "./services/DashboardService";

export const services: IReactronServiceDefinition[] = [{
    name: 'ScifiDashboardService',
    displayName: 'Scifi-Dashboard Service',
    description: 'Registers Admin page on startup',
    service: DashboardService
}];