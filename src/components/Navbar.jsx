import React from 'react';
import {Link} from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import User from "./User";
import Button from "./ui/Button";
import {useAuthContext} from "../context/AuthContext";
import CartStatus from "./CartStatus";

const Navbar = () => {
    const {user, login, logout} = useAuthContext();

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                {
                    user && <Link to='/my-cart'><CartStatus /></Link>
                }
                {user && user.isAdmin && (
                    <Link to='/products/register' className='text-2xl'>
                        <BsFillPencilFill/>
                    </Link>)
                }
                {user && <User user={user}/>}
                {user
                    ? <Button text={'Logout'} onClick={logout} />
                    : <Button text={'Login'} onClick={login} />
                }
            </nav>
        </header>
    );
}

export default Navbar;
