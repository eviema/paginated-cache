import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleCard from './SingleCard';
import { toggleCard } from '../actions/index';

const styles = {
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '10px',
    width: '100%',
    height: '100%'
  },
};

class CardSet extends Component { 

  render() {

    const { classes } = this.props;

    console.log("card set just updated and used in CardSet.js: ", this.props.activeCardSet.cardSet);
    const activeCardSet = this.props.activeCardSet.cardSet.map(card => {
      return (
        <Grid item xs={3} key={!!card && card.number}
            onClick={() => this.props.toggleCard(card, true)}>
          {!!card && <SingleCard cardData={card} />}
        </Grid>
      );
    });



    return (
      <div className={classes.root}>
        <Grid container spacing={8} children={ activeCardSet } /> 
      </div>
    );
  }
}

CardSet.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ activeCardSet, activePageNumber }) { 
  return { activeCardSet, activePageNumber };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardSet));
