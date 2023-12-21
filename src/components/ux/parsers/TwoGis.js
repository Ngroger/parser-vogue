import React, { Component } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import regionsData from '../../../regions.json'; // Подключение JSON-файла
import categoriesData from '../../../categoriesOfAddress.json'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class TwoGis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: 'Казахстан',
            region: '',
            city: '',
            typeOfFile: 'Excel',
            category: '',
            subcategory: ''
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    };

    handleChangeFile = (event) => {
        this.setState({ typeOfFile: event.target.value });
    }

    render() {
        const { country, region, city } = this.state;
        const { category, subcategory } = this.state;

        const regions = regionsData[country] || {};
        const cities = regions[region] || [];

        const categoryList = Object.keys(categoriesData);

        return (
            <div className='w-screen p-2 justify-center items-center flex'>
                <div>
                    <div className='space-x-6 flex flex-row mt-6'>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="country-label" color="success">Страна</InputLabel>
                                <Select
                                    color="success"
                                    labelId="country-label"
                                    id="country-select"
                                    value={country}
                                    label="Страна"
                                    name='country'
                                    onChange={this.handleChange}
                                >
                                    <MenuItem color="success" value="Казахстан">Казахстан</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth color="success">
                                <InputLabel id="region-label">Регион</InputLabel>
                                <Select
                                    labelId="region-label"
                                    color="success"
                                    id="region-select"
                                    value={region}
                                    label="Регион"
                                    name='region'
                                    onChange={this.handleChange}
                                >
                                    {Object.keys(regions).map((regionName) => (
                                        <MenuItem color="success" key={regionName} value={regionName}>
                                            {regionName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth color="success">
                                <InputLabel id="city-label" color="success">Город</InputLabel>
                                <Select
                                    labelId="city-label"
                                    id="city-select"
                                    value={city}
                                    label="Город"
                                    name='city'
                                    onChange={this.handleChange}
                                >
                                    {cities.map((cityName) => (
                                        <MenuItem key={cityName} value={cityName}>
                                            {cityName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='flex flex-row justify-center items-center mt-2 space-x-3'>
                        <p className='text-[#255957] text-xl font-bold'>Выберите категории данных:</p>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth color="success">
                                <InputLabel id="category-label">Категория</InputLabel>
                                <Select
                                labelId="category-label"
                                color="success"
                                id="category-select"
                                value={category}
                                label="Категория"
                                name='category'
                                onChange={this.handleChange}
                                >
                                {categoryList.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                    {cat}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            </Box>

                            {/* Выбор подкатегории */}
                            <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth color="success">
                                <InputLabel id="subcategory-label">Подкатегория</InputLabel>
                                <Select
                                labelId="subcategory-label"
                                color="success"
                                id="subcategory-select"
                                value={subcategory}
                                label="Подкатегория"
                                name='subcategory'
                                onChange={this.handleChange}
                                >
                                {categoriesData[category] &&
                                    categoriesData[category].map((subcat) => (
                                    <MenuItem key={subcat} value={subcat}>
                                        {subcat}
                                    </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div className='flex flex-row justify-center items-center mt-2 space-x-3'>
                        <p className='text-[#255957] text-xl font-bold'>Выберите тип файла:</p>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={this.state.typeOfFile}
                                onChange={this.handleChangeFile}
                            >
                            <FormControlLabel value="Excel" control={<Radio color='success'/>} label="Excel" />
                            <FormControlLabel value="Docx" control={<Radio color='success'/>} label="Docx" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <button className='w-full p-2 bg-[#255957] rounded-2xl mt-10 hover:opacity-50'>
                        <p className='text-white text-2xl font-bold'>Начать парсинг</p>
                    </button>   
                </div>
            </div>
        );
    }
}

export default TwoGis;
