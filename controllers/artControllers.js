const { art } = require('../models');
const { imageKit } = require('../utils');


module.exports = {
    createWithImageKit: async (req, res) => {
        try {
            const fileTostring = req.file.buffer.toString('base64');

            const uploadFile = await imageKit.upload({
                fileName: req.file.originalname,
                file: fileTostring
            });
            
            const data = await art.create({
                data: {
                    name: req.body.name,
                    title: req.body.title,
                    description: req.body.description,
                    image: uploadFile.url,
                }
            })
            
            return res.status(201).json({
                data
            });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error
            });
        }
    },
    getAllArt: async (req, res) => {
        try {
            const allArt = await art.findMany();
    
            return res.status(200).json(allArt);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getArtById: async (req, res) => {
        try {
            const artId = parseInt(req.params.artId);
            const artData = await art.findUnique({ where: { id: artId } });
            if (!artData) {
                return res.status(404).json({ message: 'Art not found' });
            }
            return res.status(200).json(artData);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    update: async (req, res) => {
        try {
            const artId = parseInt(req.params.artId);
            const existingArt = await art.findUnique({
                where: { id: artId },
            });
    
            if (!existingArt) {
                return res.status(404).json({ message: 'Art not found' });
            }
    
            const updatedData = {
                name: req.body.name || existingArt.name,
                title: req.body.title || existingArt.title,
                description: req.body.description || existingArt.description,
                image: existingArt.image, 
            };
    
            const editedArt = await art.update({
                where: { id: artId },
                data: updatedData,
            });
    
            return res.status(200).json(editedArt);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => {
        try {
            const artId = parseInt(req.params.artId);
            const existingArt = await art.findUnique({
                where: { id: artId },
            });
    
            if (!existingArt) {
                return res.status(404).json({ message: 'Art not found' });
            }
    
            await art.delete({
                where: { id: artId },
            });
    
            return res.status(204).json({ message: 'Art deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

};
