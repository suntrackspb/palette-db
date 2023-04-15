export const styles = {
  colorCodesWrapper: {
    width: '225px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  code: {
    mx: '20px',
    cursor: 'pointer',
    fontSize: '15px',
    lineHeight: '15px',
    borderRadius: 1,
    transition: '.2s',
    maxWidth: 'fit-content',
    p: '6px',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,.1)'
    }
  },
  listItem: {
    display: 'flex',
    p: 0,
    bgcolor: 'common.first',
    color: 'text.primary',
    // boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    borderRadius: 1,
    overflow: 'hidden'
  },
  colorBox: {
    width: '125px',
    height: '72px',
    cursor: 'pointer',
    transition: 'background-color .25s'
  },
  undoIconBtn: {
    '&:hover': {
      bgcolor: 'rgba(255,255,255,.1)'
    }
  },
  undoIcon: {
    color: 'text.primary',
    fontSize: 26
  },
  popperCopy: {
    bgcolor: 'rgba(0,0,0,.8)',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: 1
  }
}