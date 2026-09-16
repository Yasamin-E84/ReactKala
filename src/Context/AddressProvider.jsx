import { useState } from "react";
import AddressContext from "./AddressContext";

export default function AddressProvider({ children }) {
  const [selectedAddress, setSelectedAddress] = useState(null);

  return <AddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>{children}</AddressContext.Provider>;
}