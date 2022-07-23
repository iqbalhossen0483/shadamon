import { useContext } from "react";
import { StoreContext } from "../provider/StoreProvider";

const useStore = () => {
  return useContext(StoreContext);
};

export default useStore;
