import ReactGA from 'react-ga4';

const GA_ID = (process.env.GA_ID || window.GA_ID);
const isInitialized = !!GA_ID;

if (GA_ID) {
    ReactGA.initialize(GA_ID, {
        gtagOptions: {
            debug_mode: (process.env.NODE_ENV !== 'production')
        }
    });
    console.log('Google Analytics 4 initialized with ID:', GA_ID);
} else {
    console.info('Google Analytics is disabled because GA_ID is not set.');
}

// Compatibility layer for react-ga style API
const GoogleAnalytics = {
    initialize: ReactGA.initialize,

    // Support both react-ga (object) and react-ga4 (action + params) formats
    event: (actionOrOptions, params) => {
        if (!isInitialized) return;

        if (typeof actionOrOptions === 'object') {
            // react-ga format: {category, action, label, value}
            const {category, action, label, value, ...rest} = actionOrOptions;
            ReactGA.event(action, {
                category,
                label,
                value,
                ...rest
            });
        } else {
            // react-ga4 format: (action, {category, label, value})
            ReactGA.event(actionOrOptions, params);
        }
    },

    // Forward other methods
    send: (...args) => isInitialized && ReactGA.send(...args),
    pageview: (...args) => isInitialized && ReactGA.send({hitType: 'pageview', page: args[0]}),
    set: (...args) => isInitialized && ReactGA.set(...args),
    gtag: (...args) => isInitialized && ReactGA.gtag(...args)
};

export default GoogleAnalytics;
