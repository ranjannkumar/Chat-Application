import { 
  AppBar,
  Backdrop,
  Box, 
  IconButton, 
  Toolbar, 
  Tooltip, 
  Typography ,
} from '@mui/material'
import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../../constants/color'
import {
  Add as AddIcon,
  Group as GroupIcon,
  Menu as MenuIcon ,
  Search as SearchIcon ,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'
import { server } from '../../constants/config'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { userNotExists } from '../../redux/reducers/auth'
import {setIsMobile} from "../../redux/reducers/misc"
const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationDialog= lazy(()=>import("../specific/Notifications"))
const NewGroupDialog= lazy(()=>import("../specific/NewGroup"))




const Header = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [isSearch,setIsSearch]=useState(false);
  const [isNewGroup,setIsNewGroup]=useState(false);
  const [isNotification,setIsNotification]=useState(false);


  const handleMobile=()=>{
    dispatch(setIsMobile(true));

    
  }

  const openSearch=()=>{
    setIsSearch((prev)=>!prev)
  }

  const openNewGroup=()=>{
    setIsNewGroup((prev)=>!prev)
  }

  const openNotification=()=>{
    setIsNotification((prev)=>!prev)
  }


  const navigateToGroup=()=>navigate("/groups")

  const LogoutHandler=async()=>{
    try {
      const {data} = await axios.get(`${server}/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  return (
   <>
     <Box sx={{ flexGrow: 1}} height={"4rem"}>
      <AppBar
        position="static"
        sx={{
          bgcolor: orange,
        }}
      >
        <Toolbar>

          <Typography
            variant='h6'
            sx={{
              display: { xs: "none", sm: "block"},
            }}
           >
            chattu
          </Typography>

          <Box
            sx={{
              display: { xs: "block", sm: "none"},
            }}
           >
            <IconButton
              color='inherit' 
              onClick={handleMobile}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
           sx={{
            flexGrow: 1
           }}
          />
          <Box>
            <IconBtn 
              title={"Search"}
              icon={<SearchIcon />}
              onClick={openSearch}
            />

            <IconBtn 
              title={"New Group"}
              icon={<AddIcon />}
              onClick={openNewGroup}
            />

            <IconBtn 
              title={"Manage Groups"}
              icon={<GroupIcon  />}
              onClick={navigateToGroup}
            />

            <IconBtn 
              title={"Notifications"}
              icon={<NotificationsIcon />}
              onClick={openNotification}
            />

            <IconBtn 
              title={"Logout"}
              icon={<LogoutIcon />}
              onClick={LogoutHandler}
            />

          </Box>
        </Toolbar>
      </AppBar>
     </Box>

    {
      isSearch && (
      <Suspense fallback={<Backdrop open />}>
        <SearchDialog />
      </Suspense>)
    }

    {
      isNotification && (
      <Suspense fallback={<Backdrop open />}>
        <NotificationDialog />
      </Suspense>)
    }

    {
      isNewGroup && (
      <Suspense fallback={<Backdrop open />}>
        <NewGroupDialog />
      </Suspense>)
    }


   </>
  )
}

const IconBtn=({title,icon,onClick})=>{
  return (
          <Tooltip title={title}>
             <IconButton 
              color='inherit' 
              size='large'
              onClick={onClick}
              >
                {icon}
             </IconButton>
          </Tooltip>
  )
}

export default Header
