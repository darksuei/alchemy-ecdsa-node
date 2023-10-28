import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { useState } from "react";
import server from "./server";

export default function Generate() {
  const [keys, setKeys] = useState({
    privateKey: "",
    publicKey: "",
  });
  return (
    <div className="container wallet">
      <h1>Generate your keys</h1>

      <label>
        Public Key
        <input value={keys.publicKey} readOnly></input>
      </label>

      <label>
        Private Key
        <input value={keys.privateKey} readOnly></input>
      </label>

      <button
        className="button"
        onClick={() => {
          setKeys(generateKeys());
        }}
      >
        Generate Keys
      </button>
    </div>
  );
}

function generateKeys() {
  console.log("ok");
  const privateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(privateKey);
  server.post("/new", { address: toHex(publicKey) });
  return {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
  };
}
