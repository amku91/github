import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import './ImageStatus.css';


const ImageStatus = ({ imageData, statusData }) => {
    return (
        <div className='image-status-bordered'>
            {imageData.as == 'a' && <Image as='a' href={imageData.href} target={imageData.target ? imageData.target : '_self'} src={imageData.url} size={imageData.size} rounded />}
            {imageData.as == 'i' && <Image src={imageData.url} size={imageData.size} rounded />}
            {statusData &&
                <div className='user-status-overall'>
                    <div className='user-status-container'>
                        <div className='user-status-header'>
                            <div className='user-status-image-container'>
                                <Image src={statusData.avatar_url} className='user-status-image' />
                            </div>
                        </div>
                    </div>
                    <div className='user-status-text'>{statusData.text}</div>
                </div>}
        </div>
    );
};

ImageStatus.propTypes = {
    imageData: PropTypes.objectOf(String).isRequired,
    statusData: PropTypes.objectOf(String)
};

export default ImageStatus;