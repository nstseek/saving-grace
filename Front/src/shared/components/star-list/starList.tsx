import {Grid} from '@material-ui/core';
import  React from 'react';
import StarIcon from '@material-ui/icons/Star';

const StarList = (props) => {
    var list = [];
    for(let i = 0; i < props.count; i++) {
        list.push(<StarIcon key={i} color="primary" />);
    }
    return (
        <div>
            {list}
        </div>
    )
}

export default StarList;