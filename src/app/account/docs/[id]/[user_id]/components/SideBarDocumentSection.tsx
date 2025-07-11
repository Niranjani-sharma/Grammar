import styles from './sidebardocument.module.scss'
import React,{useEffect, useState, useCallback} from 'react'
import ReactToPrint from 'react-to-print';
import axios from 'axios'
import { HandleAddDocument } from '@/app/helpers/AddDocument'

interface SideBarDocumentSectionProps {
    icon: React.ReactElement
    text: string
    textRef: any
    title: string
    _id: string
}

const SideBarDocumentSection:React.FC<SideBarDocumentSectionProps>=({text,icon,textRef,title,_id})=>{
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileUpload = useCallback(async (file: File) => {
      const formData = new FormData();
      console.log(file)
      formData.append('file', file);
  
      axios.post('/api/upload',formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((res)=>console.log(res))
    }, []);

    const handleUpload = useCallback(() => {
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    }, [selectedFile, handleFileUpload]);

    useEffect(() => {
        if (selectedFile) {
            handleUpload()
        }
    }, [selectedFile, handleUpload]);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };

    const fileName =  `${title}.docx`
    const downloadInnerHtml=(filename:string)=>{
        if (document){
            const elHtml = document.getElementById('content');
            const link = document.createElement('a');
            link.setAttribute('download', filename);   
            link.setAttribute('href', 'data:' + 'text/doc' + ';charset=utf-8,' + encodeURIComponent(elHtml?.innerHTML as string));
            link.click(); 
        }
       }

    if (text=='Print document') return (
        <ReactToPrint
        trigger={() => <div className={styles.sidebar__document__container}>
            {icon}
            <p className={styles.sidebar__document__close__text}>{text}</p>
        </div>}
        content={() => textRef.current}
        >
        </ReactToPrint>
  )
  else if (text=='Download document') return (
    <div className={styles.sidebar__document__container} onClick={()=>downloadInnerHtml(fileName)}>
        {icon}
        <p className={styles.sidebar__document__close__text}>{text}</p>
    </div>
  )
  else if (text=='Upload document') return (
    <label htmlFor="file" className={styles.sidebar__document__container}>
        {icon}
        <p className={styles.sidebar__document__close__text}>{text}</p>
        <input type="file" id="file" onChange={handleFileChange} style={{display:'none'}} />
    </label>
  )
  else{
    return (
        <div className={styles.sidebar__document__container} onClick={()=>HandleAddDocument(_id)}>
            {icon}
            <p className={styles.sidebar__document__close__text}>{text}</p>
        </div>
      )
  }
}

export default SideBarDocumentSection