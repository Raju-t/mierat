'use strict';

exports = module.exports = { // Can not put all settings here as this needs a restart to be applied (****verify****)
  demo: false,
  // List of user roles
  userRoles: ['guest', 'user', 'manager', 'admin'], // This should be in ascending order of authority. e.g. In this case guest will not have access to any other role, where as admin will have the role of guest+user+vendor+manager+admin
  mailOptions: {
    forgotPassword: function (body) {
      return {
        from: 'passwordreset@codenx.com',
        to: body.to,
        subject: 'Material CRUD Password Reset Request',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + body.host + '/reset/' + body.token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
    },
    resetPassword: function (body) {
      return {
        from: 'passwordreset@codenx.com',
        to: body.to,
        subject: 'Material CRUD Password Changed',
        text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + body.to + ' has just been changed.\n'
      };
    }
  },
  menu: {
    pages: [ // Main menu. The `role: manager` is only to show/hide it from the menu, this is not for authentication purpose, the user access level is controlled from the router page
      //{ text: 'Books', icon: 'book', url: 'book', authenticate: true },
      { text: 'Charms', url: 'charm', icon: 'folder', authenticate: true },
      { text: 'Chains', url: 'chain', icon: 'folder', authenticate: true },
      { text: 'Centers', url: 'center', icon: 'folder', authenticate: true },
      { text: 'Large Initials', url: 'largeinitial', icon: 'folder', authenticate: true },
      { text: 'Small Initials', url: 'smallinitial', icon: 'folder', authenticate: true },
      // { text: 'Movies', icon: 'movie', url: 'movie', authenticate: true },
      // { text: 'Contacts', icon: 'contacts', url: 'contact', authenticate: true },
      // { text: 'Customers', icon: 'people', url: 'customer', authenticate: true },
      // { text: 'Tasks', icon: 'assignment', url: 'task', authenticate: true },
      // { text: 'Documentation', icon: 'description', url: 'doc.pre' },
      // { text: 'Media Library', icon: 'photo_library', url: 'media', authenticate: true }
    ],
    user: [ // Separate panel for user management tasks for both admin and user
      { text: 'Users', url: 'admin', authenticate: true, role: 'admin', icon: 'perm_identity' },
      { text: 'logout', authenticate: true, url: 'logout', icon: 'logout' }
    ]
  }
};
