const  {except }= require('chai');
const {ethers}=require('hardhat');
const { isCallTrace } = require('hardhat/internal/hardhat-network/stack-traces/message-trace');
const provider=ethers.provider;
function ethToNumber(val){
return Number(ethers.utils.formatEther(value));

}
describe("NFT MARKET PLACE",function(){
    let owner,user1,user2;
    let NFT,nft;
    var balances;
    before(async function(){
        [owner,user1,user2] = await ethers.getSigners();
        NFT=await ethers.getContractFactory("NFTMarketPlace");
        nft=await NFT.connect(owner).deploy();
        nft.connect(owner).transfer(user1.address,ethers.utils.parseUnits("100",18));
        nft.connect(user1).transfer(user2.address,ethers.utils.parseEther("60"));
        nft.connect(user1).approve(nft.address,ethers.constants.MaxUint256);
        nft.connect(user2).approve(nft.address,ethers.constants.MaxUint256);

    });
    beforeEach(async function(){
balances=[
ethToNumber(await nft.balanceOf(owner.address)),
ethToNumber(await nft.balanceOf(user1.address)),
ethToNumber(await nft.balanceOf(user2.address)),
];
    });

    it("Sozlesmeler oluyor mu?",async function(){
            expect(nft.address).to.not.be.undefined;
            expect(nft.address).to.be.properAddress;
    });
    it("Nft gönderiliyor mu?",async function(){
expect(balances[1]).to.be.equal(100);
expect(balances[2]).to.be.equal(60);

expect(balances[0]).to.be.greaterThan(balances[1]);
    });
    it("Onaylandı mı?",async function(){
        let allowances=[
            await nft.allowance(user1.address,nft.address),
            await nft.allowance(user2.address,nft.address),
        ]
        expect(allowances[0]).to.be.equal(ethers.constants.MaxUInt256)
        expect(allowances[0]).to.be.equal(allowances[1]);
    })
});

