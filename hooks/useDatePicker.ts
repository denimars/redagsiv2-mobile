import { useState } from 'react';

export const useDatePicker = () => {
    const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
    const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleData = (type: 'start' | 'end') => (date: Date) => {
        if (type === 'start') {
            setStartDate(date);
            setIsStartPickerVisible(false);
        } else {
            setEndDate(date);
            setIsEndPickerVisible(false);
        }
    };

    return {
        isStartPickerVisible,
        setIsStartPickerVisible,
        isEndPickerVisible,
        setIsEndPickerVisible,
        startDate,
        endDate,
        handleData
    };
};