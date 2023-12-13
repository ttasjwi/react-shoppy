import React from 'react';
import {Link} from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';

const Navbar = () => {

    return (
        <header>
            <Link to='/'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav>
                <Link to='/products'>Products</Link>
                <Link to='/my-cart'>MyCart</Link>
                <Link to='/products/register'>
                    <BsFillPencilFill />
                </Link>
                <button>Login</button>
            </nav>
        </header>
    );
}

export default Navbar;
