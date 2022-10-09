import { configureStore } from '@reduxjs/toolkit';
import accountreducer from './account';

export default configureStore({
    reducer:{
        accounts:accountreducer
    },
});