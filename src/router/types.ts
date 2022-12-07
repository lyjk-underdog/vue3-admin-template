import 'vue-router';
import type { IconClass } from '@/assets/icons/types';

declare module 'vue-router' {
    interface RouteMeta {
        icon?: IconClass;
        title?: string;
    }

    type customRouteRecordRaw = RouteRecordRaw & {
        name: RouteRecordName,
        children?: customRouteRecordRaw[]
    }
}

export const enum RouteRecordName {
    Index = 'IndexView',
    Error = 'ErrorView',
    Login = 'LoginView',
    Dashboard = 'DashboardView',
    About = 'AboutView'
}
