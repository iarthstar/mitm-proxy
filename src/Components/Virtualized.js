import React from "react";
import { AutoSizer, List } from "react-virtualized";

const Virtualized = (props) => {

  const {
    dataArray,
    rowHeight,
    overscan,
    useDynamicRowHeight,
    getRowHeight,
    rowRenderer
  } = props;

  const overscanRowCount = overscan;
  const rowCount = dataArray.length;

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref="List"
          height={height}
          overscanRowCount={overscanRowCount}
          rowCount={rowCount}
          rowHeight={useDynamicRowHeight ? getRowHeight : rowHeight}
          rowRenderer={rowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default Virtualized;