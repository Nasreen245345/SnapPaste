import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.find((p) => p._id === id);

  if (!paste) {
  
    return <Navigate to="/notfound" />;

  }
function handleCopy(paste){
    navigator.clipboard.writeText(paste.content)
    toast.success("Copied to Clipboard")
  }
  return (
    <div className="p-4 w-screen">
      <div className="flex flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Enter Title here"
          value={paste.title}
          disabled
          className="w-[64%] p-3 rounded-md border border-gray-300 mt-6 py-1 bg-white text-gray-600"
        />
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div className='w-[64%] bg-white text-gray-500 rounded-md p-4 border border-gray-300 flex flex-col relative'>
          <button onClick={()=>handleCopy(paste)} className='absolute right-5 top-1 p-2'> <FontAwesomeIcon icon={faCopy}  /></button>
           <textarea
          className="w-[99.87%] bg-white text-gray-500 rounded-md p-4  mt-5"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={20}
        ></textarea>
        </div>
      </div>
    </div>
  )
}

export default ViewPaste;
