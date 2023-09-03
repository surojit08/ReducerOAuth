import {GeneralUserService} from "../../Services/index.js";

const registerUser = async (req, res) => {
    const body = req.body;
    const created_user = await GeneralUserService.registerUser({
        user_details: body,
    });
    res.status(201).json({user: created_user});
};
const loginByPassword = async (req, res, next) => {
    try {
        const body = req.body;
        const {email, password} = body;
        const userService = await GeneralUserService.init(email);
        const loginResult = await userService.loginWithPassword(password);
        res.cookie("_ePaperCrd", loginResult.token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain:"reduceroauth.onrender.com"
        });
        res
            .header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie")
            .status(201).json({
            success: true,
            message: "login successful",
        });
    } catch (error) {
        return next(error);
    }
};

export {registerUser, loginByPassword};
