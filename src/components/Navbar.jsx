import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiShoppingBag} from 'react-icons/fi';
import {BsFillPencilFill} from 'react-icons/bs';
import {login, logout, onUserStateChange} from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";

const Navbar = () => {
    const [user, setUser] = useState(null);

    // 페이지가 로딩되면, onUserStateChange에 콜백을 전달
    useEffect(() => {
        // 사용자 정보를 가져와서 setUser 하도록 등록
        onUserStateChange((user) => {
            console.log(user);
            setUser(user);
        })
    }, []);

    return (
        <header className='flex justify-between border-b border-gray-300 p-2'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <FiShoppingBag/>
                <h1>Shoppy</h1>
            </Link>
            <nav className='flex items-center gap-4 font-semibold'>
                <Link to='/products'>Products</Link>
                <Link to='/my-cart'>MyCart</Link>
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
