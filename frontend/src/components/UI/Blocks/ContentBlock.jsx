import {Paper} from "@mui/material";
const styles = {
  block: {
    p: [2,2,3,3,4],
    flex: 1,
    bgcolor: 'common.first',
    backgroundImage: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
}

const ContentBlock = ({children, styleProps, ...props}) => {
  return (
    <Paper elevation={4} sx={{...styles.block, ...styleProps}} {...props}>
      {children}
    </Paper>
  );
};

export default ContentBlock;