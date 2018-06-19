const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'testeselecao',
  version: '1.0.0'
});

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'selecaoemotion'
  }
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});


server.get('/', restify.plugins.serveStatic({
  directory: './dist',
  file: 'index.html'
}));


server.post('/create', (req, res, next) => {

  knex('inscritos')
    .insert(req.body)
    .then((dados) => {
      res.send(dados);
    }, next)

});
