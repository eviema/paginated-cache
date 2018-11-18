import React from 'react';
import { connect } from 'react-redux'
import img from '../assets/loading_spinner.gif'

function Loading(props) {
    const loading = props.loading;
    const activePageNumber = props.activePageNumber;
    const totalNumberOfPagesInCache = props.cardCache.numberOfPages;

    console.log('loading: ', loading);
    console.log('activePageNumber: ', activePageNumber);
    console.log('totalNumberOfPagesInCache: ', totalNumberOfPagesInCache);

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

function mapStateToProps({ loading, activePageNumber, cardCache }) { 
    return { loading, activePageNumber, cardCache };
}
// const mapStateToProps = (state) => ({ loading });

export default connect(mapStateToProps)(Loading);