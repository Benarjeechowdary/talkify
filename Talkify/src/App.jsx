import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useChatStore } from "./lib/chatStore";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStorage";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } =  useUserStore();
  const { chatId } = useChatStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user) => {
      fetchUserInfo(user?.uid)
    });
    return () => {
      unSub();
    }
  },[fetchUserInfo]);
  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>
  return (
    <div className='container'>
      {currentUser ? (
        <>
        <List></List>
        {chatId && <Chat></Chat>}
        {chatId && <Detail></Detail>}
        </>
      ) : (<Login/>)}
      <Notification></Notification>
    </div>
  )
}

export default App