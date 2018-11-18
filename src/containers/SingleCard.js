import React, { Component } from 'react';
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
    height: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SingleCard extends Component {

  render() {
    
    const { classes, cardData } = this.props;
    const ellipsis = '...';

    return(
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              {cardData.state}
          </Typography>
          <Typography variant="h5" component="h2">
              {cardData.number}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
              Application: {cardData.application}
              <br />
              Assignee: {cardData.assignee}
          </Typography>
          <Typography component="p">
              {cardData.shortDescription.slice(0, 40)}
              {cardData.shortDescription.length >= 40 && <span>{ellipsis}</span>}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
  }
}

SingleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleCard);
