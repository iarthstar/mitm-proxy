import React from "react";
import { chunk } from "lodash";
import { Grid, Typography, Box } from "@material-ui/core";
import ChunkHex from "./ChunkHex";

const HexViewer = (props) => {
  const { len, str, quantum, offset } = props;

  return (
    <Box p={2}>
      <Grid
        container
        direction="row"
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          Length: {len}
          <Typography style={{ fontFamily: "Source Code Pro" }}>
            {chunk(str, offset).map((v, i) => (
              <span key={"line-" + i}>
                {chunk(v, quantum).map((e, i) => (
                  <><ChunkHex
                    key={"chunk-" + i}
                    chunk={e}
                    seperator={<></>}
                    quantum={quantum}
                  /> &nbsp; </>
                ))}
                <br />
              </span>
            ))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HexViewer;