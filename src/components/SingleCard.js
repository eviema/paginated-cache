import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  state: { fontSize: 14 },
  app_assignee: { marginBottom: 12 },
  shortDesc: { marginBottom: 30 },
  ellipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
    width: "100%",
    minWidth: "1px"
  },
  cardActions: {
    position: "absolute",
    left: 0,
    bottom: 0
  }
};

const SingleCard = props => {
  const { classes, cardData } = props;

  return (
    <Card className={classes.card} id="card">
      <CardContent>
        <Typography
          className={classes.state}
          color="textSecondary"
          gutterBottom
        >
          {cardData.state}
        </Typography>
        <Typography variant="h5" component="h2">
          {cardData.number}
        </Typography>
        <Typography
          className={`${classes.app_assignee} ${classes.ellipsis}`}
          color="textSecondary"
        >
          Application: {cardData.application}
          <br />
          Assignee: {cardData.assignee}
        </Typography>
        <Typography
          className={`${classes.shortDesc} ${classes.ellipsis}`}
          component="p"
        >
          {cardData.shortDescription}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

SingleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardData: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleCard);
