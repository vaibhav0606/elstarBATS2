import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/Home')),
        authority: [],
    },
    {
        key: 'employeemaster',
        path: '/employee',
        component: React.lazy(() =>
            import('views/Master/EmployeeMaster/Employeemaster')
        ),
        authority: [],
    },
    {
        key: 'entitymaster',
        path: '/entity',
        component: React.lazy(() =>
            import('views/Master/EntityMaster/Entitymaster')
        ),
        authority: [],
    },
    {
        key: 'locationmaster',
        path: '/location',
        component: React.lazy(() =>
            import('views/Master/LocationMaster/Locationmaster')
        ),
        authority: [],
    },
    {
        key: 'departmentmaster',
        path: '/department',
        component: React.lazy(() =>
            import('views/Master/DepartmentMaster/Departmentmaster')
        ),
        authority: [],
    },
    {
        key: 'timezonemaster',
        path: '/timezone',
        component: React.lazy(() =>
            import('views/Master/TimeZoneMaster/TimeZonemaster')
        ),
        authority: [],
    },

    {
        key: 'zonemaster',
        path: '/zone',
        component: React.lazy(() =>
            import('views/Master/ZoneMaster/Zonemaster')
        ),
        authority: [],
    },

    {
        key: 'regionmaster',
        path: '/region',
        component: React.lazy(() =>
            import('views/Master/RegionMaster/RegionMaster')
        ),
        authority: [],
    },
    {
        key: 'languagemaster',
        path: '/language',
        component: React.lazy(() =>
            import('views/Master/LanguageMaster/Languagemaster')
        ),
        authority: [],
    },
    {
        key: 'modulemaster',
        path: '/module',
        component: React.lazy(() =>
            import('views/Master/ModuleMaster/Modulemaster')
        ),
        authority: [],
    },
    {
        key: 'submodulemaster',
        path: '/submodule',
        component: React.lazy(() =>
            import('views/Master/SubModuleMaster/SubModulemaster')
        ),
        authority: [],
    },
    {
        key: 'currencymaster',
        path: '/currency',
        component: React.lazy(() =>
            import('views/Master/CurrencyMaster/Currencymaster')
        ),
        authority: [],
    },
    {
        key: 'designationMaster',
        path: '/designation',
        component: React.lazy(() =>
            import('views/Master/DesignationMaster/Designationmaster')
        ),
        authority: [],
    },
    {
        key: 'formmaster',
        path: '/form',
        component: React.lazy(() =>
            import('views/Master/FormMaster/FormMaster')
        ),
        authority: [],
    },
    {
        key: 'channelmaster',
        path: '/channel',
        component: React.lazy(() =>
            import('views/Master/ChannelMaster/Channelmaster')
        ),
        authority: [],
    },
    {
        key: 'placemaster',
        path: '/placemaster',
        component: React.lazy(() =>
            import('views/Master/PlaceMaster/Placemaster')
        ),
        authority: [],
    },
    {
        key: 'starcasttype',
        path: '/starcasttype',
        component: React.lazy(() =>
            import('views/Programming/StarCastTypeMaster/StarCastTypemaster')
        ),
        authority: [],
    },
    {
        key: 'starcastmaster',
        path: '/starcastmaster',
        component: React.lazy(() =>
            import('views/Programming/StarCastMaster/StarCastmaster')
        ),
        authority: [],
    },
    {
        key: 'genremaster',
        path: '/genremaster',
        component: React.lazy(() =>
            import('views/Programming/GenreMaster/Genremaster')
        ),
        authority: [],
    },
    {
        key: 'SubGenreMaster',
        path: '/SubGenreMaster',
        component: React.lazy(() =>
            import('views/Programming/SubGenreMaster/SubGenremaster')
        ),
        authority: [],
    },
    {
        key: 'contenttypemaster',
        path: '/contenttypemaster',
        component: React.lazy(() =>
            import('views/Programming/ContentTypeMaster/ContentTypemaster')
        ),
        authority: [],
    },
    {
        key: 'viewmaster',
        path: '/viewmaster',
        component: React.lazy(() =>
            import('views/Programming/ViewMaster/Viewmaster')
        ),
        authority: [],
    },
    {
        key: 'Censorshipmaster',
        path: '/Censorshipmaster',
        component: React.lazy(() =>
            import('views/Programming/CensorshipMaster/Censorshipmaster')
        ),
        authority: [],
    },
    {
        key: 'Telecastmaster',
        path: '/Telecastmaster',
        component: React.lazy(() =>
            import('views/Programming/TXVersionMaster/TXVersionmaster')
        ),
        authority: [],
    },
    {
        key: 'suppliermastertable',
        path: '/suppliermastertable',
        component: React.lazy(() =>
            import('views/Programming/SupplierMaster/Suppliermaster')
        ),
        authority: [],
    },

    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: React.lazy(() => import('views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: React.lazy(() => import('views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: React.lazy(() =>
            import('views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: React.lazy(() =>
            import('views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
]
