import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  state: {
    fontSize: 14,
  },
  app_assignee: {
    marginBottom: 12,
  },
  shortDesc: {
    overflow: 'hidden',
    marginBottom: 30,
  },
  cardActions: {
    position: "absolute",
    left: 0,
    bottom: 0,
  }
};

function SingleCard(props) {

  const { classes, cardData } = props;
  const ellipsis = '...';

  return(
    <Card className={classes.card} id="card">
      <CardContent>
        <Typography className={classes.state} color="textSecondary" gutterBottom>
            {cardData.state}
        </Typography>
        <Typography variant="h5" component="h2">
            {cardData.number}
        </Typography>
        <Typography className={classes.app_assignee} color="textSecondary">
            Application: {cardData.application}
            <br />
            Assignee: {cardData.assignee}
        </Typography>
        <Typography className={classes.shortDesc} component="p">
            {cardData.shortDescription.slice(0, 40)}
            {cardData.shortDescription.length >= 40 && <span>{ellipsis}</span>}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
  
}

SingleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleCard);
