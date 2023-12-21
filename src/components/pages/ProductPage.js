import React, { Component } from 'react';
import background from '../img/background.png';
import Navbar from '../ux/Navbar';
import { MdOutlineFileDownload } from "react-icons/md";


class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        const url = window.location.href;
        const id = url.split('/product/')[1];
        console.log(id); // Выводит id в консоль
    
        // Выполняем запрос на сервер для получения данных о продукте
        fetch(`http://45.12.72.22:5050/data/${id}`, {
            method: 'POST', // Указываем метод запроса
            headers: {
                'Content-Type': 'application/json', // Указываем тип контента
                // Добавь другие необходимые заголовки, если нужно
            },
            // Если у тебя есть данные для передачи, добавь их в тело запроса
            // body: JSON.stringify({ key: 'value' }),
        })
        .then(response => response.json())
        .then(data => {
            // Обновляем состояние компонента данными о продукте
            this.setState({ product: data });
            console.log('Полученные данные о продукте: ', data);
        })
        .catch(error => console.error('Ошибка запроса:', error));
    }

    downloadFile = () => {
        // Проверка, есть ли файл для скачивания
        if (this.state.product.file) {
            // Создаем временный элемент a
            const link = document.createElement('a');
            link.href = `http://45.12.72.22:5050/previewFiles/${this.state.product.previewFile}`; // URL файла
        
            // Добавляем элемент в DOM, имитируем клик и удаляем элемент
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Файл не найден');
        }
    };

    addToCart = () => {
        const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];

        // Данные для отправки
        const requestData = {
            token: authToken,
            name: this.state.product.name,
            description: this.state.product.description,
            cost: this.state.product.cost,  // Цена товара (замени на реальное значение)
            file: this.state.product.file,  // Путь к файлу (замени на реальное значение)
            imagePreview: this.state.product.previewImage,  // Путь к изображению (замени на реальное значение)
        };

        // Fetch запрос
        fetch('http://45.12.72.22:5050/addCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added to the cart successfully:', data);
        })
        .catch(error => {
            console.error('Error adding product to the cart:', error);
        });
    }

    render() {
        return (
            <div
                className='w-screen h-screen bg-center bg-cover relative'
                style={{ backgroundImage: `url(${background})`, overflowY: 'hidden' }}
            >
                <Navbar />
                <div className='w-screen h-screen flex flex-row p-10 space-x-10'>
                    <img 
                        alt='previewImage'
                        title='preview'
                        src={`http://45.12.72.22:5050/images/${this.state.product.previewImage}`}
                        className='bg-[#F2F2F2] bg-contain w-[600px] h-[600px] rounded-3xl'
                    />
                    <div>
                        <p className='text-4xl w-96 text-[#255957] font-bold'>Основная информация</p>
                        <div className='flex flex-row'>
                            <div className='space-y-3 mt-3'>
                                <p className='text-3xl font-mediem text-[#255957]'>Цена</p>
                                <p className='text-3xl font-mediem text-[#255957]'>Название</p>
                                <p className='text-3xl font-mediem text-[#255957]'>Источник</p>
                                <p className='text-3xl font-mediem text-[#255957]'>Категория</p>
                                <p className='text-3xl font-mediem text-[#255957]'>Описание</p>
                            </div>
                            <div className='space-y-3 mt-3 ml-24'>
                                <p className='text-3xl font-light  text-[#255957]'>{this.state.product.cost}</p>
                                <p className='text-3xl font-light  text-[#255957]'>{this.state.product.name}</p>
                                <p className='text-3xl font-light  text-[#255957]'>{this.state.product.source}</p>
                                <p className='text-3xl font-light  text-[#255957]'>{this.state.product.category}</p>
                                <p className='text-3xl font-light  text-[#255957]'>{this.state.product.description}</p>
                            </div>
                        </div>
                        <div className='flex flex-row space-x-6 mt-12'>
                            <button onClick={this.addToCart} className='p-4 border-[4px] border-white rounded-3xl group hover:bg-white'>
                                <p className='text-[#fff] group-hover:text-[#255957] font-bold text-xl'>Добавить в корзину</p>
                            </button>
                            <button className='p-4 border-[4px] px-10 border-[#255957] rounded-3xl group hover:bg-[#255957]'>
                                <p className='text-[#255957] group-hover:text-[#fff] font-bold text-xl'>Купить</p>
                            </button>
                        </div>
                    </div>
                    <div>
                        <p className='text-4xl w-96 text-[#255957] font-bold'>Предварительный просмотр</p>
                        <div className='mt-3 flex flex-row space-x-6 items-center'>
                            <div onClick={this.downloadFile} className='bg-[#F2F2F2] w-20 h-20 justify-center items-center flex rounded-3xl hover:opacity-50'>
                                <MdOutlineFileDownload size={56} color='#255957'/>
                            </div>
                            <p className='text-[#255957] text-2xl w-64 font-medium'>Ознакомьтесь с демо данными перед покупкой</p>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ProductPage;
