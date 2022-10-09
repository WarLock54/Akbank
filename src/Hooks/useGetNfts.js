import { Network,initializeAlchemy, getNftsForOwner } from "@alch/alchemy-sdk"
import { Contract, ethers } from "ethers";
import { useSelector,useDispatch } from "react-redux";
import { CONTRACT_ADDRESS,ABI,ABI2 } from "../Contracts/info";
import { setListedNfts, setNFTs } from "../Store/account";


export const useGetNfts=()=>{
    const settings={
        apiKey:"n9PCTYIOb2Hzvt7fu1jtbfncwcfzTq3G",
        network:Network.ETH_GOERLI,
        maxRetires:10 
    };
    const alchemy=initializeAlchemy(settings);
    const account=useSelector((state)=>state.accounts.account);
    const dispatch=useDispatch();

    const getNfts=async ()=>{
        if(account){
            const Nftsforowner=await getNftsForOwner(alchemy,account);
            dispatch(setNFTs(Nftsforowner));
        }
    }
    const getListedNfts=async()=>{
        if(account){
            const provider=new ethers.providers.Web3Provider(window.ethereum); 
            const signer=provider.getSigner();
            const contract=new ethers.Contract(CONTRACT_ADDRESS,ABI,signer);
            const number=await contract.idForSale();
            if(number<0){
                return(
                    <div>
                        NONEEEE....
                    </div>
                );
              }
              let arr=[];
              for(var i=0;i<number;i++){
                let info=await contract.idToItemForSale[i];
                if(info.state){
                    let newItem={
                        0:info.CONTRACT_ADDRESS,
                        1:info.tokenId.toString(),
                        2:info.price.toString(),
                        3: i,
                    };
                    arr.push(newItem);

                }
            }
            dispatch( setListedNfts); 
        }

    }
    return {getNfts,getListedNfts};   
}   

