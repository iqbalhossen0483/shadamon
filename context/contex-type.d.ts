import { User } from "firebase/auth";

type Alert = { msg: string; type: "info" | "error" | "success" | "warning" };

interface StatesReturnType {
  showLoginRegister: boolean;
  setShowLoginRegister: React.Dispatch<React.SetStateAction<boolean>>;
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  showMyAccountPage: boolean;
  setShowMyAccountPage: Dispatch<SetStateAction<boolean>>;
  showProductModal: boolean;
  setShowProductModal: Dispatch<SetStateAction<boolean>>;
  redirectUrl: string;
  setRedirectUrl: Dispatch<SetStateAction<string>>;
}

type AuthReturnType = {
  googleLogin(): Promise<{ error: null | string }>;
  user: User | null;
  singOut(): Promise<{ error: boolean }>;
  facebookLogin(): Promise<{ error: null | string }>;
  emailSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<{ error: null | string }>;
  emailSingIn(
    email: string,
    password: string
  ): Promise<{ error: null | string }>;
  resetPassword(email: string): Promise<{ error: any }>;
  loading: boolean;
};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    userName?: string;
    user: any;
    stream: MediaStream | undefined;
  }
}
