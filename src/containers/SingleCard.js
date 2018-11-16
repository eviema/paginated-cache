import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
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

    return(
      <Card>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              {cardData.id}
          </Typography>
          <Typography variant="h5" component="h2">
              {cardData.content}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
              {cardData.id}
          </Typography>
          <Typography component="p">
              {cardData.content}
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
