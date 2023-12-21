import React, { Component } from 'react';
import background from '../img/background.png';
import Navbar from '../ux/Navbar';
import { Link } from 'react-router-dom';

class MainPage extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isFilterOpen: false,
            isCartOpen: false,
            isNotificationOpen: false,
            products: [], // Добавляем массив для хранения данных,
            filters: []
        };
    }

    componentDidMount() {
        const url = window.location.href;
        const id = url.split('/main/')[1];
        console.log(id);
        // Выполняем запрос на сервер после того, как компонент был добавлен на страницу
        fetch('http://45.12.72.22:5050/data')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            })
            .catch(error => console.error('Ошибка при получении данных:', error));
    }

    toggleOpenFilter = () => {
        this.setState({ isFilterOpen: !this.state.isFilterOpen });
    };

    toggleOpenCart = () => {
        this.setState({ isCartOpen: !this.state.isCartOpen });
    };

    toggleOpenNotification = () => {
        this.setState({ isNotificationOpen: !this.state.isNotificationOpen });
    };

    // Новый метод для обновления фильтров и получения товаров с сервера
    updateFilters = (newFilters) => {
        this.setState({ filters: newFilters }, () => {
            console.log("Фильтры", this.state.filters);

            // Формируем URL с учетом фильтров
            const url = new URL('http://45.12.72.22:5050/products');
            Object.keys(this.state.filters).forEach(key => {
                if (this.state.filters[key]) {
                    url.searchParams.append(key, this.state.filters[key]);
                }
            });

            // Выполняем запрос на сервер с учетом фильтров
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({ products: data });
                })
                .catch(error => console.error('Ошибка при получении данных:', error));
        });
    };

    render() {
        return (
            <div
                className='w-screen h-screen bg-center bg-cover relative'
                style={{ backgroundImage: `url(${background})`, overflowY: 'hidden' }}
            >
                <Navbar updateFilters={this.updateFilters}/>
                <div className='w-screen p-10 h-5/5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    { this.state.products.length === 0 ? (
                        <div className='w-screen h-screen justify-center items-center flex'>
                            <p className='text-3xl text-[#255957] font-bold'>К сожалению, данного товара не найдено</p>
                        </div>
                    ) : (
                        <>
                            {this.state.products.map((product, index) => (
                            <Link to={`/product/${product.id}`} key={index} className='bg-white rounded-2xl card hover:opacity-50'>
                                <img
                                    alt='previewImage'
                                    title='preview'
                                    src={`http://45.12.72.22:5050/images/${product.previewImage}`}
                                    className='w-full h-64 image rounded-t-2xl'
                                />
                                <div className='p-2 px-4'>
                                <div className='flex flex-row items-center justify-between'>
                                    <p className='text-[#255957] text-2xl font-bold'>
                                    {product.name.length > 14 ? `${product.name.slice(0, 14)}...` : product.name}
                                    </p>
                                    <p className='text-[#255957] text-2xl font-bold'>{product.cost}тнг</p>
                                </div>
                                <p className='text-[#255957] text-2xl'>
                                    {product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description}
                                </p>
                                </div>
                            </Link>
                        ))}
                        </>
                    ) }
                </div>
            </div>
        );
    }
}

export default MainPage;
