import React from 'react';
import styled from 'styled-components';

interface Legend {
    color:string;
    label:string;
}

const LengendIndicator : React.FC<Legend>= ({color,label})=>{
    const legendStyles = {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '5px',
      };
    
      const colorBoxStyles = {
        width: '20px',
        height: '20px',
        backgroundColor: color,
        marginRight: '10px',
      };
    
      const textStyles = {
        fontSize: '16px',
        fontWeight: 'bold',
      };
    return (
        <div style={legendStyles}>
        <div style={colorBoxStyles}></div>
        <span style={textStyles}>{label}</span>
      </div>
    )
}

export default LengendIndicator