import axios from 'axios';
import { loadConfig } from '../App';
import configureStore from '../configureStore';
import { LoadingState, updateLoading } from '../stores/system';
import SystemActionTypes from '../stores/system/system.action-types';

const Api = axios.create({
    baseURL: 'https://saving-grace-app.herokuapp.com'
});

export default Api;