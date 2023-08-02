import React, { useEffect } from 'react';

const Now4RealWidget = () => {
    useEffect(() => {
        const loadNow4RealScript = () => {
            window.now4real = window.now4real || {};
            window.now4real.config = {
                widget: {
                    color_external_background: '#39AAE1',
                    color_external_text: '#FFF',
                    color_internal_background: '#39AAE1',
                    color_internal_text: '#FFF',
                    // logo_url: 'https://example.com/logo.png', // premium feature
                    align: 'right',
                },
                scope: 'page',
            };

            const n4r = document.createElement('script');
            n4r.type = 'text/javascript';
            n4r.async = true;
            n4r.src = 'https://cdn.now4real.com/now4real.js'; // Replace with the correct Now4Real script URL
            const s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(n4r, s);
        };

        loadNow4RealScript();
    }, []);

    return <div className="now4real-widget" />;
};

export default Now4RealWidget;
