
"use server";
import { NextResponse } from "next/server";
import { doc,getDoc,setDoc} from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";

export async function POST(req: Request) {
    const {userEmail,userName} = await req.json();
    try{
        
        const docRef = doc(db,"users",userEmail);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return NextResponse.json(docSnap.data())
        }
        else{
            const data = {
                email: userEmail, 
                name: userName 
            };
            await setDoc(doc(db,"users",userEmail),{
                ...data
            } )
            return NextResponse.json(data);
        }
    }
    catch(e){
        console.error("Error adding or retrieving document: ", e);
        
        return NextResponse.json({
            error: "Failed to add or retrieve user data" 
            },
            { 
                status: 500 
            }
        );
    }
}