import {useState} from "react";

const usePopper = (elementId) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = open && Boolean(anchorEl);
  const popperId = isOpen ? elementId : undefined;

  const openPopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };

  const closePopper = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  return [anchorEl, popperId, isOpen, openPopper, closePopper]
}

export default usePopper