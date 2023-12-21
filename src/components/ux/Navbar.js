import React, { Component } from 'react';
import { CiSearch } from "react-icons/ci";
import { BsFilterRight } from "react-icons/bs";
import { LuShoppingCart, LuBell } from "react-icons/lu";
import CartMenu from '../ui/menu/CartMenu';
import Filters from '../ui/menu/Filters';
import Notification from '../ui/menu/Notification';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isFilterOpen: false,
            isCartOpen: false,
            isNotificationOpen: false,
            fullname: '',
            surname: '',
            cartCount: 0,
            nameOfPage: '',
        };
    }

    toggleOpenFilter = () => {
        console.log('filter opened');
        console.log(this.state)
        this.setState((prevState) => ({ isFilterOpen: !prevState.isFilterOpen }));
    };
    
    toggleOpenCart = () => {
        this.setState((prevState) => ({ isCartOpen: !prevState.isCartOpen }));
    }
    
    toggleOpenNotification = () => {
        this.setState((prevState) => ({ isNotificationOpen: !prevState.isNotificationOpen }));
    }

    selectPage = (name) => {

    }

    componentDidMount() {
        // Получение токена из cookie
        const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];

        const url = new URL(window.location.href);
        const currentPage = url.pathname.split('/').pop();
        
        this.setState({ nameOfPage: currentPage });
        console.log(currentPage)

        // Функция для повторяющегося запроса
        const fetchCartCount = () => {
            fetch('http://45.12.72.22:5050/getCartCount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: `${authToken}` }),
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ cartCount: data.cartCount })
            })
            .catch(error => {
                console.error('Ошибка при получении данных с сервера: ', error);
            });
        };
    
        // Вызываем первичный запрос
        this.fetchUserData();
    
        // Запускаем повторяющиеся запросы каждые 5 секунд
        this.cartCountInterval = setInterval(() => {
            fetchCartCount();
        }, 5000);
    }
    
    componentWillUnmount() {
        // Очищаем интервал перед размонтированием компонента
        clearInterval(this.cartCountInterval);
    }
    
    fetchUserData() {
        const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];

        fetch('http://45.12.72.22:5050/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: `${authToken}` }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({ fullname: data.user.fullname, surname: data.user.surname });
        })
        .catch(error => {
            console.error('Ошибка при получении данных с сервера: ', error);
        });
    }

    render() {
        return (    
            <div className='p-6 w-screen border-1 border-black flex flex-row items-center justify-between px-10'>
                <p className='text-[#255957] text-4xl font-bold'>ParserVogue</p>
                <div className='space-x-6 flex'>
                    <Link onClick={async() => this.selectPage('main')} to='/main'>
                        <p className={ this.state.nameOfPage === 'main' ? 'text-[#255957] text-2xl font-light border-b-[1px] border-[#255957] py-1 hover:opacity-25' : 'text-[#255957] text-2xl font-light opacity-50 hover:opacity-25 py-1' }>Главная</p>
                    </Link>
                    {/* <Link onClick={async () => this.selectPage('categories')} to='/categories'>
                        <p className={ this.state.nameOfPage === 'categories' ? 'text-[#255957] text-2xl font-light border-b-[1px] border-[#255957] py-1 hover:opacity-25' : 'text-[#255957] text-2xl font-light opacity-50 hover:opacity-25 py-1' }>Категории</p>
                    </Link> */}
                    <Link onClick={async () => this.selectPage('parser')} to='/parser'>
                        <p className={ this.state.nameOfPage === 'parser' ? 'text-[#255957] text-2xl font-light border-b-[1px] border-[#255957] py-1 hover:opacity-25' : 'text-[#255957] text-2xl font-light opacity-50 hover:opacity-25 py-1' }>Парсер</p>
                    </Link>
                    <div className='p-2 border-2 border-[#255957] rounded-xl flex space-x-2 px-6'>
                        <CiSearch color='#255957' size={32}/>
                        <input className='bg-transparent outline-none text-xl text-[#255957] w-32' placeholder='Поиск...'/>
                        <BsFilterRight onClick={this.toggleOpenFilter} color='#255957' size={32}/>
                    </div>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <p className='text-[#255957] text-2xl font-medium'>{this.state.fullname} {this.state.surname}</p>
                    <div className='relative flex'>
                        { this.state.cartCount !== 0 && (
                            <div className='w-6 h-6 absolute z-20 rounded-full bg-[#255957] left-8 justify-center items-center flex'>
                                <p className='text-white font-bold text-sm'>{this.state.cartCount}</p>
                            </div>
                        ) }
                        <LuShoppingCart onClick={this.toggleOpenCart} className='hover:opacity-50 z-10' color='#255957' size={46}/>
                    </div>
                    <LuBell onClick={this.toggleOpenNotification} className='hover:opacity-50' color='#255957' size={46}/>
                </div>
                { this.state.isFilterOpen && <Filters onClose={this.toggleOpenFilter} updateFilters={this.props.updateFilters}/>}
                { this.state.isNotificationOpen && <Notification onClose={this.toggleOpenNotification}/>}
                { this.state.isCartOpen && <CartMenu onClose={this.toggleOpenCart}/>}
            </div>
        )
    }
};

export default Navbar;