module.exports = {
    set: {
        port:       process.env.PORT || 4000,
        module:     pathJoin(__path, '/src/mvc'),
        views:      pathJoin(__path, '/src/mvc'),
        templates:  pathJoin(__path, '/src/templates'),
        'view engine': '.hbs'
    },
    globals: {
        __title:      'Terminal Manager',
        __module:     pathJoin(__path, '/src/mvc'),
        __views:      pathJoin(__path, '/src/mvc'),
        __templates:  pathJoin(__path, '/src/templates'),
        __public:     pathJoin(__path, '/src/public'),
    }
}