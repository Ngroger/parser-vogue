    // CartMenu component
    import React, { Component } from 'react';
    import { IoCloseOutline } from "react-icons/io5";

    class CartMenu extends Component {
        constructor(props) {
            super(props);
            this.state = {
                cart: []
            }
            this.downloadFile = this.downloadFile.bind(this)
        }

        componentDidMount() {
            this.fetchCartData(); // Вызываем первичный запрос
        
            // Запускаем повторяющиеся запросы каждые 5 секунд
            this.interval = setInterval(() => {
                this.fetchCartData();
            }, 5000);
        }

        componentWillUnmount() {
            // Очищаем интервал перед размонтированием компонента
            clearInterval(this.interval);
        }
        
        fetchCartData() {
            const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];
        
            fetch('http://45.12.72.22:5050/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: `${authToken}` }),
            })  
                .then(response => response.json())
                .then(data => {
                    this.setState({ cart: data });
                })
                .catch(error => {
                    console.error('Ошибка при получении данных с сервера: ', error);
                });
        } 

        removeFromCart =  async (id) => {
            const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken=')).split('=')[1];

            try {
                const response = await fetch('http://45.12.72.22:5050/removeCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: authToken,
                        id: id,
                    }),
                });    
                if (response.ok) {
                    console.log('Cart item removed successfully');
                // Дополнительные действия при успешном удалении, например, обновление состояния компонента
                } else {
                    console.error('Failed to remove cart item');
                // Обработка ошибки при неудачном удалении
                }
            } catch (error) {
            console.error('Error:', error);
            }
        }
        
        calculateTotalCost() {
            // Используем метод reduce для сложения значений cost
            return this.state.cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.cost;
            }, 0);
        }

        downloadFile = async (file) => {
            // Проверка, есть ли файл для скачивания
            if (file) {
                try {
                    const response = await fetch(`http://45.12.72.22:5050/files/${file}`);
                    const blob = await response.blob();

                    // Создаем временный элемент a с использованием Blob
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = file;

                    // Добавляем элемент в DOM, имитируем клик и удаляем элемент
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Очищаем объект Blob
                    URL.revokeObjectURL(link.href);
                } catch (error) {
                    console.error('Ошибка при скачивании файла:', error);
                }
            } else {
                console.error('Файл не найден');
            }
        };

        render() {
            const { onClose } = this.props;

            const handleClose = _ => {
                if (onClose) {
                    onClose();
                }
            };
            
            

            return (
                <div className='w-screen h-screen absolute top-0 left-0 z-20'>
                    <div className='bg-black absolute w-screen h-screen opacity-25 z-20'/>
                    <div className='h-screen bg-white z-50 absolute right-0 items-center p-10'>
                        <div className='flex flex-row justify-center items-center'>
                            <IoCloseOutline className='hover:opacity-50' onClick={handleClose} color='#255957' size={50}/>
                            <p className='text-4xl text-[#255957] font-medium'>Корзина</p>
                            <p className='text-2xl text-[#255957] ml-4 font-light'>{this.calculateTotalCost()}тнг</p>
                        </div>
                        { this.state.cart.length === 0 ? (
                            <div className='justify-center items-center flex h-screen'>
                                <p className='font-medium text-xl text-[#255957]'>Пока в корзине нет товаров</p>
                            </div>
                        ) : (
                            <>
                                { this.state.cart.map((product, index) => (
                                    <div key={index} className='w-full flex flex-row mt-10'>
                                        <img     
                                            alt='previewImage'
                                            title='preview'
                                            src={`http://45.12.72.22:5050/images/${product.imagePreview }`} 
                                            className='bg-[#BDBDBD] w-32 bg-cover h-32'
                                        />
                                        <div className='flex flex-col ml-4'>
                                            <div className='flex flex-row justify-between'>
                                                <p className='text-[#255957] text-2xl font-bold'>{product.name}</p>
                                                <p className='text-[#255957] text-2xl font-bold'>{product.cost}тнг</p>
                                            </div>
                                            <p className='text-[#255957] text-2xl w-96'>{product.description}</p>
                                            <div className='flex flex-row mt-4'>
                                                <button onClick={() => this.removeFromCart(product.id)} className=' justify-center items-center p-2 border-2 border-[#255957] rounded-full px-6 hover:opacity-50'>
                                                    <p className='text-[#255957] text-xl font-bold'>Отменить</p>
                                                </button>
                                                <button onClick={async () => this.downloadFile(product.file)} className=' justify-center items-center p-2 ml-4 bg-[#255957] rounded-full px-6 hover:opacity-50'>
                                                    <p className='text-[#fff] text-xl font-bold'>Скачать</p>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) }
                            </>
                        ) }
                    </div>

                </div>
            )
        }
    };

    export default CartMenu;
