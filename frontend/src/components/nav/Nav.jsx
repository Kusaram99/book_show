import React from 'react'
import './nav.css';
import { FaBars } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../usecontext/Mycontext';

const d_img = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/768px-Circle-icons-image.svg.png';





const Nav = () => {
    // location hooks
    const location = useLocation();

    // exclude navigate function from hook
    const navigate = useNavigate();

    // exclude context data  
    const { navContext, setNavContext } = useMyContext();

    // bar button handler
    const barBtnHandler = () => {
        let toggleDom = document.querySelector('.account_container');
        toggleDom.classList.toggle('toggle');
        setTimeout(() => {
            toggleDom.classList.toggle('display_non');
        }, 100);
    }

    // logOut handler
    const logOut = () => {
        localStorage.removeItem('user');
        setNavContext([]);
        navigate('/login')
    }



    return (
        <header className="navbar" >
            <div className="navbar-container">
                <div className="logo-container">
                    <Link to="/" className="logo">MVies</Link>
                </div>
                <div className="menu-container">
                    <ul className="menu-list">
                        <li className="menu-list-item"> <Link to='/' className='active'>Home</Link></li>
                        <li className="menu-list-item"><Link to='/'>Movies</Link></li>
                        <li className="menu-list-item"><Link to='/'>Series</Link></li>

                    </ul>
                </div>
                <div className="profile-container">
                    {!navContext.length ?
                        <Link
                            to='login'
                            id='lgin'
                            style={location.pathname === '/login' ?
                                { display: 'none' } : {}}>
                            LogIn
                        </Link> : ""
                    }
                    <img className="profile-picture" src={navContext.length ? navContext[0].image : d_img} alt="user_profile" />

                    <div className="burger">
                        <FaBars onClick={barBtnHandler} />
                    </div>
                </div>
            </div>
            <div
                className='account_container toggle display_non'
                onClick={barBtnHandler}>
                {navContext.length ?
                    <div className='user__info'>
                        <p><span className='font_bold mr_3'>Name:</span><span>{navContext[0].firstname}</span></p>
                        <p><span className='font_bold mr_3'>Email:</span><span>{navContext[0].email}</span></p>
                    </div> : ""
                }
                <div className='account_btns'>
                    {!navContext.length ? <Link to='/signup' >Register</Link> : ""}
                    {navContext.length ? <button onClick={logOut}>Log Out</button> : ""}
                </div>
            </div>
        </header>
    )
}

export default Nav