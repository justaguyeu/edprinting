import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Sales',
    // path: '/customers',
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyDollarIcon/>
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'Daily Report',
        path: '/salesdaily',
        icon: (
          <SvgIcon fontSize="small">
            <CurrencyDollarIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Weekly Report',
        path: '/salesweekly',
        icon: (
          <SvgIcon fontSize="small">
            <CurrencyDollarIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Monthly Report',
        path: '/salesmonthly',
        icon: (
          <SvgIcon fontSize="small">
            <CurrencyDollarIcon />
          </SvgIcon>
        )
      }
    ]
    
  },


  {
    title: 'Stock',
    // path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
    subItems: [
      {
        title: 'Stock Report',
        path: '/stockreport',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Stock View',
        path: '/stockview',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Add Stock',
        path: '/stockadd',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      },
      {
        title: 'Restock',
        path: '/stockrestock',
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBagIcon />
          </SvgIcon>
        )
      }
    ]
  },
  // {
  //   title: 'Students',
  //   path: '/students',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Exams',
  //   path: '/exams',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  // title: 'Report',
  //   path: '/settings',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  {
  title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },

  // {
  //   title: 'Report',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  //   subItems: [
  //     {
  //       title: 'Weekly Report',
  //       path: '/reports/weekly',
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <ChartBarIcon />
  //         </SvgIcon>
  //       )
  //     },
  //     {
  //       title: 'Monthly Report',
  //       path: '/reports/monthly',
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <ChartBarIcon />
  //         </SvgIcon>
  //       )
  //     }
  //   ]
  // },  
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
