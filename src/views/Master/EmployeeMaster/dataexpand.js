import { useMemo, useState } from 'react'
import Table from 'components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import {Checkbox,Button} from 'components/ui'
import { useSelector } from 'react-redux'
const { Tr, Th, Td, THead, TBody } = Table

const dataWithSubRows = [
    {
      ModuleCode: 2,
      ModuleName: "ALTERATION",
      subRows: [
        {
          SubModuleCode: 5,
          SubModuleName: "Audit Reports",
          subRows: [
            {
              FormCode: 819,
              FormName: "Bill Delete Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1056,
              FormName: "Update AgencyClient Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 50,
          SubModuleName: "Transaction",
          subRows: [
            {
              FormCode: 820,
              FormName: "Bill Delete",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1057,
              FormName: "Update Agency Client",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 3,
      ModuleName: "DEAL",
      subRows: [
        {
          SubModuleCode: 4,
          SubModuleName: "Approval Management",
          subRows: []
        },
        {
          SubModuleCode: 20,
          SubModuleName: "Daily Transaction",
          subRows: [
            {
              FormCode: 869,
              FormName: "Deal Ammendment",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 870,
              FormName: "Deal Approval",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 875,
              FormName: "Deal Master New",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 876,
              FormName: "Deal Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 26,
          SubModuleName: "Master Data",
          subRows: [
            {
              FormCode: 801,
              FormName: "Agency Group Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 805,
              FormName: "Agency Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 823,
              FormName: "Brand Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 839,
              FormName: "Client Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 843,
              FormName: "Client Group Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 856,
              FormName: "Credit Rate Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 857,
              FormName: "Agency Client Credit",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 882,
              FormName: "Deal Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 889,
              FormName: "Exchange Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 973,
              FormName: "Product Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 976,
              FormName: "PayRoute Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1024,
              FormName: "Product Category Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1037,
              FormName: "Spot Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1038,
              FormName: "Sponsor Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1043,
              FormName: "Time Band Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1071,
              FormName: "Weekdays / Weekends",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 39,
          SubModuleName: "Reports",
          subRows: [
            {
              FormCode: 868,
              FormName: "Deal Approval Log",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 871,
              FormName: "Deal Based Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 872,
              FormName: "Deal Detail Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 883,
              FormName: "Deal Utilization Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1079,
              FormName: "Deal Based Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1080,
              FormName: "Deal Detail Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1082,
              FormName: "Deal Utilization Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 47,
          SubModuleName: "Rate Card Management",
          subRows: [
            {
              FormCode: 987,
              FormName: "Rate Card Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 988,
              FormName: "Client Rate Card Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 4,
      ModuleName: "BILLING",
      subRows: [
        {
          SubModuleCode: 12,
          SubModuleName: "Bill Generation",
          subRows: [
            {
              FormCode: 806,
              FormName: "Asrun Matching",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 809,
              FormName: "AgencyPayment",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 821,
              FormName: "Bill Generation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 824,
              FormName: "Bill Printing",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 829,
              FormName: "Booking TC Print",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 830,
              FormName: "Bill Update CPRP",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 832,
              FormName: "BillView",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 923,
              FormName: "Invoice Series",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 952,
              FormName: "NTC Asrun Matching",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 953,
              FormName: "NTC Bill Generation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 955,
              FormName: "NTC Bill Printing",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 986,
              FormName: "RecieveAgencyPayment",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1098,
              FormName: "Year Tax Details",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 13,
          SubModuleName: "Bill Printing",
          subRows: [
            {
              FormCode: 874,
              FormName: "DigitalMedia Manual Print",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 14,
          SubModuleName: "Master Data",
          subRows: []
        },
        {
          SubModuleCode: 43,
          SubModuleName: "Reports",
          subRows: [
            {
              FormCode: 828,
              FormName: "Bill Summary",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 840,
              FormName: "Credit Debit Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 848,
              FormName: "Clientwise Monthly Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 879,
              FormName: "Daily Revenue Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 919,
              FormName: "IBF Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 920,
              FormName: "INVOICE DETAILS REPORT",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 922,
              FormName: "Inventory Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 932,
              FormName: "Log Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 995,
              FormName: "Revenue Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 998,
              FormName: "Sales Audit Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1039,
              FormName: "Spot Tracker",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1047,
              FormName: "TRAI Inventory Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1081,
              FormName: "Daily Revenue Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1086,
              FormName: "IBF Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1093,
              FormName: "Revenue Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1094,
              FormName: "Sales Audit Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1095,
              FormName: "Spot Tracker",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1097,
              FormName: "TRAI Inventory Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 49,
          SubModuleName: "Third Party Integration",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 5,
      ModuleName: "SALES ADMIN",
      subRows: [
        {
          SubModuleCode: 3,
          SubModuleName: "Approval Management",
          subRows: []
        },
        {
          SubModuleCode: 19,
          SubModuleName: "Daily Transaction",
          subRows: [
            {
              FormCode: 817,
              FormName: "BARC Import",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 881,
              FormName: "Drop Spot Reschedule",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 892,
              FormName: "Excel RO Import",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 991,
              FormName: "RO Booking New",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 992,
              FormName: "RO Import New",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 993,
              FormName: "RO Import",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1001,
              FormName: "RO Booking",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1006,
              FormName: "Spots Cancellation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1013,
              FormName: "Set Monthly Target",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1029,
              FormName: "Spot Replacement",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1044,
              FormName: "Traffic Day",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 25,
          SubModuleName: "Master Data",
          subRows: [
            {
              FormCode: 851,
              FormName: "Commercial Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 912,
              FormName: "Commercial Type Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 38,
          SubModuleName: "Reports",
          subRows: [
            {
              FormCode: 818,
              FormName: "Booking Dump Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 826,
              FormName: "Booking Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 827,
              FormName: "Bill Summary Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 831,
              FormName: "Booking Vs Drop Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 950,
              FormName: "MonthWise Booking Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 951,
              FormName: "MonthWise Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 985,
              FormName: "Quartely Booking Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1007,
              FormName: "Spots Position Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1040,
              FormName: "BookingReport",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1072,
              FormName: "Booking Dump Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1073,
              FormName: "Booking Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1074,
              FormName: "Bill Summary Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1075,
              FormName: "Booking Vs Drop Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1089,
              FormName: "MonthWise Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1092,
              FormName: "Quartely Booking Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1096,
              FormName: "BookingReport",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 46,
          SubModuleName: "Third-Party Integration",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 6,
      ModuleName: "LIBRARY",
      subRows: [
        {
          SubModuleCode: 21,
          SubModuleName: "Daily Transaction",
          subRows: [
            {
              FormCode: 921,
              FormName: "IssueOfTapes",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 994,
              FormName: "Return Of Tapes",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 997,
              FormName: "Recorded Tape",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 27,
          SubModuleName: "Master Data",
          subRows: [
            {
              FormCode: 867,
              FormName: "ContentTypeMaster",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 934,
              FormName: "MusicAgency Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 959,
              FormName: "NewTapesReceipt Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 966,
              FormName: "PurchaseCompany Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 974,
              FormName: "Purpose Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 990,
              FormName: "Rack Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1049,
              FormName: "TapeSeriesEntry Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1050,
              FormName: "TapeTypeMaster",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1061,
              FormName: "Vendor Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 41,
          SubModuleName: "Reports",
          subRows: []
        },
        {
          SubModuleCode: 45,
          SubModuleName: "Tape BarCode",
          subRows: []
        },
        {
          SubModuleCode: 51,
          SubModuleName: "Tape Serach",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 7,
      ModuleName: "SCHEDULING",
      subRows: [
        {
          SubModuleCode: 24,
          SubModuleName: "Linear Management",
          subRows: [
            {
              FormCode: 865,
              FormName: "Commercial Scheduling",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 905,
              FormName: "FinalLogNew",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 906,
              FormName: "Final Log",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 913,
              FormName: "Filler Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 936,
              FormName: "MakeGood Reschedule NTC",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 937,
              FormName: "MakeGood Reschedule",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 939,
              FormName: "Make Good",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 940,
              FormName: "Monthly Movie Planner",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 948,
              FormName: "Movie Time Slots Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 972,
              FormName: "Promo Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 981,
              FormName: "Promo Shuffle Templates",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 982,
              FormName: "Promo Scheduling",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 983,
              FormName: "Promo Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1016,
              FormName: "Song Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1020,
              FormName: "SONG MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1033,
              FormName: "Song Scheduling",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1070,
              FormName: "Song Scheduling",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 31,
          SubModuleName: "Non Linear Management",
          subRows: []
        },
        {
          SubModuleCode: 32,
          SubModuleName: "NTC Management",
          subRows: []
        },
        {
          SubModuleCode: 40,
          SubModuleName: "Reports",
          subRows: [
            {
              FormCode: 861,
              FormName: "Commercial Rotation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 938,
              FormName: "MakeGood Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 979,
              FormName: "Promo Rotation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1078,
              FormName: "Commercial Rotation",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1091,
              FormName: "Promo Rotation",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 48,
          SubModuleName: "Third-Party Integration",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 8,
      ModuleName: "MORGNISER",
      subRows: [
        {
          SubModuleCode: 6,
          SubModuleName: "Auto Scheduling",
          subRows: [
            {
              FormCode: 803,
              FormName: "AUTO LINKER SCHEDULING",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 813,
              FormName: "AUTO SONG SCHEDULING",
              CanRead: 1,
              CanWrite: 1
            },
            {
              FormCode: 833,
              FormName: "COMMERCIAL BROWSE DETAIL",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 884,
              FormName: "DAY WISE SONG SCHEDULING",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 926,
              FormName: "LINKER BROWSE DETAILS",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 933,
              FormName: "Music AgencyCompany",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 969,
              FormName: "PLAYLIST LOG",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 970,
              FormName: "MULTISTATION PLAYLIST",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 999,
              FormName: "SONG BROWSE DETAILS",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1010,
              FormName: "Song List",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1019,
              FormName: "SONG COUNT REPORT",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1030,
              FormName: "Song Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1031,
              FormName: "Song Records",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 17,
          SubModuleName: "Clock Management",
          subRows: [
            {
              FormCode: 845,
              FormName: "CLOCK GRID",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 846,
              FormName: "CLOCK MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 878,
              FormName: "DAY PART MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 968,
              FormName: "PROGRAM GRID",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 975,
              FormName: "PROGRAM PLANNING MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 977,
              FormName: "PROGRAM MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1045,
              FormName: "TIME MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1051,
              FormName: "TIME WISE BREAK MASTER",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 29,
          SubModuleName: "Music Policy",
          subRows: []
        },
        {
          SubModuleCode: 30,
          SubModuleName: "Music Store",
          subRows: [
            {
              FormCode: 836,
              FormName: "CATEGORY CHANGER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 841,
              FormName: "CENSORSHIP MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 853,
              FormName: "CONTENT TYPE MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 866,
              FormName: "Content Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 914,
              FormName: "GENRE MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 915,
              FormName: "Genre Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 925,
              FormName: "LANGUAGE  MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 929,
              FormName: "LINKER MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 935,
              FormName: "CATEGORY FOLDER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 944,
              FormName: "MOVIE ALBUM MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 949,
              FormName: "MUSIC AGENCY MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 984,
              FormName: "PUBLISHER MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1011,
              FormName: "SONG MASTER ENTRIES",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1021,
              FormName: "Song Or Linker Added Or Edited Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1022,
              FormName: "Song Linker Count Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1023,
              FormName: "Linker Category Changer",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1027,
              FormName: "SONG ROTATION POLICY",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1032,
              FormName: "SONG SEARCH MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1035,
              FormName: "STARCAST TYPE MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1036,
              FormName: "STARCAST MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1041,
              FormName: "TAPETYPE MASTER",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1069,
              FormName: "Song Master New",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 42,
          SubModuleName: "Reports",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 9,
      ModuleName: "NTC",
      subRows: [
        {
          SubModuleCode: 22,
          SubModuleName: "Daily Transactios",
          subRows: [
            {
              FormCode: 954,
              FormName: "NTC Booking New",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1004,
              FormName: "Spot Cancellation NTC",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1026,
              FormName: "Spot Replacement NTC",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1034,
              FormName: "Secondary Scheduling",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 34,
          SubModuleName: "NTC",
          subRows: [
            {
              FormCode: 852,
              FormName: "Content NTC Mapping",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 956,
              FormName: "NTC Booking",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 957,
              FormName: "NTC Commercial Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 958,
              FormName: "NTC program Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1028,
              FormName: "Secondary Rotation Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 10,
      ModuleName: "OTT/VOD",
      subRows: [
        {
          SubModuleCode: 35,
          SubModuleName: "OTT",
          subRows: [
            {
              FormCode: 960,
              FormName: "OTT AsRun Matching",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 961,
              FormName: "OTT FPC",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 962,
              FormName: "OTT Content Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 963,
              FormName: "OTT PlayList",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 964,
              FormName: "OTT Promo Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 965,
              FormName: "OTT Promo Scheduling",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 53,
          SubModuleName: "VOD",
          subRows: [
            {
              FormCode: 1062,
              FormName: "VOD Content Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1063,
              FormName: "VOD FPC",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1064,
              FormName: "VOD PlayList",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1065,
              FormName: "VOD Promo Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1066,
              FormName: "VOD Promo Scheduling",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1067,
              FormName: "VOD Rates",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 11,
      ModuleName: "PROGRAMMING",
      subRows: [
        {
          SubModuleCode: 2,
          SubModuleName: "Approval Management",
          subRows: [
            {
              FormCode: 873,
              FormName: "Daily FPC Approval",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 15,
          SubModuleName: "Content License",
          subRows: [
            {
              FormCode: 815,
              FormName: "Amortisation Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 837,
              FormName: "Content Contract Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 16,
          SubModuleName: "Content Management",
          subRows: [
            {
              FormCode: 804,
              FormName: "Award Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 811,
              FormName: "Aspect Ratio Master",
              CanRead: 1,
              CanWrite: 1
            },
            {
              FormCode: 814,
              FormName: "Asset Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 816,
              FormName: "Asset Type Names",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 842,
              FormName: "Content EPS Restriction",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 850,
              FormName: "Content Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 854,
              FormName: "Content Preview",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 858,
              FormName: "Censorship Rating Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 864,
              FormName: "Content Segment",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 908,
              FormName: "FPC Org Rep",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1002,
              FormName: "Star Cast Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1003,
              FormName: "Sub Content Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1005,
              FormName: "Star Cast Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1008,
              FormName: "Sub Genre Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1015,
              FormName: "Supplier Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1052,
              FormName: "Telecast Version Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1054,
              FormName: "TXVersion Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1060,
              FormName: "Audience View Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1068,
              FormName: "Video Size Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 23,
          SubModuleName: "FPC Management",
          subRows: [
            {
              FormCode: 907,
              FormName: "FPC Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 909,
              FormName: "FPC Planning Grid",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 911,
              FormName: "FPC Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 946,
              FormName: "MoviePlanner",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 971,
              FormName: "Break Pattern Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1046,
              FormName: "Hourly Inventory Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1053,
              FormName: "Content Inventory Allocation",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 37,
          SubModuleName: "Reports",
          subRows: [
            {
              FormCode: 834,
              FormName: "Contract Expires Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 838,
              FormName: "Contract Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 886,
              FormName: "Episode wise Duration",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 890,
              FormName: "EPG",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 910,
              FormName: "FPC Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 918,
              FormName: "Hourly Inventory Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 943,
              FormName: "Minute to Minute",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 945,
              FormName: "Monthly Program Run",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 947,
              FormName: "Content Rating",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 967,
              FormName: "Playout Content Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 980,
              FormName: "Program Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1076,
              FormName: "Contract Expires Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1077,
              FormName: "Contract Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1083,
              FormName: "EPG",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1084,
              FormName: "FPC Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1085,
              FormName: "Hourly Inventory Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1087,
              FormName: "Monthly Program Run",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1088,
              FormName: "Content Rating",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1090,
              FormName: "Playout Content Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 12,
      ModuleName: "REPORTS",
      subRows: [
        {
          SubModuleCode: 28,
          SubModuleName: "MIS Reports",
          subRows: [
            {
              FormCode: 847,
              FormName: "Client Monthly Revenue",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 978,
              FormName: "Programwise Revenue",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 13,
      ModuleName: "ACCOUNTS",
      subRows: [
        {
          SubModuleCode: 7,
          SubModuleName: "Master Data",
          subRows: [
            {
              FormCode: 822,
              FormName: "Bank Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 8,
          SubModuleName: "Daily Transaction",
          subRows: [
            {
              FormCode: 807,
              FormName: "Agency OutStanding",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 808,
              FormName: "Agency Payment Entry",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 810,
              FormName: "Advance Receipt",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 825,
              FormName: "Bill Receipts",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 9,
          SubModuleName: "Approval Management",
          subRows: []
        },
        {
          SubModuleCode: 10,
          SubModuleName: "Accounts Intergartion",
          subRows: []
        },
        {
          SubModuleCode: 11,
          SubModuleName: "Reports",
          subRows: []
        }
      ]
    },
    {
      ModuleCode: 14,
      ModuleName: "SPONSORSHIP",
      subRows: [
        {
          SubModuleCode: 33,
          SubModuleName: "NTC Sponsorship",
          subRows: [
            {
              FormCode: 1000,
              FormName: "Sponsorship Blocking",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1009,
              FormName: "Spons Import",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1018,
              FormName: "Scene Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1025,
              FormName: "Sponsorship Playlist",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 15,
      ModuleName: "ADMIN",
      subRows: [
        {
          SubModuleCode: 1,
          SubModuleName: "Common Master",
          subRows: [
            {
              FormCode: 849,
              FormName: "Currency Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 877,
              FormName: "Designation Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 893,
              FormName: "Department Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 898,
              FormName: "Language Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 900,
              FormName: "Place Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 903,
              FormName: "Place Type Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1042,
              FormName: "Time Band Inventory",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1099,
              FormName: "Zone Inventory",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1100,
              FormName: "Zone Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1101,
              FormName: "string",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1102,
              FormName: "NTCMASTER2223",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 18,
          SubModuleName: "Channel Settings",
          subRows: [
            {
              FormCode: 862,
              FormName: "Channel Setting Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 863,
              FormName: "Channel Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 888,
              FormName: "Email Setting",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 896,
              FormName: "Entity Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 897,
              FormName: "FTP Setting",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 899,
              FormName: "Location Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 902,
              FormName: "DTH Provider Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 916,
              FormName: "HouseID Configuration",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 941,
              FormName: "MAM Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 36,
          SubModuleName: "Reports",
          subRows: []
        },
        {
          SubModuleCode: 44,
          SubModuleName: "System Settings",
          subRows: [
            {
              FormCode: 887,
              FormName: "Email Group Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 894,
              FormName: "Event Color Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 924,
              FormName: "Key Date Alert Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 942,
              FormName: "Module Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1012,
              FormName: "Sub Module Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1014,
              FormName: "Form Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1017,
              FormName: "State Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1055,
              FormName: "Time Zone Master",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        },
        {
          SubModuleCode: 52,
          SubModuleName: "User Management",
          subRows: [
            {
              FormCode: 855,
              FormName: "Change Password",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 895,
              FormName: "Employee Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 901,
              FormName: "Playout Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 904,
              FormName: "Employee Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 927,
              FormName: "Login Event Color Master",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 928,
              FormName: "Login Group",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 16,
      ModuleName: "WEB",
      subRows: [
        {
          SubModuleCode: 54,
          SubModuleName: "WEB",
          subRows: [
            {
              FormCode: 802,
              FormName: "Agency GOPY",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 812,
              FormName: "Agency Revenue",
              CanRead: 1,
              CanWrite: 1
            },
            {
              FormCode: 835,
              FormName: "Client Count GOPY",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 844,
              FormName: "Client GOPY",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 859,
              FormName: "Client Revenue",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 860,
              FormName: "Category Revenue",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 880,
              FormName: "Deal Report",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 885,
              FormName: "Dashboard",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 891,
              FormName: "Event Package Revenue",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 917,
              FormName: "HourwiseInventory",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 930,
              FormName: "LIST OF OUTSTANDING INVOICES REPORT",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 931,
              FormName: "List Of Invoices",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 989,
              FormName: "Revenue GOPY",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 996,
              FormName: "Revenue Sharing",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1048,
              FormName: "TRAI REPORT",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1058,
              FormName: "User Access Log",
              CanRead: 0,
              CanWrite: 0
            },
            {
              FormCode: 1059,
              FormName: "User Login Report",
              CanRead: 0,
              CanWrite: 0
            }
          ]
        }
      ]
    },
    {
      ModuleCode: 17,
      ModuleName: "Test12",
      subRows: [
        {
          SubModuleCode: 55,
          SubModuleName: "Test112",
          subRows: []
        }
      ]
    }
  ]
function Exapanding() {
    const { LoginId } = useSelector((state) => state.auth.session)
    const columns = useMemo(
        () => [
            {
                id: 'expander',
                header: ({ table }) => {
                    return (
                        <button
                            className="text-xl"
                            {...{
                                onClick:
                                    table.getToggleAllRowsExpandedHandler(),
                            }}
                        >
                            {table.getIsAllRowsExpanded() ? (
                                <HiOutlineMinusCircle />
                            ) : (
                                <HiOutlinePlusCircle />
                            )}
                        </button>
                    )
                },
                cell: ({ row, getValue }) => {
                    return (
                        <>
                            {row.getCanExpand() ? (
                                <button
                                    className="text-xl"
                                    {...{
                                        onClick: row.getToggleExpandedHandler(),
                                    }}
                                >
                                    {row.getIsExpanded() ? (
                                        <HiOutlineMinusCircle />
                                    ) : (
                                        <HiOutlinePlusCircle />
                                    )}
                                </button>
                            ) : null}
                            {getValue()}
                        </>
                    )
                },
            },
            // {
            //     header: 'ModuleCode',
            //     accessorKey: 'ModuleCode',
            // },
            {
                header: 'ModuleName',
                accessorKey: 'ModuleName',
            },
            {
                header: 'SubModuleName',
                accessorKey: 'SubModuleName',
            },
            {
                header: 'FormName',
                accessorKey: 'FormName',
            },
            {
                header: 'CanRead',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Checkbox
                                name={row.FormCode && "read"}
                                type="checkbox"
                                // checked={true}
                                data-FormCode={row.FormCode}
                                data-FormName={row.FormName}
                                // onClick={(e) => console.log(row)}
                            />
                        </div>
                    )
                },
            },
            {
                header: 'CanWrite',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Checkbox
                                name={row.FormCode && "write"}
                                type="checkbox"
                                // checked={true}
                                data-FormCode={row.FormCode}
                                data-FormName={row.FormName}
                                // onClick={(e) => console.log(row)}
                            />
                        </div>
                    )
                },
            },
        ],
        []
    )

    const [data] = useState(dataWithSubRows)
    const [expanded, setExpanded] = useState([])

    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row.subRows,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })

    return (
        <>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
            <Button
                className="mr-2 mb-2"
                variant="solid"
                type="button"
                onClick={() => {
                    const reads = [];
	                // Get all checkbox inputs with the name "packages[]"
	                const checkboxes_read = document.querySelectorAll('input[name="read"]');

                    for (const checkbox of checkboxes_read) {
                        if (checkbox.checked) {
                            reads.push(checkbox.dataset.formcode)	  
                        }
                      }

                      const writes = [];
                      // Get all checkbox inputs with the name "packages[]"
                      const checkboxes_write = document.querySelectorAll('input[name="write"]');
  
                      for (const checkbox of checkboxes_write) {
                          if (checkbox.checked) {
                            //   
                            writes.push(checkbox.dataset.formcode)	  
                          }
                        }
                        console.log(reads); console.log(writes);
                }}
            >
                  Save
            </Button>
        </>
    )
}

export default Exapanding
