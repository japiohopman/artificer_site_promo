/**
 * Render Deployment Proxy
 * Some deployment environments default to 'script.js' as the entry point.
 * This file redirects the execution to the actual Express server.
 */
require('./server.js');
