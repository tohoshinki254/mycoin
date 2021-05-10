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
            alert('Send transaction successfully !');
        } else {
            setStatus({ successful: false, message: response.data.message });
            alert(response.data.message);
        }
    })
    .catch((error) => {
        setStatus({ successful: false, message: 'ERROR!' });
        alert('ERROR!');
    })
};

export const mineBlock = (privateKey, setStatus, setProgress) => {
    Services.apiMineBlock(privateKey)
    .then((response) => {
        if (response.status === 200) {
            setStatus({ successful: true, data: response.data });
            setProgress(false);
        } else {
            setStatus({ successful: false, data: null });
            alert(response.data.message);
        }
    })
    .catch((error) => {
        setStatus({ successful: false, data: null });
        alert('ERROR!');
    })
};

export const getAllTransactions = (page, setPage, setTotalPage, setListTransactions) => {
    Services.apiGetAllTransactions(page)
    .then((response) => {
        if (response.status === 200) {
            setPage(response.data.curPage);
            setTotalPage(response.data.totalPages);
            setListTransactions(response.data.data)
        } else {
            setPage(0);
            setTotalPage(0);
            setListTransactions([]);
            alert('ERROR!');
        }
    })
    .catch((error) => {
        setPage(0);
        setTotalPage(0);
        setListTransactions([]);
        alert('ERROR!');
    })
};

export const getTransactionOfAddress = (publicKey, page, setPage, setTotalPage, setListTransactions) => {
    Services.apiGetTransactionOfAddress(publicKey, page)
    .then((response) => {
        if (response.status === 200) {
            setPage(response.data.curPage);
            setTotalPage(response.data.totalPages);
            setListTransactions(response.data.data);
        } else {
            setPage(0);
            setTotalPage(0);
            setListTransactions([]);
            alert(response.data.message);
        }
    })
    .catch((error) => {
        setPage(0);
        setTotalPage(0);
        setListTransactions([]);
        alert('ERROR!');
    })
};

export const getAllBlocks = (page, setPage, setTotalPage, setListBlocks) => {
    Services.apiGetAllBlocks(page)
    .then((response) => {
        if (response.status === 200) {
            setPage(response.data.curPage);
            setTotalPage(response.data.totalPages);
            setListBlocks(response.data.data);
        } else {
            setPage(0);
            setTotalPage(1);
            setListBlocks([]);
            alert(response.data.message);
        }
    })
    .catch((error) => {
        setPage(0);
        setTotalPage(1);
        setListBlocks([]);
        alert('ERROR!');
    })
};

export const getBlockOfAddress = (publicKey, page, setPage, setTotalPage, setListBlocks) => {
    Services.apiGetBlockOfAddress(publicKey, page)
    .then((response) => {
        if (response.status === 200) {
            setPage(response.data.curPage);
            setTotalPage(response.data.totalPages);
            setListBlocks(response.data.data);
        } else {
            setPage(0);
            setTotalPage(0);
            setListBlocks([]);
            alert(response.data.message);
        }
    })
    .catch((error) => {
        setPage(0);
        setTotalPage(0);
        setListBlocks([]);
        alert('ERROR!');
    })
};