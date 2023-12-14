import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import {login, logout} from "../api/firebase";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const handleLogin = () => {
        login().then(user => setUser(user));
    };

    const handleLogout = () => {
        logout().then(setUser);
    };

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/my-cart'>MyCart</Link>
                <Link to='/products/register' className='text-2xl'>
                    <BsFillPencilFill />
                </Link>
                {user
                    ? <button type='button' onClick={handleLogout}>Logout</button>
                    : <button type='button' onClick={handleLogin}>Login</button>
                }
            </nav>
        </header>
    );
}

export default Navbar;
