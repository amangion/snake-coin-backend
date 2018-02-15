const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '4000',
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  },
};

export default config;
