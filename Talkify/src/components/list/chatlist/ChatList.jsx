import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useChatStore } from '../../../lib/chatStore';
import { db } from '../../../lib/firebase';
import { useUserStore } from '../../../lib/userStorage';
import User from './adduser/User';
import './chatlist.css';

export default function ChatList() {
    const [add,setAdd] = useState(false);
    const [chats,setChats] = useState([]);
    const { currentUser} = useUserStore();
    const [input, setInput] = useState("");
    const { chatId, changeChat } = useChatStore();
    useEffect(() => {
        const unSub = onSnapshot(
          doc(db, "userchats", currentUser.id),
          async (res) => {
            const items = res.data().chats;
    
            const promises = items.map(async (item) => {
              const userDocRef = doc(db, "users", item.receiverId);
              const userDocSnap = await getDoc(userDocRef);
    
              const user = userDocSnap.data();
    
              return { ...item, user };
            });
    
            const chatData = await Promise.all(promises);
    
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          }
        );
        return () => {
            unSub();
        }
    },[currentUser.id])

    const handleSelect = async (chat) => {
      const userChats = chats.map((item) => {
        const { user, ...rest } = item;
        return rest;
      });
  
      const chatIndex = userChats.findIndex(
        (item) => item.chatId === chat.chatId
      );
  
      userChats[chatIndex].isSeen = true;
  
      const userChatsRef = doc(db, "userchats", currentUser.id);
  
      try {
        await updateDoc(userChatsRef, {
          chats: userChats,
        });
        changeChat(chat.chatId, chat.user);
      } catch (err) {
        console.log(err);
      }
    };
  
    const filteredChats = chats.filter((c) =>
      c.user.username.toLowerCase().includes(input.toLowerCase())
    );
  return (
    <div className='chatlist'>
        <div className='search'>
            <div className='searchbar'>
                <img src="./search.png" alt=""></img>
                <input type="text" placeholder='Search'></input>
            </div>
            <img onClick={() => setAdd((prev) => !prev)} src = {add ? "./minus.png" : "./plus.png"} alt='' className='plus'></img>
        </div>

        {filteredChats.map((chat) => (
            <div className='items' key={chat.Chatid} onClick={() => handleSelect(chat.chatId)}>
            <img src = {chat.user.avatar || './avatar.png'} alt=""></img>
            <div className='texts'>
                <span className='span'>{chat.user.username}</span>
                <p className='p'>{chat.lastMessage}</p>
            </div>
        </div>
        ))}
        {add && <User/>}
    </div>
  )
}
