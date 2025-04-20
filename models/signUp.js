import {mongoose} from "../db.js";

const SignUp = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            maxLength: 150,
        },
    password: {
            type: String,
            required: true,
    },

    },
    {
        timestamps: true
    },
)


export default mongoose.model("otps", SignUp);