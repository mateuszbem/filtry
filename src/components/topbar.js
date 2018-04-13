import React from 'react';




export default class TopBar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand mr-auto mt-2 mt-lg-2" href="#">Products</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-2">
                    <li className="nav-item active ">
                        <a className="nav-link " href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}