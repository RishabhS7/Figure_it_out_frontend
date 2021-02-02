import React from 'react';
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Chip, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root1: {
    display: 'flex',
    justifyContent: 'flex-end',
    justify: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  root2: {
    display: 'flex',
    justifyContent: 'flex-start',
    justify: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  breadCrumbRight: {
    alignSelf: 'right',
  },
}));
interface props {
  userName: string;
  selectedWord: string;
  message: any;
}
const Message = ({
  message: { text, user },
  userName,
  selectedWord,
}: props) => {
  const classes = useStyles();
  let isSentByCurrentUser = false;
  const trimmedUserName = userName.trim().toLowerCase();
  if (user === trimmedUserName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    text != selectedWord ? (
      <div className={classes.root1}>
        <Grid zeroMinWidth>
          <StyledBreadcrumb label={text} />
        </Grid>
      </div>
    ) : (
      <div className={classes.root1}>
        <div>
          <StyledBreadcrumb1 label={text} />
        </div>
      </div>
    )
  ) : text != selectedWord ? (
    <div className={classes.root2}>
      <div>
        {' '}
        <StyledBreadcrumb label={user} />
      </div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb label={text} />
      </Breadcrumbs>
    </div>
  ) : (
    <div className={classes.root2}>
      <div>
        {' '}
        <StyledBreadcrumb label={user} />
      </div>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb1 label="I guessed the right answer" />
      </Breadcrumbs>
    </div>
  );
};

export default Message;

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const StyledBreadcrumb1 = withStyles((theme) => ({
  root: {
    backgroundColor: '#14A76C',
    height: theme.spacing(3),
    color: 'white',
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: 'green',
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);
