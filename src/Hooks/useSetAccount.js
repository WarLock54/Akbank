
import { useDispatch } from "react-redux";
import { setAccount } from "../Store/account";

export const useSetAccount=()=>{
    const dispatch=useDispatch();

    const connectAccount=async()=>{
        if(!window.ethereum){
            throw Error("Metamask kullanmak zorundasin...");
        }else{
            let accounts= await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err)=>console.error(err));

            dispatch(setAccount(accounts[0]));

            if(window.ethereum.chainId=="0x5"){
                try {
                    await window.ethereum.request({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: '0x5' }],
                    });
                  } catch (switchError) {
                   
                    if (switchError.code === 4902) {
                      try {
                        await window.ethereum.request({
                          method: 'wallet_addEthereumChain',
                          params: [
                            {
                              chainId: '0x5',
                              chainName: 'Goerli',
                              rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'] ,
                            },
                          ],
                        });
                      } catch (addError) {
                       
                      }
                    }
                   
                  }
            }

        }
    }
    return {
        connectAccount
    }
}