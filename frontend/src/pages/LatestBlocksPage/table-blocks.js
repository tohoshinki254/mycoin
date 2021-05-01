import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import BlockItem from './block-item';
import TableTitle from './table-title';
import Pagination from '@material-ui/lab/Pagination';

const TableBlocks = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [blockList, setBlockList] = useState([]);

    return (
        <>
            <Grid className={classes.container} container>
                <TableTitle />
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
                <BlockItem />
            </Grid>
            <Grid style={{ marginTop: '2%' }} container justify='center'>
                <Pagination count={totalPage} page={page} color='primary' size='large' />
            </Grid>
        </>
    )
}

const useStyles = makeStyles({
    container: {
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '2%',
        height: '75%'
    },
});

export default TableBlocks;