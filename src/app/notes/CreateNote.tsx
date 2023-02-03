'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CreateNote() {
    const router = useRouter();
    //todo el codigo/logica del componente, como el methods o mounted del vue
    const [title, setTitle] = useState('')
    const [field, setField] = useState('')
const create = async () => {
    await fetch('http://127.0.0.1:8090/api/collections/notes/records',{
        method: 'post',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            field
        })
    });
    setField('');
    setTitle('');
    router.refresh();
}   
    //lo que va a redenderizar el componente
    return (
        <form onSubmit={create}>
            <h3>Create a new note</h3>
            <input 
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            />
            <textarea
            placeholder="Contenido"
            value={field}
            onChange={(e) => setField(e.target.value)}
            />
            <button type="submit">crear nota</button>
        </form>
    )
};
