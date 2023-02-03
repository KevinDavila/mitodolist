import Link from "next/link";
import CreateNote from "./CreateNote";
import styles from './Notes.module.css';
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
        <div>
            <h1>
                Notas       
            </h1>
            <div className={styles.grid}>
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
        <div className={styles.note}>           
            <h2>{title}</h2>
            <h5>{field}</h5>
            <span>{created_at.toLocaleString('es-MX')}</span>
        </div>  
    </Link>
    );
}

