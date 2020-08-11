module.exports = [
    { route: `/${base}`, module: pathJoin(__module, '/modules/login/controller') },
    { route: `/${base}/login`, module: pathJoin(__module, '/modules/login/controller') },
    { route: `/${base}/logout`, module: pathJoin(__module, '/modules/login/controller') },
    { route: `/${base}/:module`, module: pathJoin(__module, '/modules/:module/controller') },
    { route: `/${base}/ovni/:module`, module: pathJoin(__module, '/ovni/:module/controller') },
    { route: '/public/:res', resource: pathJoin(__path, 'src/public/:res') },
    { route: '/res/:res1/:res2', resource: pathJoin(__module, '/modules/:res2/views/:res1') },
]