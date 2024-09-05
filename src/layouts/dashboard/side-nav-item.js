// import NextLink from 'next/link';
// import PropTypes from 'prop-types';
// import { Box, ButtonBase } from '@mui/material';

// export const SideNavItem = (props) => {
//   const { active = false, disabled, external, icon, path, title } = props;

//   const linkProps = path
//     ? external
//       ? {
//         component: 'a',
//         href: path,
//         target: '_blank'
//       }
//       : {
//         component: NextLink,
//         href: path
//       }
//     : {};

//   return (
//     <li>
//       <ButtonBase
//         sx={{
//           alignItems: 'center',
//           borderRadius: 1,
//           display: 'flex',
//           justifyContent: 'flex-start',
//           pl: '16px',
//           pr: '16px',
//           py: '6px',
//           textAlign: 'left',
//           width: '100%',
//           ...(active && {
//             backgroundColor: 'rgba(255, 255, 255, 0.04)'
//           }),
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.04)'
//           }
//         }}
//         {...linkProps}
//       >
//         {icon && (
//           <Box
//             component="span"
//             sx={{
//               alignItems: 'center',
//               color: 'neutral.400',
//               display: 'inline-flex',
//               justifyContent: 'center',
//               mr: 2,
//               ...(active && {
//                 color: 'primary.main'
//               })
//             }}
//           >
//             {icon}
//           </Box>
//         )}
//         <Box
//           component="span"
//           sx={{
//             color: 'neutral.400',
//             flexGrow: 1,
//             fontFamily: (theme) => theme.typography.fontFamily,
//             fontSize: 14,
//             fontWeight: 600,
//             lineHeight: '24px',
//             whiteSpace: 'nowrap',
//             ...(active && {
//               color: 'common.white'
//             }),
//             ...(disabled && {
//               color: 'neutral.500'
//             })
//           }}
//         >
//           {title}
//         </Box>
//       </ButtonBase>
//     </li>
//   );
// };

// SideNavItem.propTypes = {
//   active: PropTypes.bool,
//   disabled: PropTypes.bool,
//   external: PropTypes.bool,
//   icon: PropTypes.node,
//   path: PropTypes.string,
//   title: PropTypes.string.isRequired
// };


import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, ListItem } from '@mui/material';
import { useRouter } from 'next/router';

export const SideNavItem = (props) => {
  const {
    active = false,
    disabled = false,
    external = false,
    icon,
    path,
    title,
    onClick,
  } = props;

  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{ display: 'flex', py: 0.5, px: 2 }}
    >
      <ButtonBase
        component={external ? 'a' : 'button'}
        disableRipple
        onClick={handleClick}
        sx={{
          
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '10px',
          pr: '10px',
          py: 1.5,
          textAlign: 'left',
          textTransform: 'none',
          width: '100%',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          },
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          ...(disabled && {
            color: 'neutral.40',
            pointerEvents: 'none',
          }),
        }}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'neutral.40'
            })}}
          >
            {icon}
          </Box>
        )}
        <Box
          sx={{
            color: 'black',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            flexGrow: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...(active && {
              color: 'neutral.40'
          })}}
        >
          <span>{title}</span>
        </Box>
      </ButtonBase>
    </ListItem>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
