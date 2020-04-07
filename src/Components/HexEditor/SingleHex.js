import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import _ from "lodash";

import { setHexCode } from "../../Redux/Actions/HexCode";

const useStyles = makeStyles(theme => ({
  hexSpan: {
    height: "28px",
    lineHeight: "28px",
    textAlign: "center",
    cursor: "pointer",
    padding: "0px 4px 0px 4px",
    "&:hover": {
      background: "#F5005755"
    }
  }
}));

const SingleHex = (props) => {
  const classes = useStyles();

  const {
    hex,
    setHexCode
  } = props;

  return (
    <span
      className={classes.hexSpan}
      data-hex={hex}
      onClick={() => setHexCode(hex)}
    >
      {hex.toUpperCase()}
    </span>
  );
}

const mapStateToProps = st => ({});

export default connect(mapStateToProps, {
  setHexCode
})(SingleHex);