import Admin from "../pages/Admin"
import Auth from "../pages/Auth"
import Basket from "../pages/Basket"
import DevicePage from "../pages/DevicePage"
import Shop from "../pages/Shop"

export enum AUTH_ROUTES {
    ADMIN_ROUTE = '/admin',
    BASKET_ROUTE = '/basket'
}

export enum PUBLIC_ROUTES {
    SHOP_ROUTE = '/',
    REGISTRATION_ROUTE = '/registration',
    LOGIN_ROUTE = '/login',
    DEVICE_ROUTE = '/device'
}

export const authRoutes = [
    {
        path: AUTH_ROUTES.ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: AUTH_ROUTES.BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: PUBLIC_ROUTES.SHOP_ROUTE,
        Component: Shop,
    },
    {
        path: PUBLIC_ROUTES.DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: PUBLIC_ROUTES.LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: PUBLIC_ROUTES.REGISTRATION_ROUTE,
        Component: Auth
    },
]