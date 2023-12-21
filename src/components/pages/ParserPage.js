import React, { Component } from 'react';
import background from '../img/background.png';
import Navbar from '../ux/Navbar';
import TwoGis from '../ux/parsers/TwoGis';
import Wildberries from '../ux/parsers/Wildberries';
import YandexMap from '../ux/parsers/YandexMap';


class ParserPage extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            parser: 'TwoGis'
        };
        this.selectParser = this.selectParser.bind(this);
    }

    selectParser = (parser) => {
        console.log(parser);
        this.setState({ parser: parser })
    }

    render() {
        return (
            <div
                className='w-screen h-screen bg-center bg-cover relative'
                style={{ backgroundImage: `url(${background})`, overflowY: 'hidden' }}
            >
                <Navbar />
                <div className='justify-center items-center flex flex-row space-x-3 w-screen p-2'>
                    <p className='text-[#255957] text-2xl font-bold'>Выберите парсер:</p>
                    <button onClick={() => this.selectParser('TwoGis')} className='hover:opacity-50'>
                        <p className={ this.state.parser === 'TwoGis' ? 'text-[#255957] text-2xl font-light border-b-2 border-[#255957]' : 'text-[#255957] text-2xl font-light' }>2GIS</p>
                    </button>
                    <button onClick={() => this.selectParser('Wildberries')} className='hover:opacity-50'>
                        <p className={ this.state.parser === 'Wildberries' ? 'text-[#255957] text-2xl font-light border-b-2 border-[#255957]' : 'text-[#255957] text-2xl font-light' }>Wildberries</p>
                    </button>
                    <button onClick={() => this.selectParser('Yandex')} className='hover:opacity-50'>
                        <p className={ this.state.parser === 'Yandex' ? 'text-[#255957] text-2xl font-light border-b-2 border-[#255957]' : 'text-[#255957] text-2xl font-light' }>Яндекс Карты</p>
                    </button>
                </div>
                { this.state.parser === 'TwoGis' && <TwoGis/> }
                { this.state.parser === 'Wildberries' && <Wildberries/> }
                { this.state.parser === 'Yandex' && <YandexMap/> }
            </div>
        );
    }
}

export default ParserPage;
