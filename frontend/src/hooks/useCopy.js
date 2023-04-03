import usePopper from "./usePopper.js";
import {copyToClipboard} from "../utils/copyToClipboard.js";
import {useEffect} from "react";

const UseCopy = (elementId) => {
  const [copyAnchor, copyId, isCopyOpen, showCopy, hideCopy] = usePopper(elementId)

  const copyColor = e => {
    copyToClipboard(e)
    showCopy(e)
  }

  useEffect(() => {
    if (isCopyOpen) {
      setTimeout(hideCopy, 350)
    }
  }, [isCopyOpen]);

  return {copyAnchor, copyId, isCopyOpen, copyColor}
};

export default UseCopy;