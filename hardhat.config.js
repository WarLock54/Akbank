
 require("@nomiclabs/hardhat-waffle");

 const PRIVATE_KEY = "936da005e6613f33a79737ff023430dbab8c61ab4909d9dfc22bb63743cedd51";


 module.exports = {
     solidity: "0.8.13",
     networks: {
       mainnet: {
         url: `https://eth-goerli.g.alchemy.com/v2/n9PCTYIOb2Hzvt7fu1jtbfncwcfzTq3G`,
           accounts: [`${PRIVATE_KEY}`]
       },
       fuji: {
         url: `https://api.avax-test.network/ext/bc/C/rpc`,
           accounts: [`${PRIVATE_KEY}`]
       }
     }
     
 };