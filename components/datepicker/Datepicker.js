"use client"
import { useState } from 'react';

const DatePickerLogic = () => {
    const MONTH_NAMES = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date();
    const [year, setYear] = useState(date.getFullYear());
    const [month, setMonth] = useState(date.getMonth());
    const [currentDay, setCurrentDay] = useState(date.getDate());
    const [datepickerValue, setDatepickerValue] = useState('');
    const [showDatepicker, setShowDatepicker] = useState(false);

    const getNoOfDays = () => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return new Array(daysInMonth).fill().map((_, index) => index + 1);
    };

    const initDate = () => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day}`;
    };

    const isToday = (day) => {
        const today = new Date();
        const [year, month, date] = datepickerValue.split('-');
        return today.getDate() === parseInt(date) && today.getMonth() + 1 === parseInt(month) && today.getFullYear() === parseInt(year);
    };

    const getDateValue = (day) => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setDatepickerValue(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
        setShowDatepicker(false);
    };

    return {
        MONTH_NAMES,
        DAYS,
        year,
        month,
        currentDay,
        datepickerValue,
        showDatepicker,
        getNoOfDays,
        initDate,
        isToday,
        getDateValue,
        setYear,
        setMonth,
        setCurrentDay,
        setDatepickerValue,
        setShowDatepicker,
    };
};

export default DatePickerLogic;