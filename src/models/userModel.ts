import { model,Schema ,models} from "mongoose";

const userSchema =new Schema({
    username:{
     type:String,
     unique:true,
     required:[true,"Please provide username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide email"]
    },
    password:{
        type:String
    },
    isAdmin:{
     type:Boolean,
     default:false
    },
    isVerified:{
        type:Boolean,
        default:false
       },
    forgotPasswordToken:String,
    forgotPasswordExpiry:String,
    verifyEmailToken:String,
    verifyEmailExpiry:String,
})

const User = models.users || model("users", userSchema);
export default User