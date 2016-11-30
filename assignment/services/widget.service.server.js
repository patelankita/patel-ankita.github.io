module.exports = function(app, model) {

    // var widgets = [
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": " "},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "432", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "543", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "543", "text": '<p>Lorem ipsum</p>'}
    // ];

    var widgetModel = model.widgetModel;

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", sortWidget);


    function createWidget(req, res) {
        var widget = req.body;
        var pId = req.params.pageId;
        // console.log(jhgjhgjgjgjkh);
        widgetModel
            .createWidget(pId, widget)
            .then(function (newWidget) {

                    // console.log(newWidget);
                    res.send(newWidget);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });

        // widget.pageId = pId;
        // widget._id = (new Date().getTime()).toString();
        // widgets.push(widget);
        // res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pid)
            .then(
                function(widgets) {
                    console.log(widgets);
                    res.json(widgets);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // var result = [];
        // for(var w in widgets) {
        //     if(widgets[w].pageId === pid) {
        //         result.push(widgets[w]);
        //         // res.send(result);
        //         // return;
        //     }
        // }
        // res.send(result);
    }

    function findWidgetById(req, res) {
        var wid = req.params.widgetId;

        widgetModel
            .findWidgetById(wid)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        //var result = [];
        // for(var w in widgets) {
        //     if(widgets[w]._id === wid) {
        //         //result.push(websites[w]);
        //         res.send(widgets[w]);
        //         return;
        //     }
        // }
        // res.send('0');
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var wid = req.params.widgetId;

        widgetModel
            .updateWidget(wid, widget)
            .then(
                function(status) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // for(var w in widgets) {
        //     if(widgets[w]._id === wid) {
        //         widgets[w] = widget;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }


    function deleteWidget(req, res) {
        var wid = req.params.widgetId;

        widgetModel
            .deleteWidget(wid)
            .then(
                function(status){
                    res.send(200);
                },
                function(error){
                    res.statusCode(404).send(err);
                }
            );


        // for(var w in widgets) {
        //     if(widgets[w]._id === wid) {
        //         widgets.splice(w, 1);
        //     }
        // }
        // res.send(200);
    }

    function uploadImage(req, res) {

        var userId = req.body.uid;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var myFile = req.file;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var redirectUrl = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;

        console.log(redirectUrl);

        if (myFile == null) {
            res.redirect(redirectUrl);
            return;
        }

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename; // new file name in upload folder
        var path = myFile.path; // full path of uploaded file
        var destination = myFile.destination; // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    widget.url = "/uploads/" + filename;

                    widgetModel
                        .updateWidget(widgetId, widget)
                        .then(
                            function (uWidget) {
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (error) {
                                res.sendStatus(400).send(error);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

        function sortWidget(req, res) {
            var pageId = req.params.pageId;
            var start = parseInt(req.query.initial);
            var end = parseInt(req.query.final);
            widgetModel
                .reorderWidget(pageId, start, end)
                .then(
                    function(status){
                        res.sendStatus(200);
                    },
                    function (error) {
                        res.sendStatus(400);
                    }
                );

        }

};
