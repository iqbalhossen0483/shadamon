import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import useStore from "../hooks/useStore";

const AlertProvider = () => {
  const store = useStore();

  let msg = store?.State.alert.msg;
  msg = msg?.includes("Firebase")
    ? msg.replace("Firebase", "").replace(": ", "").replace("auth", "username")
    : msg;

  console.log(msg);

  return (
    <Snackbar
      open={store?.State.alert.msg ? true : false}
      autoHideDuration={5000}
      onClose={(e, reason) => {
        if (reason === "clickaway") return;
        store?.State.setAlert({ msg: "", type: "info" });
      }}
    >
      <Alert severity={store?.State.alert.type}>{msg}</Alert>
    </Snackbar>
  );
};

export default AlertProvider;
