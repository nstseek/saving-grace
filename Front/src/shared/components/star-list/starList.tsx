import {Grid} from '@material-ui/core';
import  React from 'react';
import StarIcon from '@material-ui/icons/Star';

const StarList = (props) => {

    const style = {
        marginBottom: '0.5rem'
    }

    var list = [];
    for(let i = 0; i < props.count; i++) {
        list.push(<StarIcon key={i} color="primary"/>);
    }
    return (
        <div style={style}>
            {list}
        </div>
    )
}

export default StarList;