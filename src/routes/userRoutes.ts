import express from "express"
import {db, connectAsync} from "../config/db"

const router = express.Router()

router.get("/user-profile", async (req, res) =>{

    const user = await db.orm.public.User.all();

    return res.json(user);
})

export default router;