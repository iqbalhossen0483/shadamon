import { User } from "firebase/auth";

type Alert = { msg: string; type: "info" | "error" | "success" | "warning" };

interface StatesReturnType {
  showLoginRegister: boolean;
  setShowLoginRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginPage: boolean;
  setShowLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

type AuthReturnType = {
  googleLogin(): Promise<{ error: null | string }>;
  user: User | null;
  singOut(): Promise<{ error: boolean }>;
  facebookLogin(): Promise<{ error: null | string }>;
};
