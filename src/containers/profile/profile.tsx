import { onMount, type Component, createSignal } from 'solid-js';
import './profile.css'
import { Icon } from '@iconify-icon/solid';
import { DataAccount, resultdata } from '../../api/account';
import { useStore } from '../../store';
import Logout from '../logout/logout';

export interface UserData {
    id_akun: number;
    username: string;
    email: string;
    password: string;
    deskripsi_profil: string;
}


const Profile: Component = () => {
    const [{ sessionStore }] = useStore();

    const userDataString = sessionStore.sessionData as unknown as string; // Ensure sessionData is a string
    const userData = JSON.parse(userDataString) as UserData; // Parse the JSON string to an object
    // const UserID = userData.username;

    onMount(async () => {
        const response = await fetch(
            `/api/account/${userData?.username}`
          );
          
          const results = await response.json();
          // console.log("response ", results)
          const documents = results as resultdata[];
          console.log(documents);
      
          return documents.slice(0, documents.length).map(({ id_akun, username, email, password, deskripsi_profil  }) => ({
              id_akun, username, email, password, deskripsi_profil
            })
          );
    });


    const [popUp, setPopUp] = createSignal(false);

    function showPopUp(){
        setPopUp(true);
    }
    
    function closePopUp(){
        setPopUp(false);
    }

  return (
    <div class="profile-page">
        <div>
            <div class="profile-card">
                <div class="component-1">
                    <img src="/src/assets/img/profile.jpg" alt="" />
                    <h1>{userData?.username}</h1>
                    <p>{userData?.deskripsi_profil}</p>
                </div>
                <div class="component-2">
                    <h2>Jumlah Koleksi Resep</h2>
                    <h1 style={{color:"#FFBE1A","font-size":"25px"}}>2</h1>
                </div>
                <div class="component-3">
                    <form>
                        <label>Email</label>
                        <input type="text" readonly
                        value={userData?.email}
                        />
                        {/* <label>Kata Sandi</label>
                        <input type="password" readonly
                        value="huangrenjun@gmail.com"
                        /> */}
                    </form>
                </div>
                <div class="component-4">
                    <button>Edit</button>
                </div>
                <div class="component-5">
                    <button onClick={showPopUp}><Icon icon="humbleicons:logout" color="red" width="28"/><p>KELUAR</p></button>
                </div>
            </div>
        </div>

        <div class="profile-my-recipes">
            <h1>Koleksi Resep</h1>
            <div class="recipes-group">
                <div class="recipe-card">
                    <img src="/src/assets/img/jamur_enoki.png" alt="" />
                    <div class="recipe-desc">
                        <div>
                        <div class="head">
                            <h1>Jamur Enoki</h1>
                            <button><Icon icon="bx:edit" width="24" height="24" /></button>
                        </div>
                        <div class="ct-recipe">
                        <h2>Bahan</h2>
                        <ul class='list-disc'>
                            <li>2 bungkus jamur enoki</li>
                            <li>3/4 cangkir Tepung serbaguna</li>
                            <li>1 sdt cabai bubuk</li>
                            <li>1/3 cangkir Tepung Jagung</li>
                        </ul>
                        <h2>Langkah</h2>
                        <ol class="list-decimal">
                            <li>2 bungkus jamur enoki</li>
                            <li>3/4 cangkir Tepung serbaguna</li>
                            <li>1 sdt cabai bubuk</li>
                            <li>1/3 cangkir Tepung Jagung</li>
                        </ol>
                        </div>
                        </div>
                        <div class="reviews">
                            <p>13 Ulasan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {popUp() && <Logout onClose={closePopUp}/>}
    </div>
  );
};

export default Profile;
