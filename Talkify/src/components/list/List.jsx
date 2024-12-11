import ChatList from './chatlist/ChatList';
import './list.css';
import UserInfo from './userinfo/UserInfo';

export default function List() {
  return (
    <div className='list'>
        <UserInfo></UserInfo>
        <ChatList></ChatList>
    </div>
  )
}
