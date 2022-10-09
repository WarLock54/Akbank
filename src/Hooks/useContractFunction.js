import { ethers } from "ethers";
import { CONTRACT_ADDRESS,ABI,ABI2 } from "../Contracts/info";
export const useContractFunction=()=>{
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner();
    const contract=ethers.Contract(CONTRACT_ADDRESS,ABI,signer);
    const NftStartSale=async (_CONTRACT_ADDRESS,_price,_tokenId)=>{
        const contract2=ethers.Contract(_CONTRACT_ADDRESS,ABI2,signer);
        const sitution=await contract2.getApproved(_tokenId);
        if(sitution===CONTRACT_ADDRESS.toString()){
                await contract.startNFTSale(_CONTRACT_ADDRESS,_price,_tokenId);
        }
        else{
            await contract2.approve(CONTRACT_ADDRESS.toString(),_tokenId);
        }
    }
    const buyNFT=async(_id,_price)=>{
        console.log(_id,_price);
        await contract.buyNFT(_id,{value: Number(_price)});
        
    }
    return{NftStartSale,buyNFT};
}