import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

export const DiscreteSliderSteps = (props) => {
    
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Small steps"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={1}
                marks
                min={1}
                max={50}
                valueLabelDisplay="auto"
                onChange={props.handleChange}
            />
        </Box>
    );
}