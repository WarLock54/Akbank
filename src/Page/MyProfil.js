import styles from "../Page/MyProfil.module.scss";
import { useGetNfts } from "../Hooks/useGetNfts";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {NFT} from "../Compoments/NFT";

const MyProfil=()=>{
    const {getNfts}=useGetNfts();
    const account=useSelector((state)=>state.accounts.account);
    const Nfts=useSelector((state)=>state.accounts.accNfts);

    useEffect(()=>{
        const sas=async()=>{
            getNfts();
        }
        sas();

    },[account]);
    useEffect(()=>{
        const work=async()=>{
            getNfts();
        }
    },[]);

// ALCMHEY KÜTÜPHANESİNDEN YARARLANDIM....
    return(<div className={styles.wrapper}>{ 
    Nfts? Nfts.ownedNfts.map((item,i)=>{
if(item.tokenType==="ERC721"){
    return(
        <NFT type="bir" key={i} contractAddress={item.contract.address} tokenId={item.tokenId}/>
    );
}else{
    return (<></>);
}
    }):"Nft information is loading..."

    }
     
    </div>)
}
export {MyProfil};