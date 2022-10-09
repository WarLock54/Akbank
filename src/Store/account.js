import { createSlice } from "@reduxjs/toolkit";
const initialState={
    account:null,
    accNfts:null,
    provider:null,
    contract:null,
    listedNfts:[]
};  
export const accountSlice=createSlice({
    name:"accounts",
    initialState,
    reducers:{
        setAccount:(state,action)=>{
            state.account=action.payload;
        },
        setNFTs:(state,action)=>{
            state.accNfts=action.payload;
        },
        setProvider:(state,action)=>{
                state.provider=action.payload;
        },
        setContract:(state,action)=>{
            state.contract=action.payload;
        },
        setListedNfts:(state,action)=>{
            state.listedNfts=action.payload;
        }   
    }

});

export const {setAccount,setContract,setListedNfts,setNFTs,setProvider}=accountSlice.actions;
export default accountSlice.reducer;