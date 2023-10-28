const secp = require("ethereum-cryptography/secp256k1");
const { bytesToHex } = require("ethereum-cryptography/utils");

function generateKeys() {
  const privateKey = secp.secp256k1.utils.randomPrivateKey();
  const publicKey = secp.secp256k1.getPublicKey(privateKey);
  return {
    privateKey: bytesToHex(privateKey),
    publicKey: bytesToHex(publicKey),
  };
}

module.exports = {
  generateKeys,
};
