Package.describe({
  name: "thomastraum:presence",
  summary: "A package to help track users' presence",
  version: "1.0.6",
  git: "https://github.com/dburles/meteor-presence.git"
});

Package.onUse(function (api) {
  api.versionsFrom('1.3');
  api.use('modules');
  api.use([
    'ecmascript',
    'mongo',
    'underscore',
    'tracker',
    // 'client',
  ]);
  // api.versionsFrom('1.3');
  // api.use('tracker', 'client', 'ecmascript');
  // api.use('mongo');
  // api.use('underscore');

  api.addFiles('./lib/common.js');
  api.addFiles('./lib/client.js', 'client');
  api.addFiles('./lib/server.js', 'server');

  api.export('Presences');
  api.export('Presence');
});
