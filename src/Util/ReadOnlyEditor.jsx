import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css'

function ReadQuillEditor({value,className,full}) {

console.log(value)
  return ( 
    <ReactQuill   style={{ paddingLeft:"0px",paddingRight:"0px",paddingTop:"0px",paddingBottom:"0px"
  
    
    }}   className= {full?className:`${className}break-words p-0 w-[49.563rem]`} theme="bubble" value={value} readOnly={true}></ReactQuill>
   );
}

export default ReadQuillEditor;