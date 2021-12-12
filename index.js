const express = require('express');
const Web3 = require('web3');

const app = express();

const port = process.env.PORT || 4000;


app.get('/', (req, res) => {
    // api which is checking balance of user
    transferTokenToAddr();
    res.json({ "message": "Hello world" });
});

//steps
// connect to polygon testnet
// sign a transaction of transfer of matic with admin private key.
const transferTokenToAddr = async () => {
    const web3 = new Web3('https://polygon-mumbai.infura.io/v3/8b2159b7b0944586b64f0280c927d0a8'); // connecting with blockchain
    const options = {
        to: "0xeb4e56eB9bab2B1d15C36aC5b624311E663573B7", // address where you want to transfer tokens
        value: 100000000000000000, // amount you want to transfer (1matic= 100000000000000000)
        gas: "21000", // gas value for this transaction to succed

    };

    // signing the transaction with admin private key (0x6827cfc07bacf0565ab8b89a2618cc4353614e0b5e69c107845adde566401647 this my test account private key)
    const signed = await web3.eth.accounts.signTransaction(options, '0x6827cfc07bacf0565ab8b89a2618cc4353614e0b5e69c107845adde566401647');
    //submitting transaction to blockchain
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    console.log(receipt);
    
    console.log('value of account balance of  sender:::', await web3.eth.getBalance("0x72217D8C5A571948B768AaBB58da85c7FA86e55f"));

    console.log('value of account balance of receiver:::', await web3.eth.getBalance("0xeb4e56eB9bab2B1d15C36aC5b624311E663573B7"));
}



app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});