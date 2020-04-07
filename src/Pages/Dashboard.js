import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../Components/Layout";
import { data } from "../__Mocks__/Data/Hex";
import { USER } from "../Constants/Roles";
import { Box, Grid, Paper } from "@material-ui/core";

import C from "../Utils/Conversion";

import HexViewer from "../Components/HexEditor/HexViewer";
import { connect } from "react-redux";
import DataInspector from "../Components/Panels/DataInspector";

import RecyclerView from "../Components/RecyclerView";

const handleClick = (i) => (e) => {
  console.log(e);
  console.log(i);
}

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

const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .map(e => [1, 2, 3, 4, 5, 6, 7, 8, 9]).flat()
  .map(e => [1, 2, 3, 4, 5, 6, 7, 8, 9]).flat()
  .map(e => Math.random()).flat();

const listView = (data, i) => (<div key={i}>{data}</div>);

const hexStr = C.asciiToHex(data.ascii) || data.hex.replace(/ /g, "");

const packets = [1]
  // .map(v => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).flat()
  // .map(v => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).flat()
  .map(v => [1]).flat().map((v) => {
    const len = parseInt(128 / quantum) * quantum;
    // const len = parseInt((Math.random() * 1000) / quantum) * quantum;
    const str = C.strToHexChunks(hexStr.slice(len, len + len));
    return { len, str, offset, quantum };
  });

const list = [];
for (let i = 1; i <= 20000; i++) list.push({
  onClick: handleClick(i),
  data: { label: "Hex Code : " + (C.decimalToHex(i)) }
});
const HexView = (props) => (<HexViewer {...packets[0]} {...props} />);

const Dashboard = (props) => {
  const classes = useStyles();

  const { hexCode: { selectedHexCode } } = props;

  const [hexCode, setHexCode] = useState(selectedHexCode);

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
              <Paper>
                <RecyclerView
                  rootHeight={500}
                  itemHeight={20}
                  listData={listData}
                  listView={listView}
                />
              </Paper>
            </Grid>
          </Grid>

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