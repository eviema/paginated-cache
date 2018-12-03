import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleCard } from "../actions/index";

const styles = {
  table: {
    width: "40vw"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "8px 8px"
  },
  heading: {
    padding: "24px"
  }
};

function toggleDrawer(props) {
  props.toggleCard({
    card: {},
    isSelected: false
  });
}

const CardDrawer = props => {
  window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

  const { classes, activeCard } = props;

  if (!activeCard.isSelected) {
    return <div />;
  }

  const cardDetailRows = Object.keys(activeCard.card).map(key => {
    return { [key]: activeCard.card[key] };
  });

  const cardDetails = cardDetailRows.map(row => {
    const key = Object.keys(row)[0];
    const value = row[key];

    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row">
          {key}
        </TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <Drawer
        anchor="right"
        id="drawer"
        open={props.activeCard.isSelected}
        onClose={() => toggleDrawer(props)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => toggleDrawer(props)}>
            <CancelIcon />
          </IconButton>
        </div>
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggleDrawer(props)}
          onKeyDown={() => toggleDrawer(props)}
        >
          <Typography variant="h6" className={classes.heading}>
            {activeCard.card.number}
          </Typography>
          <Table className={classes.table}>
            <TableBody>{cardDetails}</TableBody>
          </Table>
        </div>
      </Drawer>
    </div>
  );
};

CardDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  activeCard: PropTypes.object.isRequired,
  toggleCard: PropTypes.func.isRequired
};

function mapStateToProps({ activeCard }) {
  return { activeCard };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleCard }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CardDrawer));
