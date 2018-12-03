import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Loading from "../components/Loading";
import CardSet from "./CardSet";
import Paginator from "./Paginator";
import CardDrawer from "./CardDrawer";
import ErrorPage from "./ErrorPage";
import { fetchInitCacheRequest } from "../actions/index";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class App extends Component {
  componentDidMount() {
    const { cardCache } = this.props;
    if (cardCache.cache.length === 0 && !cardCache.error)
      this.props.fetchInitCacheRequest();
  }

  render() {
    const {
      classes,
      activeCard,
      activeCardSet,
      loading,
      cardCache
    } = this.props;
    const pageNumbersInCache = cardCache.pageNumbers;
    const errorMessage = cardCache.error;
    const activePageNumber = this.props.pageNumbers.activePageNumber;

    const isTimeToRenderLoading =
      ((loading && activePageNumber < 1) ||
        (loading && !pageNumbersInCache.includes(activePageNumber))) &&
      !errorMessage;

    let isTimeToRenderCardSet = false;
    if (activeCardSet !== undefined) {
      if (activeCardSet.length !== 0 && !isTimeToRenderLoading) {
        isTimeToRenderCardSet = true;
      }
    }

    return (
      <Paper className={classes.root} id="paper" elevation={1}>
        {isTimeToRenderLoading && <Loading />}
        {isTimeToRenderCardSet && <CardSet />}
        {!errorMessage && <Paginator />}
        {!!activeCard && <CardDrawer />}
        {!!errorMessage && <ErrorPage error={errorMessage} />}
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchInitCacheRequest: PropTypes.func.isRequired,
  activeCard: PropTypes.object.isRequired,
  cardCache: PropTypes.object.isRequired,
  activeCardSet: PropTypes.array.isRequired,
  pageNumbers: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps({
  activeCard,
  cardCache,
  activeCardSet,
  pageNumbers,
  loading
}) {
  return { activeCard, cardCache, activeCardSet, pageNumbers, loading };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchInitCacheRequest }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
