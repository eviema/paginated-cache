import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleCard from '../components/SingleCard';
import { toggleCard } from '../actions/index';

const styles = {
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: '10px',
    width: '100%',
    height: '100%',
  },
};

class CardSet extends Component { 

  render() {

    const { classes } = this.props;

    const renderActiveCardSet = this.props.activeCardSet.map(card => {
      return (
        <Grid item xs={3} key={!!card && card.number}
            onClick={() => this.props.toggleCard(card, true)}>
          {!!card && <SingleCard cardData={card} />}
        </Grid>
      );
    });



    return (
      <div className={classes.container} id="card-set">
        <Grid container spacing={8} children={ renderActiveCardSet } /> 
      </div>
    );
  }
}

CardSet.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ activeCardSet, pageNumbers }) { 
  return { activeCardSet, pageNumbers };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleCard }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardSet));
