export const styles = {
  img: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover + ul': {
      opacity: 1,
      visibility: 'visible'
    }
  },
  noImg: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    '&:hover + ul': {
      opacity: 1,
      visibility: 'visible'
    }
  },
  list: {
    bgcolor: 'common.second',
    mt: '5px',
    position: 'absolute',
    width: 'max-content',
    flexDirection: 'column',
    borderRadius: 2,
    overflow: 'hidden',
    textAlign: 'center',
    display: 'flex',
    visibility: 'hidden',
    opacity: 0,
    transition: 'ease .35s .2s',
    '&:hover': {
      visibility: 'visible',
      opacity: 1
    }
  },
  item: {
    p: '10px',
    cursor: 'pointer',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,.2)'
    }
  }
}