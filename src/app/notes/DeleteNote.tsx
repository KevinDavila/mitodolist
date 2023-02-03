'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
export default function DeleteNote(noteID: any) {
    console.log(noteID)
    const idnote = Object.values(noteID)
    console.log(idnote)
    const router = useRouter();
    //todo el codigo/logica del componente, como el methods o mounted del vue
    const [title, setTitle] = useState('')
    const [field, setField] = useState('')

    const deletePost = async (noteID: any) => {
        const res = await fetch(
            `http://127.0.0.1:8090/api/collections/notes/records/${idnote}`,{
            method: 'delete',
        });
        if(res == null){
            "se elimino"
        }
        router.push("/notes");
    }   
    //lo que va a redenderizar el componente
    return (
        
        <button onClick={()=>{
            deletePost(noteID)
        }}>Delete</button>
    )
};
