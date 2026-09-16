import { useContext } from "react";
import AddressContext from "./AddressContext";

export default function useAddress() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used inside AddressProvider");
  }

  return context;
}