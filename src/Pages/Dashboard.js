import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";

import Layout from "./../Components/Common/Layout";
import DataInspectorPanel from "./../Components/Panels/DataInspectorPanel";
import ConnectionsPanel from "./../Components/Panels/ConnectionsPanel";

import { USER } from "./../Constants/Roles";
import PacketView from "./../Components/PacketsViewer/PacketView";
import NotesPanel from "../Components/Panels/NotesPanel";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
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

const Dashboard = (props) => {

  const { proxy: { packets } } = props;
  const classes = useStyles();

  const { hexCode: { selectedHexCode } } = props;

  const [hexCode, setHexCode] = useState(selectedHexCode);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setHexCode(selectedHexCode);
  }, [selectedHexCode]);

  return (
    <Layout title="Dashboard" role={USER} user={{}}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box>
          <Grid
            container
            direction="row"
            spacing={1}
          >
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <ConnectionsPanel />
              <DataInspectorPanel
                hexCode={hexCode}
              />
              <NotesPanel
                notes={notes}
                setNotes={setNotes}
              />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <PacketView
                packets={packets}
              />
            </Grid>
          </Grid>
        </Box>
      </main>
    </Layout >
  );
};

const mapStateToProps = state => ({
  hexCode: state.hexCode,
  proxy: state.proxy
});

export default connect(mapStateToProps, {
})(Dashboard);