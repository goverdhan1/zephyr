var createFile = require('create-file');

createFile('config/project-config.js', 'const settings = {\n\tappFolder: \'app\',\n\tbackendUrl: \'http://192.168.11.127:80\'\n};\nexports.settings = settings;', function (err) {
  // file either already exists or is now created (including non existing directories)
});

createFile('dll/vendor.dll.js.map','', function() {});
createFile('dll/polyfills.dll.js.map','', function() {});