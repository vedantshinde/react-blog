import React, { useRef, useCallback } from "react";
import { Input } from "antd";
import ReactQuill from "react-quill";

export default function PostEditor(props) {
  const getDelta = useCallback((value, delta, source, editor) =>{
    // const delta = Quill.getContents()

    console.log(value,delta, source, editor)
  }, [])

  return (
    <main className="post-editor">
      <ReactQuill theme="snow" onChange={getDelta}/>
    </main>
  );
}
