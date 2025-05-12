import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState={
pastes:localStorage.getItem('pastes')
? JSON.parse(localStorage.getItem('pastes'))
:[]
}
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
        const paste=action.payload;
        //add a check if paste already exist
        const check_for_title=state.pastes.findIndex((item)=>{
            return item.title===paste.title
        })
        const empty_for_title=state.pastes.findIndex((item)=>{
            return paste.title.trim()===''
        })
        const empty_for_content=state.pastes.findIndex((item)=>{
            return paste.content.trim()===''
        })
        if(empty_for_title>=0 || empty_for_content>=0){
            toast("Paste with empty title or content can not be created")
        }
        else{
            if(check_for_title>=0){
                toast("Paste with that title already exist")
            }
            else{
                state.pastes.push(paste);
            localStorage.setItem("pastes",JSON.stringify(state.pastes))
            toast.success("Paste Created ")
            }
        }
        
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    updateToPastes: (state,action) => {
        const paste=action.payload;
        const index=state.pastes.findIndex((item)=>{
            return item._id===paste._id
        })
        if(index>=0){
            state.pastes[index]=paste;
        }
        state.pastes.push(paste);
        localStorage.setItem("pastes",JSON.stringify(state.pastes))
        toast.success("Paste Updated ")
    },
    resetAllPastes: (state, action) => {
        state.pastes=[];
        localStorage.removeItem(pastes);
     
    },
    removeFromPastes:(state,action)=>{
        const pasteId=action.payload;
        const index=state.pastes.findIndex((item)=>{
            return item._id===pasteId
        })
        if(index>=0){
            state.pastes.splice(index,1);
        }
        localStorage.setItem("pastes",JSON.stringify(state.pastes))
        toast.success("Paste Deleted ")
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer