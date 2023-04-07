import {Box, Skeleton, Typography} from "@mui/material";
import {useDarkness, useLightness} from "../../../../hooks";
import GradientLine from "../GradientLine/GradientLine.jsx";
import {styles} from "../GradientLine/styles.js";


const Gradient = ({selectedColor}) => {
  const lightArr = useLightness(selectedColor, 20, 5)
  const darkArr = useDarkness(selectedColor, 20, 5)

  return (
    <>
      {!Object.keys(selectedColor).length && <Typography>Выберите цвет для отображения тонов</Typography>}
      <Box sx={styles.wrapper}>
        {!Object.keys(selectedColor).length
          ? <SkeletonLine arr={lightArr}/>
          : <GradientLine colorsArr={lightArr.reverse()}/>
        }
      </Box>
      <Box sx={styles.wrapper}>
        {!Object.keys(selectedColor).length
          ? <SkeletonLine arr={darkArr}/>
          : <GradientLine colorsArr={darkArr}/>
        }
      </Box>
    </>
  )
}

const SkeletonLine = ({arr}) => (
  arr.map((_, i) =>
    <div key={i}>
      <Skeleton sx={styles.box} animation="pulse" variant="rectangular" />
      <Skeleton width="100%">
        <Typography mt={1}>.</Typography>
      </Skeleton>
    </div>
  )
)
export default Gradient;