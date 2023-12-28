import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { styled, alpha, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import InputRoundedIcon from '@mui/icons-material/InputRounded';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const drawerWidth = 240; // dice cuan ancho es el menu cuando se despliega

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [ user, setUser ] = React.useState(null);
  const [ login, setLogin ] = React.useState(0);

  React.useEffect(() => {
    let userLogin = JSON.parse(localStorage.getItem('user'))
    console.log("userLogin", userLogin);
    userLogin  ? setUser(userLogin)  : null
    userLogin  ? setLogin(1)  : setLogin(0)
  },[]);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu =
   login === 1 ?  (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={e => handleLogin(e)}>Desconectar</MenuItem>

    </Menu>
  ) :
  (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 0 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 0 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    open === false ? setOpen(true) : setOpen(false);
  };

  const handleDrawerOpenOnMouseOver = () => {
    setOpen(true)
  };

  const handleDrawerOpenOnMouseLeave = () => {
    setOpen(false)
  };

  function handleLogin(e){
    e.preventDefault();
    localStorage.removeItem('user');
    handleMenuClose()
    setLogin(0)
    setUser(null)
    Router.push("/")
  }

  // console.log("user", user)
  // console.log("login", login)

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" sx={{ backgroundColor:"#EA6558"}}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={ e => handleDrawerOpen(e)}
            
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Basani SA
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* se deshabilito el menu profile en vista general porque no hay algo para agregar ahi */}
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* se deshabilito el menu de celulares hasta no encontrar algo util que agregar ahi */}
            {/* <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
      <Drawer variant="permanent" open={open} onMouseOver={ e => handleDrawerOpenOnMouseOver(e)} onMouseLeave={e => handleDrawerOpenOnMouseLeave(e)}>
        <Divider />

        {/* Control para agregar el boton de inicio si el usuario no esta logueado */}
        { user === null ? <List>
          {['Inicio'].map((text, index) => (
            <Link href={
                index === 0 ? '/' : '/'
              } >
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241",
                  fontfamily:"Roboto"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 1 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List> : null}

        {/* condicion para que solo los usuarios del sector sistemas puedan tener acceso al control de usuarios */}
        { user !== null && user.sector === "Sistemas" ? 
        <List>
          {['Inicio','Usuarios', 'Nuevo Usuario'].map((text, index) => (
            <Link href={
                index === 0 ? '/' :
                index === 1 ? '/usuarios' : '/usuarios/nuevoUsuario'
                
              } >
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241",
                  fontfamily:"Roboto"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#EA6558"
                  }}
                >
                  {/* { index === 1 ? <InsertDriveFileRoundedIcon /> : <MailIcon />} */
                    index === 0 ? <InputRoundedIcon /> :
                    index === 1 ? <PersonRoundedIcon /> :
                    index === 2 ? <PersonAddAltRoundedIcon /> : <MailIcon />
                     
                  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List> 
        : 
        <List>
          {['Inicio'].map((text, index) => (
            <Link href={
                index === 0 ? '/' : '/'
              } >
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241",
                  fontfamily:"Roboto"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 1 ? <InsertDriveFileRoundedIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>
          ))}
        </List> 
        } 
        <Divider />


        {/* condicion para que solo los usuarios del sector sistemas puedan tener acceso al control de usuarios */}
        { user !== null && user.sector === "Sistemas" ? 
        <List>

          {['Soportes',  'Faq', ' Hist. Soportes'].map((text, index) => (
            <Link href={
                    index === 0 ? '/tickets' :
                    index === 1 ? '/faq' :
                    index === 2 ? '/soportes/historicoSoportes': null
                    } >
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241"
                }}
              >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color:"#EA6558"
                    }}
                  >
                    {
                      index === 0 ? <InsertDriveFileRoundedIcon /> :
                      index === 1 ? <LiveHelpRoundedIcon />: <FindInPageRoundedIcon />}
                  </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>

          ))}
        </List>
        
        : <List>

        {['Soportes', 'Nuevo Soporte', ' Hist. Soportes'].map((text, index) => (
          <Link href={
                  index === 0 ? '/tickets' :
                  index === 1 ? '/soportes/nuevoSoporte':
                  index === 2 ? '/soportes/historicoSoportes': null
                  } >
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                color:"#404241"
              }}
            >

                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color:"#EA6558"
                  }}
                >
                  {index === 0 ? <InsertDriveFileRoundedIcon /> :
                  index === 1 ? <LiveHelpRoundedIcon />: <FindInPageRoundedIcon />}
                </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          </Link>

        ))}
      </List>
        
        }
        <Divider />
        {
          user !== null ? 
          user.isprojectmanager === true || user.isprojectworker === true ?
        <List>

          {['Projectos', 'Tareas'].map((text, index) => (
            <Link href={
                    index === 0 ? '/dashboard' :
                    index === 1 ? '/tareas/tareas' : '/'
                    } >
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241"
                }}
              >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color:"#EA6558"
                    }}
                  >
                    {index === 0 ? <FolderRoundedIcon /> : <CreateNewFolderRoundedIcon />}
                  </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>

          ))}
        </List> : null :null }


        <Divider />
        { user !== null ? <List>
          {['Desconectar'].map((text, index) => ( 
            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={ e => handleLogin(e)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  color:"#404241",
                  fontfamily:"Roboto"
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index === 1 ? <ExitToAppRoundedIcon /> : <ExitToAppRoundedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
           ))}
        </List> : null}
      </Drawer>
    </Box>
  );
}

