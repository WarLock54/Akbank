// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
interface IERC20 {
    function transfer(address, uint) external returns (bool);

    function transferFrom(
        address,
        address,
        uint
    ) external returns (bool);
}

contract crowdFund{
      event Launch(
        uint id,
        address indexed creator,
        uint goal,
        uint32 startAt,
        uint32 endAt
    );
    event Cancel(uint id);
    event Pledge(uint indexed id, address indexed caller, uint amount);
    event Unpledge(uint indexed id, address indexed caller, uint amount);
    event Claim(uint id);
    event Refund(uint id, address indexed caller, uint amount);

    struct Campagain{
        address creator;
        uint hedef;
        uint32 startAt;
        uint32 endAt;
        uint kefalet;
        bool iddia;
    }
    IERC20 public immutable token;
    uint public count;
    mapping(uint=>Campagain) public     campagains;
    mapping(uint=>mapping(address =>uint))public kefalAmount;
    constructor(address _token){
        token=IERC20(_token);
    }
    function  launch(     uint _goal,
        uint32 _startAt,
        uint32 _endAt) external {
        require(_startAt<block.timestamp,"");
        require(_endAt<_startAt,"");
        require(_endAt>block.timestamp,"");
      count++;
        campagains[count]=Campagain({
            creator:msg.sender,
            hedef:_goal,
            startAt:_startAt,
            endAt:_endAt,
            kefalet:0,
            iddia:false
        });
          
            emit Launch(count,msg.sender,_goal,_startAt,_endAt);
    }
    function cancel(uint _id)external{
        Campagain memory cmg=campagains[_id];
        require(cmg.creator==msg.sender,"not owner");
        require(block.timestamp<cmg.startAt,"basladi");
        delete(campagains[_id]);
        emit Cancel(_id);
            }
    function pledge(uint _id,_amount){
   
         Campagain memory cmg=campagains[_id];
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
         cmg.kefalet+=_amount;
        kefalAmount[_id][msg.sender]+=_amount;
        token.transferFrom(msg.sender,address(this),_amount);

    }
    function unpledge(uint _id,uint _amount){
         Campagain memory cmg=campagains[_id];
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
         cmg.kefalet-=_amount;
        kefalAmount[_id][msg.sender]-=_amount;
        token.transfer(msg.sender,_amount);
        emit Unpledge(_id,msg.sender,_amount);

    }
    function claim(uint _id) {  
             Campagain memory cmg=campagains[_id];
             require(!cmg.iddia);
             require(cmg.creator==msg.sender,"not owner");
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
    cmg.iddia=true;
    token.transfer(cmg.creator,cmg.kefalet);
    emit Claim(_id);

    }
    function refund(uint _id) {
           Campagain memory cmg=campagains[_id];
             require(cmg.creator==msg.sender,"not owner");
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
    uint bal=campagains[_id][msg.sender];
    kefalAmount[_id][msg.sender]=0;
    token.transfer(msg.sender,bal);
    emit Refund(_id,msg.sender,bal);
    }

}