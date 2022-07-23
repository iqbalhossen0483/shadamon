import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
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

  return {
    googleLogin,
    user,
    singOut,
    facebookLogin,
  };
};

export default Auth;
