import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const allPaste = useSelector((state) => state.paste.pastes);
  const pasteId = searchParams.get("pasteId"); // ✅ fixed param case

  const dispatch = useDispatch();
  useEffect(() => {
    if (pasteId && allPaste.length > 0) {
      const paste = allPaste.find((p) => String(p._id) === String(pasteId));
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  // ✅ Handlers
  function handleChange(e) {
    setTitle(e.target.value);
  }

  function handleTextChange(e) {
    setValue(e.target.value);
  }

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    // Reset form and URL after action
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="p-4  w-screen">
      <div className="flex flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Enter Title here"
          value={title}
          onChange={handleChange}
          className="w-[55%] p-3 rounded-md border border-gray-300 mt-6 py-1 bg-white text-gray-600"
        />
        <button
          className="text-white py-1 px-4 mt-6 rounded-md bg-blue-600"
          onClick={createPaste}
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <textarea
          className="w-[64%] bg-white text-gray-500 rounded-md p-4 border border-gray-300 "
          value={value}
          placeholder="Enter content here"
          onChange={handleTextChange}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
