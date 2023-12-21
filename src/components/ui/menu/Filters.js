    // CartMenu component
    import React, { Component } from 'react';
    import { IoCloseOutline } from "react-icons/io5";

    class Filters extends Component {
        constructor(props) {
            super(props);
            this.state = {
                costFrom: 0,
                costTo: 0,
                linesFrom: 0,
                linesTo: 0,
                category: '',
                source: '',
                isFilterUnselected: false
            };
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange = (event) => {
            const { name, value } = event.target;
            this.setState((prevState) => ({ ...prevState, [name]: value }));
        };

        handleCategoryChange = (selectedCategory) => {
            this.setState({ category: selectedCategory });
        };

        handleSourceChange = (selectedSource) => {
            this.setState({ source: selectedSource });
        };
        

        render() {
            const { onClose } = this.props;

            const handleClose = _ => {
                if (onClose) {
                    onClose();
                }
            };

            const sumbitFilters = () => {
                if(this.state.costFrom === 0 && this.state.linesFrom === 0 && this.state.category === '' && this.state.source === '') {
                    this.setState({ isFilterUnselected: true });
                } else {
                    this.setState({ isFilterUnselected: false });
                    this.props.updateFilters({
                        costFrom: this.state.costFrom,
                        costTo: this.state.costTo,
                        linesFrom: this.state.linesFrom,
                        linesTo: this.state.linesTo,
                        category: this.state.category,
                        source: this.state.source
                    });
                    handleClose();
                }
            }
            

            return (
                <div className='w-screen h-screen absolute top-0 left-0 z-20'>
                    <div className='bg-black absolute w-screen h-screen opacity-25 z-20'/>
                    <div className='h-screen bg-white z-50 absolute right-0 items-center p-10'>
                        <div className='flex flex-row justify-center items-center'>
                            <IoCloseOutline onClick={handleClose} color='#255957' size={50}/>
                            <p className='text-4xl text-[#255957] font-medium'>Фильтры</p>
                        </div>
                        <div className='w-80 mt-6'>
                            <p className='text-[#255957] font-medium text-2xl'>Цена</p>
                            <div className='flex flex-row w-[300px] justify-between items-center mt-2'>
                                <input name='costFrom' value={this.state.costFrom} onChange={this.handleChange} className=' p-2 text-xl text-[#255957] border-2 border-[#255957] w-32 rounded-2xl outline-none' placeholder='От'/>
                                <input name='costTo' value={this.state.costTo} onChange={this.handleChange} className=' p-2 text-xl text-[#255957] border-2 border-[#255957] w-32 rounded-2xl outline-none' placeholder='До'/>
                            </div>
                        </div>
                        <div className='w-80 mt-6'>
                            <p className='text-[#255957] font-medium text-2xl'>Кол-во информации</p>
                            <div className='flex flex-row w-[300px] justify-between items-center mt-2'>
                                <input name='linesFrom' value={this.state.linesFrom} onChange={this.handleChange} className=' p-2 text-xl text-[#255957] border-2 border-[#255957] w-32 rounded-2xl outline-none' placeholder='От'/>
                                <input name='linesTo' value={this.state.linesTo} onChange={this.handleChange} className=' p-2 text-xl text-[#255957] border-2 border-[#255957] w-32 rounded-2xl outline-none' placeholder='До'/>
                            </div>
                        </div>
                        <div className='w-80 mt-6'>
                            <p className='text-[#255957] font-bold text-2xl'>Категория</p>
                            {['Бизнес', 'Недвижимость', 'Технологии', 'Здравоохранение', 'Финансы и Инвестиции', 'Путешествия и Гостиничный бизнес', 'Экология и устойчивость', 'Право и Юриспруденция'].map(category => (
                                <p
                                    key={category}
                                    className={this.state.category === category ? 'text-[#255957] font-bold text-xl' : 'text-[#255957] font-light text-xl'}
                                    onClick={() => this.handleCategoryChange(category)}
                                >
                                    {category}
                                </p>
                            ))}
                        </div>
                        <div className='w-80 mt-6'>
                            <p className='text-[#255957] font-bold text-2xl'>Источник</p>
                            {['Источник 1', 'Источник 2', 'Источник 3', 'Источник 4', 'Источник 5'].map(source => (
                                <p
                                    key={source}
                                    className={this.state.source === source ? 'text-[#255957] font-bold text-xl' : 'text-[#255957] font-light text-xl'}
                                    onClick={() => this.handleSourceChange(source)}
                                >
                                    {source}
                                </p>
                            ))}
                        </div>
                        { this.state.isFilterUnselected && <p className='text-[#ff0000] font-light text-sm text-center'>Вам нужно ввести хотя бы один фильтр</p> }
                        <button onClick={sumbitFilters} className='bg-[#255957] w-full rounded-xl p-2 mt-3 submit hover:opacity-50'>
                            <p className='text-white font-bold text-xl'>Применить</p>
                        </button>
                    </div>
                </div>
            )
        }
    };

    export default Filters;
