
import { NextResponse } from "next/server";
import { doc,getDoc,setDoc} from "firebase/firestore";
import { db } from "@/config/FireBaseConfig";

export async function POST(req: Request) {
    const {userEmail,userName} = await req.json();
    try{
        // If user already exist
        const docRef = doc(db,"users",userEmail);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            return NextResponse.json(docSnap.data())
        }
        else{
            // Insert new user
            const data = {
                email: userEmail, 
                name: userName,
                credits:2
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