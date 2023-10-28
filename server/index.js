const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { generateKeys } = require("./scripts/generate");
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js");

app.use(cors());
app.use(express.json());

const address1 = generateKeys().publicKey;
const address2 = generateKeys().publicKey;
const address3 = generateKeys().publicKey;

const balances = {
  [address1]: 100,
  [address2]: 50,
  [address3]: 75,
};

app.get("/addresses", (req, res) => {
  res.send(Object.keys(balances));
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/new", (req, res) => {
  const { address } = req.body;
  balances[address] = 100;
  res.send(balances);
});

app.post("/send", (req, res) => {
  const { messageHash, publicKey, signature, recipient, amount } = req.body;
  const sender = publicKey;
  console.log(messageHash, publicKey, signature, recipient, amount);

  signature.r = BigInt(signature.r);
  signature.s = BigInt(signature.s);

  const isSigned = secp256k1.verify(signature, messageHash, publicKey);

  if (!isSigned) return res.status(400).send({ message: "Invalid signature!" });

  setInitialBalance(sender);
  setInitialBalance(recipient);
  console.log(sender, recipient, amount);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
