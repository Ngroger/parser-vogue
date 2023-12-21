import React, { Component } from 'react';
import background from '../img/background.png';
import Navbar from '../ux/Navbar';
import { Link } from 'react-router-dom';

class CategoriesPage extends Component {
    render() {
        return (
            <div
                className='w-screen h-screen bg-center bg-cover relative'
                style={{ backgroundImage: `url(${background})`, overflowY: 'hidden' }}
            >
                <Navbar />
                <div className='w-screen p-10 h-5/5 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8'>
                    <Link to='/main/business/?rus=Бизнес%20и%20Маркетинг' className='bg-[#3498db] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl w-48 text-[#fff]'>Бизнес и Маркетинг</p>
                    </Link>
                    <Link to='/main/estate' className='bg-[#f39c12] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Недвижимость</p>
                    </Link>
                    <Link to='/main/tech' className='bg-[#2980b9] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Технологии и IT</p>
                    </Link>
                    <Link to='/main/healthcare' className='bg-[#16a085] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Здравоохранение</p>
                    </Link>
                    <Link to='/main/finances' className='bg-[#34495e] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Финансы и Инвестиции</p>
                    </Link>
                    <Link to='/main/travels' className='bg-[#d35400] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Путешествие и Гостиничный бизнес</p>
                    </Link>
                    <Link to='/main/ecology' className='bg-[#2ecc71] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Экология и устойчивость</p>
                    </Link>
                    <Link to='/main/rights' className='bg-[#8e44ad] rounded-2xl w-64 h-64 card hover:opacity-50 p-6'>
                        <p className='font-bold text-2xl text-[#fff]'>Право и Юриспруденция</p>
                    </Link>
                </div>  
            </div>
        );
    }
}

export default CategoriesPage;
