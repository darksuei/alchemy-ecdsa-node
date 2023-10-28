import server from "./server";
import { useEffect, useState } from "react";

export default function Addresses() {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    (async () => {
      const addresses = await getAddresses();
      setAddress(addresses);
    })();
  }, []);

  return (
    <div className="container wallet">
      <h1>Active Addresses</h1>

      {address.length > 1 &&
        address.map((address, index) => (
          <label key={index}>
            Address {index + 1}
            <input value={address} readOnly></input>
          </label>
        ))}
    </div>
  );
}
async function getAddresses() {
  const addresses = await server.get("/addresses");
  console.log(addresses.data);
  return addresses.data;
}
