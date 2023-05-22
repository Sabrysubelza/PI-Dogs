const { Router } = require("express");
const { getAllTemperament } = require("../routes/utils");
const router = Router();




router.get("/", async (req, res) => {
    try {
        const info = await getAllTemperament();
        res.status(200).send(info)
    } catch (error) {
        console.log("Error", error);
    }

})

module.exports= router;