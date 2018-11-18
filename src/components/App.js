import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CardSet from '../containers/CardSet';
import Paginator from '../containers/Paginator';
import CardDrawer from '../containers/CardDrawer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInitCacheRequest } from '../actions/index';
import Loading from '../containers/Loading';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
      backgroundColor: 'rgba(0,0,0,0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
});

class App extends Component {

    componentDidMount() {
        
        if (this.props.cardCache.cache.length === 0)
            this.props.fetchInitCacheRequest();         
    }

    render() {

        const { classes, activeCard, activeCardSet, activePageNumber, loading } = this.props;
        const totalNumberOfPagesInCache = this.props.cardCache.numberOfPages;

        const isTimeToRenderLoading = (loading && activePageNumber <= 1) || 
            (loading && activePageNumber - 1 === totalNumberOfPagesInCache);
        
        let isTimeToRenderCardSet = false;
        if ( activeCardSet !== undefined ) {
            if ( activeCardSet.cardSet.length !== 0 && !isTimeToRenderLoading) {
                isTimeToRenderCardSet = true;
            }
        }

        
        
        return (
            <Paper className={classes.root} elevation={1}>
                { isTimeToRenderLoading && <Loading /> }                 
                { isTimeToRenderCardSet && <CardSet /> }
                { !isTimeToRenderLoading && <Paginator /> }  
                {!!activeCard && <CardDrawer />}
            </Paper>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ activeCard, cardCache, activeCardSet, activePageNumber, loading }) { 
    return { activeCard, cardCache, activeCardSet, activePageNumber, loading };
} 

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchInitCacheRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
