import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetNfts } from "../Hooks/useGetNfts";
import { NFT } from "../Compoments/NFT";
import style from "./ListedItems.module.scss";
const ListedItem=()=>{
    const account=useSelector(state=>state.accounts.account);
    const listedItems=useSelector(state=>state.accounts.listedNfts);
    const {getListedNfts}=useGetNfts();
    useEffect(()=>{
        const work=async()=>{
            getListedNfts();
        }
        work();
    },[])
    return <div className={style.wrapper}>
        {listedItems>0? 
            listedItems.map((item,i)=>{
                return <NFT type="2" key={i} contractAddress={item[0]} tokenId={item[1]} price={item[2]} id={item[3]}  />
            })
        :
        "ListedNfts information loading"}
       
    </div>
}
export {ListedItem};
