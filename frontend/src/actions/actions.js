import * as Services from '../services/services';

export const createWallet = (setStatus, setOpen) => {
    Services.apiCreateWallet()
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
            setOpen(true);
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const accessWallet = (privateKey, setStatus) => {
    Services.apiAccessWallet(privateKey)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
}

export const getBalance = (publicKey, setStatus) => {
    Services.apiGetBalance(publicKey)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const sendTransaction = (privateKey, publicKey, amount, setStatus) => {
    Services.apiSendTransaction(privateKey, publicKey, amount)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, message: response.data.message });
        } else {
            setStatus({ successful: false, message: response.data.message });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, message: 'ERROR!' });
    })
};

export const mineBlock = (privateKey, setStatus) => {
    Services.apiMineBlock(privateKey)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const getAllTransactions = (page, setStatus) => {
    Services.apiGetAllTransactions(page)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const getTransactionOfAddress = (publicKey, page, setStatus) => {
    Services.apiGetTransactionOfAddress(publicKey, page)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const getAllBlocks = (page, setStatus) => {
    Services.apiGetAllBlocks(page)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};

export const getBlockOfAddress = (publicKey, page, setStatus) => {
    Services.apiGetBlockOfAddress(publicKey, page)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
        } else {
            setStatus({ successful: false, data: null });
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
    })
};