router.get('/', (req, res) => {
    res.render('modules/login/views', { layout: 'login', ...data })
})

router.post('/', (req, res) => {
    res.send('hola')
})

module.exports = router