/**0
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;
var Charm = sqldb.Charm;
var Chain = sqldb.Chain;
var Center = sqldb.Center;
var Largeinitial = sqldb.Largeinitial;
var Smallinitial = sqldb.Smallinitial;

User.sync()
.then(()=>User.find().then((data,err) => {
  if(!data){
    User.destroy({ where: {} })
      .then(() => {
        User.bulkCreate([{
          provider: 'local',
          name: 'Test User',
          email: 'user@codenx.com',
          password: 'codenx'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@codenx.com',
          password: 'codenx'
        }])
        .then(() => {
          console.log('finished populating users');
        })
      })
  }
}));


Charm.sync()
.then(()=> { console.log('finished syncing charms');});
Chain.sync()
.then(()=> { console.log('finished syncing chains');});
Center.sync()
.then(()=> { console.log('finished syncing centers');});
Largeinitial.sync()
.then(()=> { console.log('finished syncing large initials');});
Smallinitial.sync()
.then(()=> { console.log('finished syncing small initials');});

