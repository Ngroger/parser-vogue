import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Authorization extends Component {
    render() {
        return (
            <div>
                <p className='text-[#255957] text-4xl w-[360px] font-medium mt-4'>С возвращением в 
                    <p className='font-bold'>ParserVogue</p>
                </p>
                <p className='text-[#255957] text-2xl w-96 mt-2'>Введите все данные, чтоб авторизоваться в системе</p>
                <div className='mt-12'>
                    <p className='text-[#255957] text-2xl'>Почта</p>
                    <input className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'/>
                </div>
                <div className='mt-2'>
                    <p className='text-[#255957] text-2xl'>Пароль</p>
                    <input className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'/>
                </div>
                <Link to="/main" className='flex justify-center items-center bg-[#255957] w-full p-4 rounded-xl mt-16 hover:opacity-50'>
                    <p className='text-white text-2xl font-bold'>Авторизоваться</p>
                </Link>
            </div>
        )
    }
};

export default Authorization;