import Link from "next/link";
import CreateNote from "./CreateNote";
import stylesnext from '../page.module.css'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
async function getNotes(){
    const res = await fetch(
        'http://127.0.0.1:8090/api/collections/notes/records?perPage=200',
        { cache: 'no-store'}
        );
        const data = await res.json();
    return data?.items as any[];
}

export default async function NotesPage(){
    const notes = await getNotes();
    return(
        <div className={stylesnext.main}>
            <h2 className={inter.className}>
                Notas       
            </h2>
            <div className={stylesnext.grid}>
            {
                notes?.map((note) => {
                return <Note key={note.id} note={note}/>;
                })
            }
            </div>
            <CreateNote/>
        </div>
    )
}

//Componente Note
function Note({ note }: any){
    const { id, title, field, created } = note || {};
    const created_at = new Date(created)
    return (     
        <Link href={`/notes/${id}`}>
            <div  className={stylesnext.card}>   
                <h2 className={inter.className}>{title} <span>-&gt;</span></h2>
                <p className={inter.className}>{field}</p>
                <p className={inter.className}>{created_at.toLocaleString('es-MX')}</p> 
            </div> 
        </Link>
    );
}

