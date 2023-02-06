import React from "react";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import SubdirectoryArrowLeftRoundedIcon from "@mui/icons-material/SubdirectoryArrowLeftRounded";
import SubdirectoryArrowRightRoundedIcon from "@mui/icons-material/SubdirectoryArrowRightRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";

function Car() {
  const button = {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  };

  const button_left = {
    position: "relative",
  };

  const button_right = {
    position: "relative",
  };
  const offsetLeft_bottom = 20;
  const offsetLeft_left = 45;

  const offsetRight_top = 10;
  const offsetRight_right = 10;

  const left_top = () => {
    fetch("green/lighton");
  };

  const left_bottom = () => {
    fetch("blue/lighton");
  };

  const left_left = () => {
    fetch("green/lightoff");
  };

  const left_right = () => {
    fetch("blue/lightoff");
  };

  return (
    <Box sx={button}>
      {/* left */}
      <Box sx={button_left}>
        {/* left_top */}
        <Box
          onClick={left_top}
          sx={{
            position: "absolute",
            bottom: 140 + offsetLeft_bottom,
            left: 30 + offsetLeft_left,
          }}
        >
          <IconButton size="large">
            <ArrowUpwardRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        {/* left_tottom */}
        <Box
          onClick={left_bottom}
          sx={{
            position: "absolute",
            bottom: 50 + offsetLeft_bottom,
            left: 30 + offsetLeft_left,
          }}
        >
          <IconButton size="large">
            <ArrowDownwardRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        {/* left_left */}
        <Box
          onClick={left_left}
          sx={{
            position: "absolute",
            bottom: 95 + offsetLeft_bottom,
            left: -14 + offsetLeft_left,
          }}
        >
          <IconButton size="large">
            <SubdirectoryArrowLeftRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        {/* left_right */}
        <Box
          onClick={left_right}
          sx={{
            position: "absolute",
            bottom: 95 + offsetLeft_bottom,
            left: 74 + offsetLeft_left,
          }}
        >
          <IconButton size="large">
            <SubdirectoryArrowRightRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      {/* right */}
      <Box sx={button_right}>
        <Box>
          <IconButton
            sx={{
              position: "absolute",
              t0p: 140 + offsetRight_top,
              right: 30 + offsetRight_right,
            }}
            size="large"
          >
            <StopCircleRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Car;
