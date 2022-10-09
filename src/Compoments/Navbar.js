import style from "../Compoments/Navbar.module.scss";
import logo from "../Assets/LOGO.png";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { useSetAccount } from "../Hooks/useSetAccount";
import { parseAddress } from "../Utils/parseAddress";
const Navbar=()=>{
    const{connectAccount}=useSetAccount();
   const account=useSelector((state)=>state.accounts.account);
    return (
        <div className={style.wrapper}>
            <div className={style.brand}>
                <img src={logo} className={style.logo}></img>
                Onur MarketPlace
            </div>
            <div className={style.links}>
            <Link to="/">Home</Link>
            <Link to="/MyProfil">MyProfil</Link>
            <Link to="/ListedItem">ListedItem</Link>

            </div>
            <button onClick={()=>connectAccount()}>{account ? parseAddress(account):"Connect Wallet"}</button>

        </div>
    )
}
export {Navbar};