import React from 'react';
import { useTheme } from 'next-themes';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useEdgeStore } from '../lib/edgestore';



const Editor = ({
  onChange,
  initialContent,
  editable
}) => {
  const {resolvedTheme} = useTheme()
  const {edgestore} = useEdgeStore()

  const handleUpload = async (file) => {
    const Response = await edgestore.publicFiles.upload({
      file
    })

    return Response.url
  }

  const editor = useCreateBlockNote({
    editable,
    initialContent:
    initialContent
    ? JSON.parse(initialContent) : undefined,
    uploadFile : handleUpload
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={ resolvedTheme === "dark" ?  "dark" : "light"}
        onChange={() => {
          // console.log(editor.document)
          onChange(JSON.stringify(editor.document , null , 2))
        }}
      />
    </div>
  );
}

export default Editor;
