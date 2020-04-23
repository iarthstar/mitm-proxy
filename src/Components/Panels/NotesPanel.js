import React from "react";

import Box from "@material-ui/core/Box";

import Panel from "./../Common/Panel";
import TextField from "@material-ui/core/TextField";

const NotesPanel = (props) => {

  const { notes, setNotes } = props;

  const handleChange = ({target: { value }}) => setNotes(value);

  return (
    <Panel heading="Notes">
      <Box className="w-100">
        <TextField
          id="outlined-multiline-static"
          label="Notes"
          multiline
          rows="4"
          variant="outlined"
          value={notes}
          onChange={handleChange}
          fullWidth
        />
      </Box>
    </Panel>
  );
};

export default NotesPanel;