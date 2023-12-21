// CartMenu component
import React, { Component } from 'react';
import { IoCloseOutline } from "react-icons/io5";

class Notification extends Component {
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
                        <IoCloseOutline onClick={handleClose} color='#255957' size={50}/>
                        <p className='text-4xl text-[#255957] font-medium'>Уведомления</p>
                    </div>
                    <div className='w-full border-b-2 border-[#255957] items-center flex flex-col py-2 mt-6'>
                        <p className='text-[#255957] text-2xl font-bold'>Название Уведомления</p>
                        <p className='text-[#255957] text-2xl font-light'>Описание Уведомления</p>
                    </div>
                    <div className='w-full border-b-2 border-[#255957] items-center flex flex-col py-2 mt-6'>
                        <p className='text-[#255957] text-2xl font-bold'>Название Уведомления</p>
                        <p className='text-[#255957] text-2xl font-light'>Описание Уведомления</p>
                    </div>
                    <div className='w-full border-b-2 border-[#255957] items-center flex flex-col py-2 mt-6'>
                        <p className='text-[#255957] text-2xl font-bold'>Название Уведомления</p>
                        <p className='text-[#255957] text-2xl font-light'>Описание Уведомления</p>
                    </div>
                    <div className='w-full border-b-2 border-[#255957] items-center flex flex-col py-2 mt-6'>
                        <p className='text-[#255957] text-2xl font-bold'>Название Уведомления</p>
                        <p className='text-[#255957] text-2xl font-light'>Описание Уведомления</p>
                    </div>
                </div>
            </div>
        )
    }
};

export default Notification;
