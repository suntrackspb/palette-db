import React, {memo} from 'react';
import {List, ListItem} from "@mui/material";
import {Link} from "react-router-dom";

const TagsList = memo(({tags}) => {
  return (
    <List sx={{
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {tags.map((tag, i) =>
        <ListItem key={i} sx={{width: 'auto'}}>
          <Link to={`/category/${tag}`}>
            {tag}
          </Link>
        </ListItem>
      )}
    </List>
  );
})

export default TagsList;