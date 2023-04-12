import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import {ClickAwayListener, IconButton, InputAdornment, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {Link} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const HeaderSearch = ({sx, tags}) => {
  const [value, setValue] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [filteredTags, setFilteredTags] = useState(tags);

  useEffect(() => {
    if (value.length >= 2) {
      setIsVisible(true)
      setFilteredTags(tags.filter(tag => tag.toLowerCase().includes(value.toLowerCase())))
    } else {
      setIsVisible(false)
    }
  }, [value]);

  const handleClickAway = () => {
    setIsVisible(false)
  }

  const handleFocus = () => {
    value.length >= 2 && setIsVisible(true)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={sx}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Поиск…"
            inputProps={{'aria-label': 'Поиск'}}
            value={value}
            onChange={e => setValue(e.target.value)}
            onFocus={handleFocus}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setValue('')}
                  edge="end"
                  size='small'
                  sx={{mr: '5px'}}
                >
                  <ClearIcon fontSize='12px'/>
                </IconButton>
              </InputAdornment>}
          />
          <List
            tags={filteredTags}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </Search>
      </Box>
    </ClickAwayListener>
  );
}
export default HeaderSearch

const List = ({tags, isVisible, setIsVisible}) => {
  const styles = {
    list: {
      overflowY: 'auto',
      width: '100%',
      maxHeight: '300px',
      position: 'absolute',
      backgroundColor: 'common.second',
      borderRadius: '0 0 8px 8px',
    },
    item: {
      p: '6px 8px',
      cursor: 'pointer',
      '&:hover': {
        bgcolor: 'rgba(0,0,0,.2)'
      }
    }
  }
  return (
    <>
      {isVisible &&
        <Box className='hide-scroll' sx={styles.list}>
          {!tags.length
            ? <Typography sx={styles.item}>Ничего не найдено...</Typography>
            : tags.map((tag, i) =>
              <Link
                key={i}
                to={`category/${tag}`}
                onClick={() => setIsVisible(false)}
                className='menu-link'
              >
                <Typography component='span'>{tag}</Typography>
              </Link>
            )}
        </Box>}
    </>
  )
}