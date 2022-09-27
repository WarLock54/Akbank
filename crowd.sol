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
/*
        Kontratın doğru çalışıp çalışmadıgını kontrol etmek için kullanılır...
 */
    struct Campagain{
        address creator;
        uint hedef;
        uint32 startAt;
        uint32 endAt;
        uint pledged;
        bool claimed;
    }
    IERC20 public immutable token;
    uint public count;
    mapping(uint=>Campagain) public     campagains;
    mapping(uint=>mapping(address =>uint))public pledgedAmount;
    /*
    IERC20 TOKEN İN erc20 tokenini kullandığını belirttik...
    */
    constructor(address _token){
        token=IERC20(_token);
    }
    /*
    baslatma fonksiyonu 
    objenin bilgilerini giriyoruz...
    */
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
            pledged:0,
            claimed:false
        });
          
            emit Launch(count,msg.sender,_goal,_startAt,_endAt);
    }
    /*
        objeyi yok ediyoruz...
     */
    function cancel(uint _id)external{
        Campagain memory cmg=campagains[_id];
        require(cmg.creator==msg.sender,"not owner");
        require(block.timestamp<cmg.startAt,"basladi");
        delete(campagains[_id]);
        emit Cancel(_id);
            }
            /*
            kefalet parasını ödeme fonk...
             */
    function pledge(uint _id,_amount){
   
         Campagain memory cmg=campagains[_id];
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
         cmg.pledged+=_amount;
        pledgedAmount[_id][msg.sender]+=_amount;
        token.transferFrom(msg.sender,address(this),_amount);

    }
    /*
            kefalet parası geri verme fonk..
     */
    function unpledge(uint _id,uint _amount){
         Campagain memory cmg=campagains[_id];
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
         cmg.pledged-=_amount;
        pledgedAmount[_id][msg.sender]-=_amount;
        token.transfer(msg.sender,_amount);
        emit Unpledge(_id,msg.sender,_amount);

    }
    /*
        iddia dogrulamasi...
     */
    function claim(uint _id) {  
             Campagain memory cmg=campagains[_id];
             require(!cmg.claimed);
             require(cmg.creator==msg.sender,"not owner");
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
    cmg.claimed=true;
    token.transfer(cmg.creator,cmg.pledged);
    emit Claim(_id);

    }
    /*
    paranın geri iade edilmesi 
    aslında burada birde fee ücreti alınabiirdi
    şu şekilde
    fee=bal-msg.value;
    
     */
    function refund(uint _id) {
           Campagain memory cmg=campagains[_id];
             require(cmg.creator==msg.sender,"not owner");
         require(block.timestamp>=cmg.startAt,"baslamadi");
    require(block.timestamp<=cmg.endAt,"bitti");
    uint bal=campagains[_id][msg.sender];
    pledgedAmount[_id][msg.sender]=0;
    token.transfer(msg.sender,bal);
    emit Refund(_id,msg.sender,bal);
    }

}