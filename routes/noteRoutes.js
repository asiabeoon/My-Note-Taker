const router = require('express').Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
// const { router } = require('./indexRoutes');

// route for posting the new note. The complete route is now /api/groceries
router.get('/', (req, res) => {
    // read from the file and send back the data to the client
    fs.readFile('./db/db.json', "utf-8", function (err, data) {
        res.json(JSON.parse(data))
    })
});

// post route to save a new note
router.post('/', (req, res) => {
    // When adding to a previous list, you first need to read from the list...
    // db is a fake database with the note body to get and add ingormation for a data base
    fs.readFile('./db/db.json', "utf-8", function (err, data) {
        let myData = JSON.parse(data)
        const note = req.body;

        // then add the new item to the previous list...
        myData.push(note)
        // then save back into the list.
        fs.writeFile('./db/db.json', JSON.stringify(myData, null, 4), function (err) {
            if (err) throw err;
            res.json(myData)
        })
    })
});

// delete route to remove a note
// Notice the :id. This means the route will have a paramater attached to it in the index.js file in public.
// router.delete('/:id', (req, res) => {
//     // req.params.id matches :id. If I wrote :turtle, we would write req.params.turtle
//     const myID = req.params.id;
//     // Same thing as the post. If we are modifying our existing data, first we read it.
//     fs.readFile('./db/db.json', "utf-8", function (err, data) {
//         let myData = JSON.parse(data)
//         // Now we filter our data, returning all items where the id doesn't match the id sent
//         // to this route via the parameter. 
//        const filteredData = myData.filter((item) => item.itemID !== myID);
//         // Save our filtered data back into the file, effectively deleting the item in the grocery list.
//         fs.writeFile('./db/db.json', JSON.stringify(filteredData, null, 4), function (err) {
//             if (err) throw err;
//             // Send the data back to the client.
//             res.json(filteredData)
//         })
//     })
// });

module.exports = router;