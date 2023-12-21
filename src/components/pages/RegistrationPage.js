import React, { Component } from 'react';
import background from '../img/background.png';
import Registration from '../ux/Registration';
import Authorization from '../ux/Authorization';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMethod: 'Reg',
        };
    }

    toggleSetMethod = (method) => {
        this.setState({
            isMethod: method,
        });
    };

    render() {
        return (
            <div
                className='w-screen h-screen bg-center bg-cover flex justify-center items-center'
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className='flex p-2 px-12 py-12 flex-col justify-center items-center bg-gray-100 rounded-[42px] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100'>
                    <div className='space-x-6 flex flex-row'>
                        <button onClick={() => this.toggleSetMethod('Reg')}>
                            <p className={ this.state.isMethod === 'Reg' ? 'text-[#255957] text-xl font-light border-b-[3px] border-[#255957] hover:opacity-25' : 'text-[#255957] text-xl font-light opacity-50 hover:opacity-25' }>
                                Регистрация
                            </p>
                        </button>
                        <button onClick={() => this.toggleSetMethod('Auth')}>
                            <p className={ this.state.isMethod === 'Auth' ? 'text-[#255957] text-xl font-light border-b-[3px] border-[#255957] hover:opacity-25' : 'text-[#255957] text-xl font-light opacity-50 hover:opacity-25' }>
                                Авторизация
                            </p>
                        </button>
                    </div>
                    {this.state.isMethod === 'Reg' ? <Registration /> : <Authorization />}
                </div>
            </div>
        );
    }
}

export default RegistrationPage;
