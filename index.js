const express = require('express'),
    app = express(),
    port = process.env.PORT || 7000,
    controller = require('./controllers/artControllers'),
    multerLib = require('multer')();
    cors = require('cors');

app.use(express.json({ strict : false}))
app.use(cors())
app.post('/create-with-imagekit', multerLib.single('image') , controller.createWithImageKit);
app.get('/art', controller.getAllArt);
app.get('/art/:artId', controller.getArtById);
app.put('/art/:artId', controller.update);
app.delete('/art/:artId', controller.delete);


app.listen(port, () => {
    console.log(`Server is running at PORT ${port}`)
})