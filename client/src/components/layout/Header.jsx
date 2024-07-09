import { 
  AppBar,
  Box, 
  IconButton, 
  Toolbar, 
  Tooltip, 
  Typography ,
} from '@mui/material'
import React from 'react'
import { orange } from '../../constants/color'
import {
  Add as AddIcon,
  Group as GroupIcon,
  Menu as MenuIcon ,
  Search as SearchIcon ,
  Logout as LogoutIcon,
} from '@mui/icons-material'
import {useNavigate} from 'react-router-dom'

const Header = () => {

  const navigate=useNavigate()

  const handleMobile=()=>{
    console.log("mobile");
  }

  const openSearchDialog=()=>{
    console.log("openSearchDialog")
  }

  const openNewGroup=()=>{
    console.log("openNewGroup")
  }

  const navigateToGroup=()=>navigate("/groups")

  const LogoutHandler=()=>{
    console.log("logout")
  }


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
              onClick={openSearchDialog}
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
              title={"Logout"}
              icon={<LogoutIcon />}
              onClick={LogoutHandler}
            />

          </Box>
        </Toolbar>
      </AppBar>
     </Box>
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
