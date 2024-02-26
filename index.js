const { Web3 } = require("web3");
async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.WALLET_TO_SWEEP_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  // Check Balance
  var balance = await web3.eth.getBalance(signer.address);
  const ETH_MIN = web3.utils.toWei(process.env.MIN_ETH_SWEEP, 'ether');
  const ETH_PRIORITY_FEE_GAS_GWEI = web3.utils.toWei(process.env.TX_MAX_PRIORITY_FEE, 'gwei');
  const ETH_GAS_GWEI = web3.utils.toWei(process.env.TX_MAX_GWEI, 'gwei');

  if (Number(balance) > Number(ETH_MIN)) {	// sweep!
    let transfer_amount = Number(balance) - ETH_GAS_GWEI * 21000 - ETH_PRIORITY_FEE_GAS_GWEI;
    let nonce = await web3.eth.getTransactionCount(signer.address);
    // Creating the transaction object
    const tx = {
        from: signer.address,
        to: process.env.WALLET_DESTINATION,
        value: transfer_amount,
        gas: 21000,
        nonce: Number(nonce),
        maxPriorityFeePerGas: ETH_PRIORITY_FEE_GAS_GWEI,
        maxFeePerGas: ETH_GAS_GWEI,
        chainId: process.env.CHAIN_ID
    };
    signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
    console.log("Sweeping: " + transfer_amount + "\nFrom: " + signer.address +"\nTo: " + process.env.WALLET_DESTINATION);
    // Sending the transaction to the network
    const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    })
    .catch(e => {
        console.log(e);
    });;
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
  }
}
require("dotenv").config();
main();