const { response } = require('express');

const find = async (req, res = response) => {

    const searchParam = req.params.by;

    res.json({
        ok: true,
        found: 'found',
        searchParam
    })
}

module.exports = {
    find
}