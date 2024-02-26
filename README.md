```markdown
# Ethereum Wallet Sweeper

This Node.js script is designed to programmatically sweep Ethereum (ETH) from a compromised wallet in order to prevent attackers from moving assets. It provides a way to secure funds in case of a compromised private key or wallet.

## Prerequisites

Before running this script, ensure you have the following:

- Node.js installed on your system.
- An Ethereum wallet with the compromised private key.
- An API key from [Infura.io](https://docs.infura.io/dashboard/create-api)
- NPM dependencies installed. (Install them by running `npm install` in the project directory.)

## Setup

1. Clone or download this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install dependencies.
4. Update the `config.js` file with your Ethereum wallet address, private key or wallet file, and Ethereum node URL.

## Usage

To sweep ETH from the compromised wallet, follow these steps:

1. Ensure your Ethereum node is running and accessible.
2. Navigate to the project directory in your terminal.
3. Run the script by executing `node sweep.js`.
4. Once the sweep is completed, the script will display the transaction hash for the sweep transaction.

## Configuration

In the `config.js` file, you need to provide the following information:

- `ETHEREUM_NETWORK`: mainnet, sepolia
- `CHAIN_ID`: for mainnet (1), for sepolia (11155111)
- `INFURA_API_KEY`: API key from [Infura.io](https://docs.infura.io/dashboard/create-api)
- `WALLET_TO_SWEEP_PRIVATE_KEY`: The private key or path to the wallet file of the compromised wallet.
- `WALLET_DESTINATION`: The address of the destination wallet where funds will be swept into.
- `MIN_ETH_SWEEP`: The balance threshold in which the script will run to sweep the funds.
- `TX_MAX_GWEI`: The gas fees to be set for the transaction.
- `TX_MAX_PRIORITY_FEE`: The priority fees to be set for the transaction.

## Security Considerations

- Ensure that your private key or wallet file is kept secure and not exposed to unauthorized parties.
- Be cautious when running this script, as it will initiate a transaction on the Ethereum network.
- Always verify the code and dependencies before running any script that involves your private keys or transactions.

## Disclaimer

This script is provided as-is without any warranties. Use it at your own risk. The authors of this script are not responsible for any loss of funds or damages resulting from the use of this script.

## License

[MIT License](LICENSE)
```
