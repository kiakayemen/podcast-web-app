import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: 0,
            title: "اینترو",
            content: "Content for اینترو",
            time: 0,
            isActive: false,
        },
        {
            id: 1,
            title: "لیموهاست",
            content: "Content for لیموهاست",
            time: 90,
            isActive: false,
        },
        {
            id: 2,
            title: "معرفی گنجه",
            content: "Content for معرفی گنجه",
            time: 158,
            isActive: false,
        },
        {
            id: 3,
            title: "معرفی بچه ها",
            content: "Content for معرفی بچه ها",
            time: 1160,
            isActive: false,
        },
        {
            id: 4,
            title: "چهارتا هم بنیانگذار!",
            content: "Content for چهارتا هم بنیانگذار!", time: 1600,
            isActive: false,
        },
        {
            id: 5,
            title: "از دانشجو تا بنیان گذار",
            content: "Content for از دانشجو تا بنیان گذار", time: 2276,
            isActive: false,
        },
        {
            id: 6,
            title: "درباره لاجستیک",
            content: "Content for درباره لاجستیک",
            time: 3000,
            isActive: false,
        },
        {
            id: 7,
            title: "ادامه داستان",
            content: "Content for ادامه داستان",
            time: 3340,
            isActive: false,
        },
        {
            id: 8,
            title: "گنجه دقیقا چیکار می کنه؟",
            content: "Content for گنجه دقیقا چیکار می‌کنه؟", time: 4659,
            isActive: false,
        },
        {
            id: 9,
            title: "ادامه داستان",
            content: "Content for ادامه داستان",
            time: 5445,
            isActive: false,
        },
        {
            id: 10,
            title: "بیزنس و سیاست",
            content: "Content for بیزنس و سیاست",
            time: 6313,
            isActive: false,
        },
        {
            id: 11,
            title: "اجاره میدین یا اجاره میگیرین؟",
            content: "Content for اجاره میدین یا اجاره میگیرین؟",
            time: 6710,
            isActive: false,
        },
        {
            id: 12,
            title: "دور دوم جذب سرمایه",
            content: "Content for دور دوم جذب سرمایه",
            time: 6951,
            isActive: false,
        },
        {
            id: 13,
            title: "حال و آینده گنجه",
            content: "Content for حال و آینده گنجه",
            time: 7065,
            isActive: false,
        },
        {
            id: 14,
            title: "ایران میمونید؟",
            content: "Content for ایران میمونید؟",
            time: 7420,
            isActive: false,
        },
    ]
};

const episodeFractionsSlice = createSlice({
    name: 'episodeFractions',
    initialState,
    reducers: {
        setActiveItem(state, action) {
            state[action.payload].isActive = !state[action.payload].isActive;

        }
    }
});

export const { setActiveItem } = episodeFractionsSlice.actions;

export default episodeFractionsSlice.reducer;