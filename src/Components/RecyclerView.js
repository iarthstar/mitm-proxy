import React, { useState, useRef } from "react";
import PropTypes from 'prop-types';
import { useEffect } from "react";


const RecyclerView = (props) => {
  const { listView, listData, rootHeight, itemHeight } = props;

  const [children, setChildren] = useState([]);
  const [scrollPositionY, setScrollPositionY] = useState(0);

  const listDataLength = listData.length;
  const scrollOffset = itemHeight;
  const totalHeight = itemHeight * listDataLength;
  const visibleChildrenLength = rootHeight / itemHeight;

  const handleWheel = (e) => {
    const elemIndex = scrollPositionY / scrollOffset;

    if (elemIndex + visibleChildrenLength >= listDataLength && e.deltaY > 0) 
      return;

    if (e.deltaY < 0 && scrollPositionY >= itemHeight) {
      setScrollPositionY(scrollPositionY - scrollOffset);
    } else if (e.deltaY > 0 && scrollPositionY <= totalHeight) {
      setScrollPositionY(scrollPositionY + scrollOffset);
    }
    setChildren(listData.slice(elemIndex, elemIndex + visibleChildrenLength));
  }

  useEffect(() => {
    setChildren(listData.slice(0, visibleChildrenLength));
  }, []);

  return (
    <div
      onWheel={handleWheel}
      style={{
        height: rootHeight + "px",
        width: "100%",
        overflow: "scroll"
      }}
      children={children.map(listView)}
    />
  );
};

RecyclerView.propTypes = {
  rootHeight: PropTypes.number,
  itemHeight: PropTypes.number,
  listView: PropTypes.func,
  listData: PropTypes.array
}

export default RecyclerView;