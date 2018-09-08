'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
  || process.env.ip
  || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
  || process.env.PORT
  || 8080,

  sequelize: {
    uri: process.env.OPENSHIFT_MYSQL_DB_URL + process.env.OPENSHIFT_APP_NAME || process.env.CLEARDB_DATABASE_URL || process.env.JAWSDB_URL || 'mysql://root:raju@localhost/test',
    options: {
      logging: false,
      storage: 'dist.sqlite',
      define: {
        timestamps: false
      }
    }
  },
  facebook: {
    clientID: '237652726899449',
    clientSecret: '291958785739139edefb997e64f0aa37',
    callbackURL: 'http://18.222.99.22/auth/facebook/callback'
  },
  // Seed database on startup
  seedDB: true
};
