import React, { MouseEventHandler } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
type Fn = {
  onClick: MouseEventHandler<HTMLDivElement>;
  classes?: string;
};
const BackButton = ({ onClick, classes }: Fn) => {
  return (
    <div className={`back-icon ${classes}`} onClick={onClick}>
      <ArrowBackIosIcon sx={{marginLeft: 1}} fontSize='small' />
    </div>
  );
};

export default BackButton;
