import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SingleCard from "../components/SingleCard";
import { toggleCard } from "../actions/index";

const styles = {
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: "10px",
    width: "95%"
  }
};

const CardSet = props => {
  const { classes } = props;

  const renderActiveCardSet = props.activeCardSet.map(card => {
    return (
      <Grid
        item
        xs={3}
        key={!!card && card.number}
        onClick={() => props.toggleCard(card, true)}
      >
        {!!card && <SingleCard cardData={card} />}
      </Grid>
    );
  });

  return (
    <div className={classes.container} id="card-set">
      <Grid container spacing={8} children={renderActiveCardSet} />
    </div>
  );
};

CardSet.propTypes = {
  classes: PropTypes.object.isRequired,
  activeCardSet: PropTypes.array.isRequired,
  pageNumbers: PropTypes.object.isRequired,
  toggleCard: PropTypes.func.isRequired
};

function mapStateToProps({ activeCardSet, pageNumbers }) {
  return { activeCardSet, pageNumbers };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleCard }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CardSet));
