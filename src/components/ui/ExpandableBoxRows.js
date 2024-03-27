/** @format */

// /** @format */

// import React from "react";

// const ExpndableEventsRow = ({ data }) => {
//   return (
//     <div className="w-full border px-[3%] py-6 rounded-lg ">
//       <div className="custom_shadow py-2 px-4 rounded-lg">
//         <h2 className="mb-2 font-bold">Description</h2>
//         <p className="text-sm">{data?.description}</p>
//       </div>
//     </div>
//   );
// };

// export default ExpndableEventsRow;
/** @format */

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Loader, Upload, X, XSquare } from "lucide-react";
import { API } from "@/Api";
import { useToast } from "@/hooks/useToast";
import Input from "./Input";
import { Editor } from "primereact/editor";

const ExpndableBoxRow = ({ data, getAll }) => {
  const { resolveToast, rejectToast } = useToast();
  const row = data;
  const fileInputRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [loader, setLoader] = useState(false);
  const [image, setImage] = useState(false);
  const [item, setItem] = useState("");

  const updateImage = async (id) => {
    try {
      setLoader(id);
      if (image) {
        const data = new FormData();
        data.append("box", image?.url);
        let res = await API.uploadImage(data);
        console.log(res?.data?.data[0]);
        res = await API.updateBox(id, { image: res?.data?.data[0] });
        resolveToast(res?.data?.message);
        getAll();
      }
    } catch (error) {
      rejectToast(error?.response?.data?.message || error?.message);
    } finally {
      setImage();
      setItem();
      setLoader(false);
    }
  };
  return (
    <div className="w-full border px-[3%] py-6 rounded-lg ">
      <div className="custom_shadow flex py-2 px-4 rounded-lg">
        <div className="w-full flex justify-center gap-2 items-center">
          <div
            className="p-2 flex justify-center items-center relative cursor-pointer"
            onClick={() => {
              !image
                ? fileInputRef.current.click()
                : rejectToast("upload image by clicking indicator");
              !image && setItem(row?.id);
            }}
            onMouseOver={() => setHover(row?.id)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`bg-black absolute top-0 left-0 opacity-50 h-full w-full ${
                hover == row?.id ? "" : "hidden"
              }`}
            ></div>
            <Image
              src={`${
                item == row?.id && image?.url
                  ? URL.createObjectURL(image?.url)
                  : row?.image
              }`}
              width={1000}
              height={1000}
              alt="brand"
              className="w-[400px] h-[220px] rounded-lg"
            />
            <Input
              register={() => {}}
              onchange={(e) =>
                setImage({ id: row?.id, url: e?.target?.files[0] })
              }
              refrence={fileInputRef}
              type={"file"}
              newClass={"hidden"}
            />
          </div>
          {image && item == row.id && (
            <>
              {loader == row?.id ? (
                <Loader className="animate-spin" />
              ) : (
                <Upload
                  className={`${
                    item == row?.id && "animate-bounce"
                  } cursor-pointer hover:text-green-500`}
                  onClick={() => updateImage(row?.id)}
                />
              )}
              <XSquare
                className={`cursor-pointer hover:text-red-500`}
                onClick={() => {
                  setImage();
                  setItem();
                }}
              />
            </>
          )}
        </div>
        <div className="w-full flex-col justify-center items-center">
          <div className="break-all text-wrap">
            <h3 className="text-red-500 text-lg">Details</h3>
            <p className="text-sm">{row?.details}</p>
          </div>
          <div className="break-all mt-4 text-wrap">
            <h3 className="text-red-500 text-lg">Shipping Details</h3>
            <p className="text-sm">
              Height: {row?.height} {`(inch.)`}
            </p>
            <p className="text-sm">
              Width: {row?.width} {`(inch.)`}
            </p>
            <p className="text-sm">
              Length: {row?.length} {`(inch.)`}
            </p>
            <p className="text-sm">
              Weight: {row?.weight} {`(pounds)`}
            </p>
          </div>
        </div>

        {/* <div className="px-12 max-w-screen-2xl">
          <h2 className="font-bold mb-2">Description</h2>
          <div className="whitespace-nowrap removeBorder w-full min-w-[350px] px-4 py-2 text-gray-700">
            <Editor
              readOnly
              headerTemplate={<></>}
              style={{ height: "100%", border: "none" }}
              value={data?.details} // The current value of the editor
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ExpndableBoxRow;
