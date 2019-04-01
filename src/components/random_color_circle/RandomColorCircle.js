import React from 'react';
import PropTypes from 'prop-types';
import './RandomColorCircle.css';




const RandomColorCircle = ({ width, height, colorHex = null}) => {
    let randomColorGenerator = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    colorHex  = (colorHex ? colorHex : randomColorGenerator());
    var style = {
        disply: 'block',
        height: height,
        width: width,
        'border-radius': '50%',
        'background-color': `${colorHex}`,
    };

    return (
        <div className='circle-color-palette' style={style} data-color={colorHex}></div>
    );
};

RandomColorCircle.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
};

export default RandomColorCircle;