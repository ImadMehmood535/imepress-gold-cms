import { ClapperboardIcon, Eraser } from "lucide-react";
import React, { useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

const SignatureInput = ({ sigPadRef }) => {
  const clear = () => {
    sigPadRef.current.clear();
  };

  return (
    <div className="px-4 py-2 rounded-lg bg-gray-100 w-full">
      <div className="flex">
        <p className="relative flex flex-1 py-2 items-center  text-sm">
          Signature:
        </p>
        <div
          className="hover:cursor-pointer hover:text-blue-500"
          onClick={clear}
        >
          <Eraser />
        </div>
      </div>
      <div className="flex w-full items-center border p-2 bg-white">
        <ReactSignatureCanvas
          penColor="black"
          ref={sigPadRef}
          canvasProps={{
            // height: 300,
            // width: "100%",
            className: "sigCanvas",
          }}
        />
      </div>
    </div>
  );
};

export default SignatureInput;
