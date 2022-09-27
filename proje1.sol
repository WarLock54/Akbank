// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract feeCollector{
    address public owner;
    uint public balance;
    constructor(){
        owner=msg.sender;
    }
    /*
        herhangi bir çağrı verisi kullanılmadıgı için receive kullanılır.
    */
        receive() external payable{
            balance=msg.value;
        }
        /*
                para çekmek için kullanılır ama owner sahipliği olan yapabilir.
         */
        function withdraw(address payable destAdr,uint amount)onlyOwner public{
                    require(balance>amount,"not enough money");
                    require(destAdr==msg.sender,"not the owner");
                    destAdr.transfer(amount);
                    balance-=amount;
        }
        modifier onlyOwner(){
                require(owner==msg.sender,"not owner");
                _;
        }
}