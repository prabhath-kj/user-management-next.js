import User from "@/models/userModel";
import bcrypt from "bcrypt"
import connect from "@/dbConfig/connect";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){

try {
    const body=await request.json()
    const {email,password}=body

    const user=await User.findOne({email})

    console.log(user);
    

    if(!user){
        return NextResponse.json({error:"User does not exist"},{status:400})
    }

    const validPassowrd= await bcrypt.compare(password,user.password)
    if(!validPassowrd){
        return NextResponse.json({error:"Invalid password"},{status:500})
    }
    return NextResponse.json({message:"Login successful",success:true})
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}


}