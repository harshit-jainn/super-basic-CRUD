const http = require('http');
const app = require('./src/app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const sequelize = require('./src/utils/db');
sequelize
    .sync()
    .then(result => {
        server.listen(port, () => {
            console.log('server started');
        });
    })
    .catch(err => {
        console.log(err);
    });
      