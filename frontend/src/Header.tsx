import {Link, NavLink} from "react-router-dom";
import './Header.css'

export default function Header() {
    return (
        <div className="header">
            <NavLink to='/login'>login</NavLink>
            <h1>OUT-ivity <span className="travelBug"> ...making friends with the travel bug</span></h1>
            <div className="navBar">
                <section className="navElement"><Link to="/adventures">browse through adventures    &larr;</Link>
                </section>
                <section className="navElement"><NavLink to="/adventures/add">&rarr;    share your own
                    adventure</NavLink></section>
            </div>

        </div>
    )
}