import axios from 'axios';
import { API_URL } from '../global/constants';

export const apiCreateWallet = () => {
    return axios.post(API_URL + 'wallet', {});
};

export const apiAccessWallet = (privateKey) => {
    return axios.post(API_URL + 'access', {
        privateKey: privateKey
    });
};

export const apiGetBalance = (publicKey) => {
    return axios.post(API_URL + 'balance', {
        address: publicKey
    });
};

export const apiSendTransaction = (privateKey, publicKey, amount) => {
    return axios.post(API_URL + 'transaction', {
        sender: privateKey,
        receiver: publicKey,
        amount: amount
    });
};

export const apiMineBlock = (privateKey) => {
    return axios.post(API_URL + 'mineBlock', {
        privateKey: privateKey
    });
};

export const apiGetAllTransactions = (page) => {
    return axios.get(API_URL + 'transaction', {
        params: {
            page: page
        }
    });
};

export const apiGetTransactionOfAddress = (publicKey, page) => {
    return axios.get(API_URL + 'address-transaction', {
        params: {
            address: publicKey,
            page: page
        }
    });
};

export const apiGetAllBlocks = (page) => {
    return axios.get(API_URL + 'block', {
        params: {
            page: page
        }
    });
};

export const apiGetBlockOfAddress = (publicKey, page) => {
    return axios.get(API_URL + 'address-block', {
        params:{
            address: publicKey,
            page: page
        }
    });
};