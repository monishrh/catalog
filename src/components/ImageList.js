/* 
  Author: Monish R H
  filename: ImageList.js 
*/


import React from "react";

// Rendering individual images
const Image = ({ image }) => {
    return (
        <div>
            <img width='100' height='100' style={{ marginLeft: '10px', marginTop: '10px' }} alt={`img - ${image.id}`} src={image.src} />
        </div>
    );
};

// ImageList Component
const ImageList = ({ images }) => {

    // render each image by calling Image component
    const renderImage = (image, index) => {
        return (
            <Image
                image={image}
                key={`${image.id}-image`}
            />
        );
    };

    // Return the list of files
    return <section><div style={{ display: 'flex', width: '100%' }}>{images.map(renderImage)}</div></section>;
};

export default ImageList;