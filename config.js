const config = {
  contactPoints: process.env.CASSANDRA_CONTACT_POINTS || ['127.0.0.1'],
  port: process.env.PORT || 3000
};

export default config;
