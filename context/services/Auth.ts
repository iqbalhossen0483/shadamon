import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthReturnType } from "../contex-type";
import initialization from "../firebase/initialization";

initialization();

const Auth = (): AuthReturnType => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  //manage user;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  //google sing up / in;
  async function googleLogin(): Promise<{ error: null | string }> {
    try {
      await signInWithPopup(auth, googleProvider);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till

  //facebook sing up
  async function facebookLogin(): Promise<{ error: null | string }> {
    try {
      await signInWithPopup(auth, facebookProvider);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till

  //sign out ouser;
  async function singOut(): Promise<{ error: boolean }> {
    try {
      await signOut(auth);
      return { error: false };
    } catch (err) {
      return { error: true };
    }
  }

  //email singup
  async function emailSignUp(
    name: string,
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateUser(name);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till

  //email sing in;
  async function emailSingIn(
    email: string,
    password: string
  ): Promise<{ error: null | string }> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  } //till;

  //update user info;
  async function updateUser(
    name: string
  ): Promise<{ error: boolean } | undefined> {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        return { error: false };
      } catch (err) {
        return { error: true };
      }
    }
  } //till;

  return {
    googleLogin,
    user,
    singOut,
    facebookLogin,
    emailSignUp,
    emailSingIn,
  };
};

export default Auth;
