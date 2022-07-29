import React, { MouseEventHandler } from "react";
import CloseIcon from "@mui/icons-material/Close";
type Fn = {
  onClick: MouseEventHandler<HTMLDivElement>;
  classes?: string;
};
const CloseButton = ({ onClick, classes }: Fn) => {
  return (
    <div className={`close-icon ${classes}`} onClick={onClick}>
      <CloseIcon />
    </div>
  );
};

export default CloseButton;
