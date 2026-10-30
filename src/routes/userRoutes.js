import express from "express"

const router = express.Router()

router.get("/user-profile", (req, res) =>{
    res.json({
        name: "Mike",
        age: 10
    })
})

export default router;