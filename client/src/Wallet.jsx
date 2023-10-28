import server from "./server";

function Wallet({
  publicKey,
  setPublicKey,
  privateKey,
  setPrivateKey,
  balance,
  setBalance,
}) {
  async function onPublicKeyChange(evt) {
    const pubKey = evt.target.value;
    setPublicKey(pubKey);
    if (pubKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${pubKey}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }
  async function onPrivateKeyChange(evt) {
    const privKey = evt.target.value;
    setPrivateKey(privKey);
  }

  return (
    <div className="container wallet">
      <h1>Your Address</h1>
      <p style={{ fontSize: "12px" }}>
        Use your private key to send funds and your public key to check your
        balance.
      </p>
      <label>
        Public Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={publicKey}
          onChange={onPublicKeyChange}
        ></input>
      </label>
      <label>
        Private Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={onPrivateKeyChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
