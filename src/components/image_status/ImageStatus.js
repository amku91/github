import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import './ImageStatus.css';


const ImageStatus = ({ imageData, statusData }) => {
    return (
        <div>
            {imageData.as == 'a' && <Image as='a' href={imageData.href} target={imageData.target ? imageData.target : '_self'} src={imageData.url} size={imageData.size} rounded />}
            {imageData.as == 'i' && <Image src={imageData.url} size={imageData.size} rounded />}
            {statusData && <div>
                <Image src={statusData.avatar_url} avatar />
                <span>{statusData.text}</span>
            </div>}
        </div>
    );
};

ImageStatus.propTypes = {
    imageData: PropTypes.objectOf(String).isRequired,
    statusData: PropTypes.objectOf(String)
};

export default ImageStatus;