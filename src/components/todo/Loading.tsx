import { stateStyle } from "@/app/style";
import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className={stateStyle.wrap}>
      <CircularProgress color="success" />
    </div>
  );
}

export default Loading;
