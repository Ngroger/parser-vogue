import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        fullname: '',
        surname: '',
        email: '',
        password: '',
        passwordConfrim: '',
        errors: {
            fullname: false,
            surname: false,
            email: false,
            password: false,
            passwordConfrim: false,
            passwordUnconfirm: false,
        },
        isSuccessRegistration: false,
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };
    
    const registration = () => {
        const { fullname, surname, email, password, passwordConfrim } = state;

        const errors = {
            fullname: fullname.length < 2,
            surname: surname.length < 2,
            email: email.length < 2,
            password: password.length < 2,
            passwordConfrim: passwordConfrim.length < 2,
            passwordUnconfirm: password !== passwordConfrim,
        };
        
        setState((prevState) => ({ ...prevState, errors }));

        if (!Object.values(errors).some((error) => error)) {
            // Fetch запрос на сервер
            fetch('http://45.12.72.22:5050/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname,
                surname,
                email,
                password,
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.authToken) {
                // Сохранение токена в cookie
                document.cookie = `authToken=${data.authToken}; path=/`;
                setState((prevState) => ({ ...prevState, isSuccessRegistration: true }));
                // Выполняем редирект
                navigate('/main');
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке запроса:', error);
            });
        }
    };
    
    const { errors, isSuccessRegistration } = state;

    return (
        <div>
            <p className='text-[#255957] text-2xl w-[360px] font-medium mt-4'>
                Добро пожаловать в
                <p className='font-bold'>ParserVogue</p>
            </p>
            <p className='text-[#255957] text-xl w-96 mt-2'>
                Введите все данные, чтобы зарегистрироваться в системе
            </p>
            <div className='mt-2'>
                <p className='text-[#255957] text-xl'>Имя</p>
                <input
                    type='text'
                    name='fullname'
                    value={state.fullname}
                    onChange={handleChange}
                    className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'
                />
                {errors.fullname && (
                    <p className='text-red-400 text-center'>
                        Это поле должно быть свыше 1 символов
                    </p>
                )}
            </div>
            <div className='mt-2'>
                <p className='text-[#255957] text-xl'>Фамилия</p>
                <input
                    type='text'
                    name='surname'
                    value={state.surname}
                    onChange={handleChange}
                    className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'
                />
                {errors.surname && (
                    <p className='text-red-400 text-center'>
                        Это поле должно быть свыше 1 символов
                    </p>
                )}
            </div>
            <div className='mt-2'>
                <p className='text-[#255957] text-xl'>Почта</p>
                <input
                    type='text'
                    name='email'
                    value={state.email}
                    onChange={handleChange}
                    className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'
                />
                {errors.email && (
                    <p className='text-red-400 text-center'>
                        Это поле должно быть свыше 2 символов
                    </p>
                )}
            </div>
            <div className='mt-2'>
                <p className='text-[#255957] text-xl'>Пароль</p>
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                    className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'
                />
                {errors.password && (
                    <p className='text-red-400 text-center'>
                        Это поле должно быть свыше 2 символов
                    </p>
                )}
            </div>
            <div className='mt-2'>
                <p className='text-[#255957] text-xl'>Подтвердите пароль</p>
                <input
                    type='password'
                    name='passwordConfrim'
                    value={state.passwordConfrim}
                    onChange={handleChange}
                    className='bg-transparent outline-none border-b-2 border-[#255957] text-[#255957] p-2 text-xl w-full'
                />
                {errors.passwordConfrim && (
                    <p className='text-red-400 text-center'>
                        Это поле должно быть свыше 2 символов
                    </p>
                )}
                {errors.passwordUnconfirm && (
                    <p className='text-red-400 text-center'>
                        Пароли не совпадают. Попробуйте снова
                    </p>
                )}
            </div>
            <button
                onClick={registration}
                className='flex justify-center items-center bg-[#255957] w-full p-4 rounded-xl mt-12 hover:opacity-50'
            >
                <p className='text-white text-2xl font-bold'>Зарегистрироваться</p>
            </button>
        </div>
    );
}
