import React from 'react';

import './Button.css';

export default (props) => {
    return (
        <button {...props} className={"button " + props.className}>{props.children}</button>
    );
}