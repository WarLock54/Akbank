// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract feeCollector{
    address public owner;
    uint public balance;
    constructor(){
        owner=msg.sender;
    }
        receive() external payable{
            balance=msg.value;
        }
        function withdraw(address payable destAdr,uint amount)public{
                    require(balance>amount,"not enough money");
                    require(destAdr==msg.sender,"not the owner");
                    destAdr.transfer(amount);
                    balance-=amount;
        }
}