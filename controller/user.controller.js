const express = require('express');
const router = express.Router();
require('dotenv').config();

var Message = require('../models/Message');

//// POST

//submit message
router.post('/submit/:id', (req, res) => {
    let id = req.params.id;

    var createMessage= new Message({
        message: req.body.message,
        id: id
    });
    //save message to database
    createMessage.save(function(err, doc) {
        if (err) {
            res.json({
                msg: 'error',
                code: 500,
                error: err
            });
        } else {
            res.json({
                msg: 'success',
                code: 200,
                message: req.body.message,
                id: doc._id
            });
        }
    });
});

//reply message
router.post('/reply/:msgid', (req, res) => {
    let id = req.params.msgid;

    Message.findById(id).then((doc, err) => {
        if(err || !doc){
            res.json({
                msg: 'error',
                code: 500,
                error: err
            });
        } else {
            doc.update({ $push: { reply: req.body.replymsg } })
            .then(result => {
                res.json({
                    msg: 'success',
                    code: 200,
                    reply: req.body.replymsg
                })
            });
        }
    }).catch(e => {
        res.json({
            msg: 'error',
            code: 500,
            error: e
        });
    })

});

//// GET

router.get('/:id', (req, res) => {
    let id = req.params.id;

    Message.find({id}).then(doc => {
        if(doc.length > 0){
            res.json(doc);
        } else {
            res.json({
                msg: 'error',
                code: 404,
                error: 'not found'
            })
        }
    })
    .catch(e => {
        res.json({
            msg: 'error',
            code: 404,
            error: e
        })
    });
});

module.exports = router;