import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; 

const userSchema = new Schema({
    username:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
    email:{type:String,required:true,unique:true,lowercase:true,trim:true},
    fullname:{type:String,required:true,trim:true,index:true},
    avatar:{type:String,required:true},
    coverImage:{type:String},
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }], 
    password:{type:String,required:true},
    refreshToken:{type:String},
},{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        try{
            this.password = await bcrypt.hash(this.password,10);
            return next();
        }
    }
    return next();
});

userSchema.methods.isPasswordMatch = async function(password){
    const user = this;
    return await bcrypt.compare(password,user.password);
}

userSchema.methods.generateAccessToken = function(){
    const user = this;
    return jwt.sign({_id:user._id,email:user.email,username:user.username, fullname:this.fullname},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
userSchema.methods.generateRefreshToken = function(){
    const user = this;
    return jwt.sign({_id:user._id},process.envREFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
}

export const User = mongoose.model("User",userSchema);