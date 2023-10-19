import {
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'Dashboard',
        path: '/Dashboard',
        title: 'Home',
        translateKey: 'nav.Dashboard',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'Admin',
        path: '',
        title: 'Admin',
        translateKey: 'nav.Admin.Admin',
        icon: 'groupSingleMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'employeemaster',
                path: '/employee',
                title: 'Employee Master',
                translateKey: 'nav.employeemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'entitymaster',
                path: '/entity',
                title: 'Entity Master',
                translateKey: 'nav.entitymaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'locationmaster',
                path: '/location',
                title: 'Location Master',
                translateKey: 'nav.locationmaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'departmentmaster',
                path: '/department',
                title: 'Department Master',
                translateKey: 'nav.departmentmaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'zonemaster',
                path: '/zone',
                title: 'Zone Master',
                translateKey: 'nav.zonemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'timezonemaster',
                path: '/timezone',
                title: 'TimeZone Master',
                translateKey: 'nav.timezonemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },

            {
                key: 'regionmaster',
                path: '/region',
                title: 'Region Master',
                translateKey: 'nav.regionmaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'formmaster',
                path: '/form',
                title: 'Form Master',
                translateKey: 'nav.formmaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'channelmaster',
                path: '/channel',
                title: 'Channel Master',
                translateKey: 'nav.channelmaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'languagemaster',
                path: '/language',
                title: 'Language Master',
                translateKey: 'nav.languagemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'modulemaster',
                path: '/module',
                title: 'Module Master',
                translateKey: 'nav.modulemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'submodulemaster',
                path: '/submodule',
                title: 'SubModule Master',
                translateKey: 'nav.submodulemaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'currencymaster',
                path: '/currency',
                title: 'Currency Master',
                translateKey: 'nav.currencymaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'designationMaster',
                path: '/designation',
                title: 'Designation Master',
                translateKey: 'nav.designationMaster',
                icon: 'HiAcademicCap',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
            {
                key: 'placemaster.item2',
                path: '/placemaster',
                title: 'Place Master',
                translateKey: 'nav.placemaster.item2',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
    {
        key: 'Programming',
        path: '/Programming',
        title: 'Programming',
        translateKey: 'nav.Programming',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [],
        subMenu: [
            {
                key: 'suppliermastertable.item2',
                path: '',
                title: 'Content Management',
                translateKey: 'nav.suppliermastertable.item2',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [],
                subMenu: [
                    {
                        key: 'starcasttype',
                        path: '/starcasttype',
                        title: 'StarCastType Master',
                        translateKey: 'nav.starcasttype',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'starcastmaster',
                        path: '/starcastmaster',
                        title: 'Starcast Master',
                        translateKey: 'nav.starcastmaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'genremaster',
                        path: '/genremaster',
                        title: 'Genre Master',
                        translateKey: 'nav.genremaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'SubGenreMaster',
                        path: '/SubGenreMaster',
                        title: 'SubGenre Master',
                        translateKey: 'nav.SubGenreMaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'contenttypemaster',
                        path: '/contenttypemaster',
                        title: 'Content Type  Master',
                        translateKey: 'nav.contenttypemaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'viewmaster',
                        path: '/viewmaster',
                        title: 'View Master',
                        translateKey: 'nav.viewmaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'Censorshipmaster',
                        path: '/Censorshipmaster',
                        title: 'Censorship Master',
                        translateKey: 'nav.Censorshipmaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'Telecastmaster',
                        path: '/Telecastmaster',
                        title: 'Telecast Master',
                        translateKey: 'nav.Telecastmaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                    {
                        key: 'contentmaster',
                        path: '/contentmaster',
                        title: 'Content Master',
                        translateKey: 'nav.contentmaster',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default navigationConfig
