import {Link, NavLink} from "react-router-dom";
import './Header.css'

export default function Header(){
    return(
        <div className="header">
            <h1>OUT-ivity</h1>
            <div className="navBar">
                <section className="navElement"><Link to="/adventures">browse through adventures    &larr;</Link></section>
                <section className="navElement"><NavLink to="/adventures/add">&rarr;    share your own adventure</NavLink></section>
            </div>
        </div>
    )
}