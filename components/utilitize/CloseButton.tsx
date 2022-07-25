import React from "react";
import CloseIcon from "@mui/icons-material/Close";
type Fn = {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  classes?: string;
};
const CloseButton = ({ onClick, classes }: Fn) => {
  return (
    <div className={`close-icon ${classes}`} onClick={() => onClick(false)}>
      <CloseIcon />
    </div>
  );
};

export default CloseButton;
