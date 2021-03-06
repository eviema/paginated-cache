import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  updateCardSetRequest,
  updateCacheRequest,
  updateActivePageNumber
} from "../actions/index";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  paginatorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0 72px 0"
  }
});

const handleButtonClick = (props, newPageNumber) => {
  props.updateActivePageNumber(newPageNumber);
  props.updateCardSetRequest(newPageNumber);

  const pageNumbers = props.cardCache.pageNumbers;
  if (!pageNumbers.includes(newPageNumber + 1)) {
    props.updateCacheRequest();
  }
};

const Paginator = props => {
  const { classes } = props;
  const activePageNumber = props.pageNumbers.activePageNumber;
  const lastPageNumber = props.pageNumbers.lastPageNumber;

  return (
    <div className={classes.paginatorContainer} id="paginator">
      <Button
        color="primary"
        className={classes.button}
        disabled={activePageNumber === 1}
        onClick={() => handleButtonClick(props, activePageNumber - 1)}
      >
        BACK
      </Button>
      <div>
        Page {activePageNumber} of {lastPageNumber}
      </div>
      <Button
        color="primary"
        className={classes.button}
        disabled={activePageNumber === lastPageNumber}
        onClick={() => handleButtonClick(props, activePageNumber + 1)}
      >
        NEXT
      </Button>
    </div>
  );
};

Paginator.propTypes = {
  classes: PropTypes.object.isRequired,
  pageNumbers: PropTypes.object.isRequired,
  cardCache: PropTypes.object.isRequired,
  updateCardSetRequest: PropTypes.func.isRequired,
  updateCacheRequest: PropTypes.func.isRequired,
  updateActivePageNumber: PropTypes.func.isRequired
};

function mapStateToProps({ pageNumbers, cardCache }) {
  return { pageNumbers, cardCache };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateCardSetRequest, updateCacheRequest, updateActivePageNumber },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Paginator));
