import { useUserStore } from '../../../lib/userStorage';
import './userinfo.css';

export default function UserInfo() {
  const { currentUser } =  useUserStore();
  return (
    <div className='userinfo'>
        <div className='user'>
            <img src = {currentUser.avatar || './avatar.png'} alt=''></img>
            <h3>{currentUser.username}</h3>
        </div>
        <div className='icons'>
            <img src="./more.png"></img>
            <img src="./video.png"></img>
            <img src="./edit.png"></img>
        </div>
    </div>
  )
}
