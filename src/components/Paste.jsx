import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye,
  faCopy,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  function handleChnage(e) {
    setSearchTerm(e.target.value);
  }
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  function handleCopy(paste) {
    navigator.clipboard.writeText(paste.content);
    toast.success("Copied to Clipboard");
  }
  function handleShahre(paste) {
    const link = `${window.location.origin}/pastes/${paste?._id}`;
    navigator.clipboard.writeText(link);
    toast("Link craeted");
  }
  function FormattedDate({ isoDate }) {
    const formatted = format(new Date(isoDate), "MMMM d, yyyy");
    return <span>{formatted}</span>;
  }
  return (
    <div className="flex flex-col w-screen items-center">
      <input
        className="p-2 rounded-md min-w-[834px] mt-8 pl-4 border border-gray-300 text-gray-500"
        type="text"
        placeholder="Search Paste here"
        value={searchTerm}
        onChange={handleChnage}
      />
      <div className="p-2 min-w-[834px] border border-gray-300 mt-5 mb-0 text-lg font-bold flex justify-start">
        All Pastes
      </div>
      
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div className="border border-gray-300 p-4">
        <div className="flex flex-col gap-3">
                <div
                  className="border border-gray-300 flex justify-between py-2 pr-2 pl-2  min-w-[800px]"
                  key={paste?._id}
                >
                  <div className="flex flex-col justify-center">
                    <div className="font-bold text-black text-lg  flex justify-start">
                      {paste.title}
                    </div>
                    <div className="text-gray-500 pl-0">{paste.content}</div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4 ">
                      <button onMouseOver={(e) => e.preventDefault()}>
                        <a
                          href={`/?pasteId=${paste?._id}`}
                          className="no-hover-style"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </a>
                      </button>
                      <button onClick={() => handleDelete(paste?._id)}>
                        {" "}
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button>
                        <a href={`/pastes/${paste?._id}`}>
                          <FontAwesomeIcon icon={faEye} />
                        </a>
                      </button>
                      <button onClick={() => handleCopy(paste)}>
                        {" "}
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      {/* Share button logic is homework */}
                      <button onClick={() => handleShahre(paste)}>
                        <FontAwesomeIcon icon={faShare} />
                      </button>
                    </div>
                    <div className="flex justify-start">
                      <FormattedDate isoDate={paste.createdAt} />
                    </div>
                  </div>
                </div>
                </div>
      </div>
              );
            })}
        
    </div>
  );
};

export default Paste;
