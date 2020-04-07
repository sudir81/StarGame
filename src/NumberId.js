import React from 'react';
import './App.css';
import { colors } from './colors';

export const NumberId = (props) => {
    return (
        <button 
            className="number" 
            style={{backgroundColor: colors[props.status]}}
            onClick={() => props.onClick(props.number, props.status)}>
                {props.number}
        </button>
    )
}
