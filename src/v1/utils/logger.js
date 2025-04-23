const geoip = require('geoip-lite');
const moment = require('moment-timezone');
const uuid = require('uuid');

// Logger function to capture request details
const logger = (req, res, next) => {
  const start = Date.now(); // Record start time of request
  const logId = uuid.v4(); // Generate unique log ID
  const ip = req.ip; // Get the client's IP address
  const userAgent = req.get('User-Agent'); // Get the User-Agent string
  
  // Lookup geolocation data based on the IP address
  const geo = geoip.lookup(ip);
  const timezone = geo ? geo.timezone : 'UTC';  // Default to 'UTC' if no geolocation found
  const location = geo ? {
    city: geo.city || 'Unknown',
    region: geo.region || 'Unknown',
    country: geo.country || 'Unknown',
    latitude: geo.ll ? geo.ll[0] : 'Unknown',
    longitude: geo.ll ? geo.ll[1] : 'Unknown',
  } : { city: 'Unknown', region: 'Unknown', country: 'Unknown' };


  // Convert the timestamp to the detected timezone
  const timestamp =  moment.tz(Date.now(), timezone).format('YYYY-MM-DD HH:mm:ss'); // Log time in respective timezone

  // Capture session and auth info (customize based on your auth system)
  const sessionId = req.get('X-Session-ID') || uuid.v4(); // Session ID (if exists)
  const userAuthToken = req.get('X-Auth-Token'); // Example user auth token (if available)
  
  // Capture device information from headers
  const device = {
    platform: req.get('X-Device-Platform') || 'Unknown',
    os: req.get('X-Device-OS') || 'Unknown',
    is_touch_device: req.get('X-Is-Touch-Device') === 'true',
    screen_resolution: req.get('X-Screen-Resolution') || 'Unknown',
  };

  // Capture network information from headers
  const network = {
    connection_type: req.get('X-Connection-Type') || 'Unknown',
    downlink_speed: req.get('X-Downlink-Speed') || 'Unknown',
    rtt: req.get('X-RTT') || 'Unknown',
    effective_type: req.get('X-Effective-Type') || 'Unknown',
  };

  // Capture page interaction info from headers
  const pageDetails = {
    scroll_depth: req.get('X-Scroll-Depth') || '0%',
    page_load_time: req.get('X-Page-Load-Time') || 0,
  };

  // Capture user data from headers (if provided)
  const userData = req.get('X-User-Data') ? JSON.parse(req.get('X-User-Data')) : null;

  // Create log entry
  const logEntry = {
    log_id: logId,
    timestamp: timestamp, // Log timestamp in local time zone
    log_level: 'INFO',
    log_content: `${req.method} ${req.originalUrl} accessed`,
    IP_address: ip,
    user_agent: userAgent,
    request_method: req.method,
    request_url: req.originalUrl,
    response_status: res.statusCode,
    execution_time: Date.now() - start, // Calculate execution time
    service_name: 'backend-service',
    host_name: req.hostname,
    correlation_id: uuid.v4(),  // Generate a correlation ID for tracking
    auth_status: 'SUCCESS',  // Adjust as per your authentication status
    location: location,
    session_id: sessionId,
    user_auth_token: userAuthToken,
    referrer: req.get('Referer') || 'Direct',
    device: device,
    network: network,
    page_details: pageDetails,
    user_data: userData,
  };

  // Log the entry (this could be saved to a file, database, or external service)

  // Track request completion time
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} completed in ${duration}ms`);
  });

  next();  // Pass to the next middleware or route handler
};

module.exports = logger;
