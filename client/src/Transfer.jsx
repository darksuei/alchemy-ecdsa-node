import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

function Transfer({ address, setBalance, publicKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const pubKey = secp256k1.getPublicKey(address);
      if (toHex(pubKey) != publicKey) {
        alert("Invalid private key for this account");
        return;
      }
      const messageHash = toHex(keccak256(utf8ToBytes(sendAmount)));
      let signature = secp256k1.sign(messageHash, address);
      signature = {
        r: signature.r.toString(),
        s: signature.s.toString(),
        recovery: signature.recovery,
      };
      const transaction = {
        amount: parseInt(sendAmount),
        recipient,
        messageHash,
        publicKey: toHex(pubKey),
        signature,
      };
      console.log(transaction);
      const res = await server.post(`send`, transaction);
      setBalance(res.data.balance);
    } catch (ex) {
      alert(ex.response ? ex.response.data.message : "Invalid private key");
      console.log(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
