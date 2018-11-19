import React from 'react';
import { connect } from 'react-redux'
import img from '../assets/loading_spinner.gif'

function Loading(props) {
    const loading = props.loading;
    const activePageNumber = props.pageNumbers.activePageNumber;
    const totalNumberOfPagesInCache = props.cardCache.numberOfPages;

    return (
        (
            (loading && activePageNumber <= 1) || 
            (loading && activePageNumber - 1 === totalNumberOfPagesInCache)
        ) ? 
        <div style={{ textAlign: 'center' }}>
            <img src={img} alt='loading' />
            <h1>LOADING</h1>
        </div> :
        null
    )

}

function mapStateToProps({ loading, pageNumbers, cardCache }) { 
    return { loading, pageNumbers, cardCache };
}

export default connect(mapStateToProps)(Loading);