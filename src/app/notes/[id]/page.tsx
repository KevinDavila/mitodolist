import { setDefaultResultOrder } from 'dns';
import { nodeModuleNameResolver } from 'typescript';
import DeleteNote from '../DeleteNote';
import styles from '../Notes.module.css';
import stylesnext from '../../page.module.css'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
async function getNote(nodeId: string) {
    const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${nodeId}`,
    {
        next: { revalidate: 10 }
    }
    );
    const data = await res.json();
    return data
}

export default async function NotePage({ params }: any){
    const note = await getNote(params.id)
    return (
        <div className={stylesnext.main}>
            <h1 className={inter.className}>notes/{note.id}</h1>
            <div className={stylesnext.card}>
                <h3 className={inter.className}>{note.title}</h3>
                <h5 className={inter.className}>{note.field}</h5>
                <p className={inter.className}>{note.created}</p>
            </div>
            <DeleteNote idNote = {note.id}/>
        </div>
    )
}