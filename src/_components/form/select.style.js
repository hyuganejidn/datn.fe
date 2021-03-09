export default () => ({
  select: {
    display: 'flex',
    minWidth: 240,
    background: 'red',
    borderStyle: 'none',
    borderRadius: 8,
    paddingLeft: 24,
    paddingTop: 14,
    paddingBottom: 15,
    boxShadow: 'none',
    '&:focus': {
      borderRadius: 8,
      background: 'red',
    },
    '&[aria-expanded="true"]': {
      // background: grey[50],
    },
    '& > div': {
      display: 'inline-flex', // this shows the icon in the SelectInput but not the dropdown
    },
  },
  icon: {
    // color: blue[500],
    right: 12,
    position: 'absolute',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  paper: {
    borderRadius: 4,
    marginTop: 8,
    maxHeight: `400px !important`,
    // maxHeight: 400,
  },
  list: {
    maxHeight: `400px !important`,

    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    paddingLeft: 8,
    background: 'red',
    '& li': {
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 8,
      paddingLeft: 8,
    },
    '& li:hover': {
      // background: blue[50],
      background: '#68d391',
    },
    '& li.Mui-selected': {
      color: 'black',
      background: 'red',
    },
    '& li.Mui-selected:hover': {
      // background: blue[50],
    },
  },
  listIcon: {
    minWidth: 32,
    display: 'none', // hide the ListItemIcon in the dropdown
  },
})
