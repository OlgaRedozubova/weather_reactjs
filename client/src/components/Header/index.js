import  React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';

export default () => {
    return(
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Weather in the town</h1>

            <nav className="nav">
                <NavLink to="/" exact={true} activeClassName="selected">Home</NavLink>
                <NavLink to="/time" activeClassName="selected">Time</NavLink>
                {/*<NavLink to="/towns" activeClassName="selected">Towns</NavLink>*/}
            </nav>
        </header>
    )
}