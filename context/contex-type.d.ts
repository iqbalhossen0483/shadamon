import { User } from "firebase/auth";

type Alert = { msg: string; type: "info" | "error" | "success" | "warning" };

interface StatesReturnType {
  showLoginRegister: boolean;
  setShowLoginRegister: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginPage: boolean;
  setShowLoginPage: React.Dispatch<React.SetStateAction<boolean>>;
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert>>;
  showMessage: { otp: boolean; email: boolean };
  setShowMessage: React.Dispatch<
    React.SetStateAction<{ otp: boolean; email: boolean }>
  >;
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
  singUpWihPhone(number: string, name: string): Promise<{ error: any }>;
  varifyOtp(otp: string): Promise<{ error: any }>;
  resetPassword(email: string): Promise<{ error: any }>;
  varifyEmail(user: User): Promise<any>;
  isfacebookLogin: boolean;
};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    userName?: string;
    user: any;
  }
}
