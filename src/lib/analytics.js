import GoogleAnalytics from 'react-ga';

const GA_ID = (process.env.GA_ID || window.GA_ID);
if (GA_ID) {
    GoogleAnalytics.initialize(GA_ID, {
        debug: (process.env.NODE_ENV !== 'production'),
        titleCase: true,
        sampleRate: (process.env.NODE_ENV === 'production') ? 100 : 0,
        forceSSL: true
    });
    console.log('Google Analytics initialized with ID:', GA_ID);
} else {
    console.info('Google Analytics is disabled because GA_ID is not set.');
    window.ga = () => {
        // The `react-ga` module calls this function to implement all Google Analytics calls.
        // Providing an empty function effectively disables `react-ga`.
    };
}

export default GoogleAnalytics;
