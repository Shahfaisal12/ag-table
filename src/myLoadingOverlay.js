import React from 'react';

const myLoadingOverlay = () => {
    return (
        <div className='my-loading-overlay'>
            <img src="https://d1yk6z6emsz7qy.cloudfront.net/static/images/loading.gif" className="my-spinner" alt='' />
            Loading...
        </div>
    )
};

export default myLoadingOverlay;