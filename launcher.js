// launcher.js

const pm2 = require('pm2');

pm2.connect(function(err){
  if(err){
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script: ['./hunts-api/app.js', './users-api/app.js'],
    exec_mode: 'cluster',
    instances: 1,
    max_memory_restart: '100M'
  }, function(err, apps){
    pm2.disconnect();
    if (err) throw err
  });
});
