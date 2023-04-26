import {Link, NavLink} from "react-router-dom";

export default function Header(){
    return(
        <div>
            <h1>OUT-ivity</h1>
            <div>
                <section><Link to="/adventures">browse through adventures</Link></section>
                <section><NavLink to="/adventures/add">share your own adventure</NavLink></section>
            </div>
        </div>
    )
}