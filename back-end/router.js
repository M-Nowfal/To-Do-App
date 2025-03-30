import express from "express";
import { addTask, getTask, removeTask, updatePassword, updateTask, userLogin, userLogOut, userSignIn, userSignOut } from "./taskController.js";

const router = express.Router();

router.route("/:user").get(getTask);
router.route("/updatepwd").patch(updatePassword);

router.route("/signin").post(userSignIn);
router.route("/login").post(userLogin);
router.route("/signout").post(userSignOut);
router.route("/logout").post(userLogOut);

router.route("/addtask").post(addTask);
router.route("/removetask/:user/:task").delete(removeTask);
router.route("/updatetask").put(updateTask);

export default router;