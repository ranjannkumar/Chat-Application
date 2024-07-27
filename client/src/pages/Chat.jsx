import React, { Fragment,containerRef } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { IconButton, Stack } from '@mui/material';
import { grayColor, orange } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponents';
import FileMenu from '../components/dialogs/FileMenu';

const Chat = () => {
  return (
    <Fragment>
      <Stack 
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* messages render */}
      </Stack>
      <form
        style={{
          height:"10%",
        }}
      >

        <Stack
         direction={"row"}
         height={"100%"}
         padding={"1rem"}
         alignItems={"center"}
         position={"relative"}
        >
          <IconButton
             sx={{
              position:"absolute",
              left: "1.5rem",
              rotate: "30deg",
             }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox placeholder='Type Message Here...' />

          <IconButton
             type='submit'
             sx={{
              rotate:"-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover":{
                bgcolor:"error.dark",
              }
             }}
          >
             <SendIcon />
          </IconButton>

        </Stack>

      </form>
      <FileMenu />
    </Fragment>
  )
}

export default AppLayout()(Chat);
