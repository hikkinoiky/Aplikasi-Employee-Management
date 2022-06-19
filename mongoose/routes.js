const express = require('express');
const router = express.Router();
const Model = require('./model');

router.get('/', (req, res) => {
    res.send('Silahkan input data menggunakan POST /data');
});

//POST
router.post('/api/employees/add', async (req, res) => {
    const data = new Model({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//GET
router.get('/api/employees', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//GET by ID
router.get('/api/employees/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//UPDATE by ID
router.patch('/api/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//DELETE by ID
router.delete('/api/employees/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Data user ${data.name} telah dihapus`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;