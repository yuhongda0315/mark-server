let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let roadRouter = require('./routes/road');
let pointRouter = require('./routes/road-point');
let Config = require('./conf');
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/road', roadRouter);
app.use('/point', pointRouter);

let server = app.listen(Config.SERVER_PORT, function() {
  return console.log('Road Mark Server listening at http://%s:%s in %s mode.', server.address().address, server.address().port, app.get('env'));
});

module.exports = app;