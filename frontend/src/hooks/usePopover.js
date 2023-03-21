import {useState} from "react";

const usePopover = (elementId) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const popoverId = isOpen ? elementId : undefined;

  const showPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const hidePopover = () => {
    setAnchorEl(null);
  };

  return [anchorEl, popoverId, isOpen, showPopover, hidePopover]
}

export default usePopover