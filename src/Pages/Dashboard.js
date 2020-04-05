import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Components/Layout";
import { data } from "../__Mocks__/Data/Hex";
import { USER } from "../Constants/Roles";
import { Box, Grid, TextField } from "@material-ui/core";

import C from "../Utils/Conversion";

import HexViewer from "../Components/HexEditor/HexViewer";
// import BinaryView from "../Components/HexEditor/BinaryView";
import { connect } from "react-redux";
import DataInspector from "../Components/Panels/DataInspector";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  }
}));

const quantum = 4;
const offset = 16;

const hexStr = C.asciiToHex(data.ascii) || data.hex.replace(/ /g, "");

const packets = [1]
  // .map(v => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).flat()
  // .map(v => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).flat()
  .map(v => [1]).flat().map((v) => {
    const len = parseInt((Math.random() * 1000) / quantum) * quantum;
    const str = C.strToHexChunks(hexStr.slice(len, len + len));
    return { len, str, offset, quantum };
  });

const Dashboard = (props) => {
  const classes = useStyles();

  const { hexCode: { selectedHexCode } } = props;

  const [hexCode, setHexCode] = useState(selectedHexCode);

  const dataList = [...packets];

  // const view = (props) => <HexViewer {...props} />;

  useEffect(() => {
    setHexCode(selectedHexCode);
  }, [selectedHexCode]);

  return (
    <Layout title="Dashboard" role={USER}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box>
          <Grid
            container
            direction="row"
            spacing={1}
          >
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <DataInspector
                hexCode={hexCode}
                setHexCode={setHexCode}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <HexViewer {...dataList[0]} />
            </Grid>
          </Grid>

          {/* <RecyclerView
            dataList={dataList}
            view={view}
          /> */}
        </Box>
      </main>
    </Layout >
  );
};

const mapStateToProps = state => ({
  hexCode: state.hexCode
});

export default connect(mapStateToProps, {

})(Dashboard);