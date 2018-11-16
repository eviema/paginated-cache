import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { updatePageRequest } from '../actions/index';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    paginatorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        bottom: '0',
        marginBottom: '24px',
    }
});

class Paginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeCardSet: this.props.activeCardSet || [],
            cardsPerPage: 12,
            activePageNumber: this.props.activePageNumber.pageNumber,
        };
    }

    handleBackButtonClick = (event, newPageNumber) => {
        this.setState({ 
            activePageNumber: newPageNumber,
        });
        this.props.updatePageRequest(newPageNumber);
    };

    handleNextButtonClick = (event, newPageNumber) => {
        this.setState({ 
            activePageNumber: newPageNumber,
        });
        this.props.updatePageRequest(newPageNumber);
    };


    render() {
        
        const { classes } = this.props;
        const { activePageNumber } = this.state;
        const totalNumberOfPagesInCache = this.props.cardCache.numberOfPages;

        return(
            <div className={classes.paginatorContainer}>
                <Button color="primary" className={classes.button}
                    disabled={activePageNumber === 1}
                    onClick={(e) => 
                        this.handleBackButtonClick(
                            e, 
                            activePageNumber - 1
                        )
                    }
                >
                    BACK
                </Button>
                <div>
                    Page {activePageNumber} of {totalNumberOfPagesInCache}
                </div>
                <Button color="primary" className={classes.button}
                    disabled={activePageNumber === {totalNumberOfPagesInCache}}
                    onClick={(e) => 
                        this.handleNextButtonClick(
                            e, 
                            activePageNumber + 1
                        )
                    }
                >
                    NEXT
                </Button>
            </div>
        );
    }
}

Paginator.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({ activePageNumber, cardCache }) { 
    return { activePageNumber, cardCache };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updatePageRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Paginator));