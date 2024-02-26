const { Web3 } = require("web3");
var CONFIG = require('./config.json');

async function main() {
  // Configuring the connection to an Ethereum node
  const network = CONFIG.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${CONFIG.INFURA_API_KEY}`,
    ),
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    CONFIG.WALLET_TO_SWEEP_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);

  // Check Balance
  var balance = await web3.eth.getBalance(signer.address);
  const ETH_MIN = web3.utils.toWei(CONFIG.MIN_ETH_SWEEP, 'ether');
  const ETH_PRIORITY_FEE_GAS_GWEI = web3.utils.toWei(CONFIG.TX_MAX_PRIORITY_FEE, 'gwei');
  const ETH_GAS_GWEI = web3.utils.toWei(CONFIG.TX_MAX_GWEI, 'gwei');

  if (Number(balance) > Number(ETH_MIN)) {	// sweep!
    let transfer_amount = Number(balance) - ETH_GAS_GWEI * 21000 - ETH_PRIORITY_FEE_GAS_GWEI;
    let nonce = await web3.eth.getTransactionCount(signer.address);
    // Creating the transaction object
    const tx = {
        from: signer.address,
        to: CONFIG.WALLET_DESTINATION,
        value: transfer_amount,
        gas: 21000,
        nonce: Number(nonce),
        maxPriorityFeePerGas: ETH_PRIORITY_FEE_GAS_GWEI,
        maxFeePerGas: ETH_GAS_GWEI,
        chainId: CONFIG.CHAIN_ID
    };
    signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
    console.log("Sweeping: " + web3.utils.fromWei(transfer_amount, 'ether') + " ETH\nFrom: " + signer.address +"\nTo: " + CONFIG.WALLET_DESTINATION);
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
  } else {
    console.log("Balance below threshold - transaction not needed");
  }
}
main();