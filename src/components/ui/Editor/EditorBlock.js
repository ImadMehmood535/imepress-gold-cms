import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "@/lib/constant";

const EditorBlock = ({ data, onChange, holder }) => {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        holder: holder,
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        tools: EDITOR_JS_TOOLS,
        data,
        async onChange(api, event) {
          const savedData = await api.saver.save();
          onChange(savedData);
        },
      });
    }

    return () => {
      ref.current?.destroy?.();
    };
  }, []);

  return <div id={holder} className="w-full" />;
};

export default memo(EditorBlock);
