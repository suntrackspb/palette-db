import {Paper} from "@mui/material";
import {styles} from "./styles";

const ContentBlock = ({children, styleProps, ...props}) => {
  return (
    <Paper elevation={4} sx={{...styles.block, ...styleProps}} {...props}>
      {children}
    </Paper>
  );
};

export default ContentBlock;