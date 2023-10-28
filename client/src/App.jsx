import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Generate from "./Generate";
import Addresses from "./Addresses";

function App() {
  const [balance, setBalance] = useState(0);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <>
      <div className="app">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          publicKey={publicKey}
          setPublicKey={setPublicKey}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
        />
        <Transfer
          setBalance={setBalance}
          address={privateKey}
          publicKey={publicKey}
        />
      </div>
      <div className="app">
        <Generate />
        <Addresses />
      </div>
    </>
  );
}

export default App;
