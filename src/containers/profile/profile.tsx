import { onMount, type Component, createSignal, JSX, createEffect, createMemo } from 'solid-js';
import './profile.css'
import { Icon } from '@iconify-icon/solid';
import { DataAccount, dataaccount } from '../../api/account';
import { useStore } from '../../store';
import Logout from '../logout/logout';
import { A } from '@solidjs/router';
import { dataProfile, profilePic } from '../../store/profile/ProfileStore';
import { DataResepUSer, resepuser } from '../../api/resep/dataresepuser';
import { resepUser, setResepUser } from '../../store/ResepUser/resep-user-data';
import { DataUlasan } from '../../api/ulasan';

export interface UserData {
    id_akun: number;
    username: string;
    email: string;
    password: string;
    deskripsi_profil: string;
}


const Profile: Component = () => {
    const [resepUser, setResepUser] = createSignal<resepuser[]>([])
    const [jumlahUlasan, setJumlahUlasan] = createSignal(0)

    onMount(async () => {
        const resepsaya = await DataResepUSer("resepsaya");
        console.log("resep saya, ", resepsaya)
        setResepUser(resepsaya)
        setJumlahUlasan(resepsaya.length)
    })
    
    const ulasanStates = new Map<resepuser, string>();
    const [jmlUlasan, setJmlUlasan] = createSignal('')

    // const fetchAndRenderUlasan = async (resep: resepuser) => {
    //     try {
    //         const response = await fetch(`/api/ulasan/${resep.id_resep}`);
    //         const ulasanData = await response.json();
    //         const jumlahUlasan = ulasanData.length;
    //         const result = `${jumlahUlasan} Ulasan`;
    //         setResepUser((prev) =>
    //             prev.map((prevResep) =>
    //                 prevResep.id_resep === resep.id_resep ? { ...prevResep, ulasan: result } : prevResep
    //             )
    //         );
    //         console.log('result', result);
    //     } catch (error) {
    //         console.error("Error fetching ulasan:", error);
    //         setResepUser((prev) =>
    //             prev.map((prevResep) =>
    //                 prevResep.id_resep === resep.id_resep ? { ...prevResep, ulasan: "0 Ulasan" } : prevResep
    //             )
    //         );
    //     }
    // };
    
    // createEffect(() => {
    //     resepUser().forEach((resep) => {
    //         fetchAndRenderUlasan(resep);
    //     });
    // });
    

    // createEffect(async () => {
    //     for (const resep of resepUser()) {
    //         await fetchAndRenderUlasan(resep);
    //     }
    // });
    

    
    // const combinedData = createMemo(() =>
    //     resepUser().map((resep) => ({
    //         ...resep,
    //         ulasan: ulasanStates.get(resep),
    //     }))
    // );

    const combinedData = createMemo(() => resepUser());

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
                    {profilePic()}
                    {/* <img src="/src/assets/img/profile.jpg" alt="" /> */}
                    <h1>{dataProfile().username}</h1>
                    <p>{dataProfile().desc}</p>
                </div>
                <div class="component-2">
                    <h2>Jumlah Koleksi Resep</h2>
                    <h1 style={{color:"#FFBE1A","font-size":"25px"}}>{jumlahUlasan()}</h1>
                </div>
                <div class="component-3">
                    <form>
                        <label>Email</label>
                        <input type="text" readonly
                        value={dataProfile().email}
                        />
                    </form>
                </div>
                <div class="component-4">
                    <A href="/editprofile"><button>Edit</button></A>
                </div>
                <div class="component-5">
                    <button onClick={showPopUp}><Icon icon="humbleicons:logout" color="red" width="28"/><p>KELUAR</p></button>
                </div>
            </div>
        </div>

        <div class="profile-my-recipes">
            <h1>Koleksi Resep</h1>
            <div class="recipes-group">

                {resepUser().map((resep)=> (
                <div class="recipe-card">
                    <img src="/src/assets/img/jamur_enoki.png" alt="" />
                    <div class="recipe-desc">
                        <div>
                            <div class="head">
                                <h1>{resep.nama_resep}</h1>
                                <button><Icon icon="bx:edit" width="24" height="24" /></button>
                            </div>
                            <div class="ct-recipe">
                                <h2>Bahan</h2>
                                <ul class='list-disc'>
                                    {resep.bahan_masak.map((bahan, index) => (
                                        <li>{bahan}</li>
                                    ))}
                                </ul>
                                <h2>Langkah</h2>
                                <ol class="list-decimal">
                                    {resep.cara_buat.map((langkah: number | boolean | Node | JSX.ArrayElement | (string & {}) | null | undefined, index: any) => (
                                        <li>{langkah}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        
                        <div class="reviews">
                            <p>{resep.ulasan}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div>
                
            </div>
        </div>
        {popUp() && <Logout onClose={closePopUp}/>}
    </div>
  );
};

export default Profile;

                {/* <div class="recipe-card">
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
                </div> */}