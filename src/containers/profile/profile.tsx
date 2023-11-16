import type { Component } from 'solid-js';
import './profile.css'
import { Icon } from '@iconify-icon/solid';

const Profile: Component = () => {
  return (
    <div class="profile-page">
        <div>
            <div class="profile-card">
                <div class="component-1">
                    <img src="/src/assets/img/profile.jpg" alt="" />
                    <h1>Huang Renjun</h1>
                    <p>Anak kos</p>
                </div>
                <div class="component-2">
                    <h2>Jumlah Koleksi Resep</h2>
                    <h1 style={{color:"#FFBE1A","font-size":"25px"}}>2</h1>
                </div>
                <div class="component-3">
                    <form>
                        <label>Email</label>
                        <input type="text" readonly
                        value="huangrenjun@gmail.com"
                        />
                        <label>Kata Sandi</label>
                        <input type="password" readonly
                        value="huangrenjun@gmail.com"
                        />
                    </form>
                </div>
                <div class="component-4">
                    <button>Edit</button>
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
    </div>
  );
};

export default Profile;
