// import { Icon } from '@iconify-icon/solid';
import './logout.css'
import type { Component } from 'solid-js';

const Logout: Component = () => {
    return (
        <div>
            <div class="logout-pop-up">
                <div>
                    <h1>Keluar</h1>
                </div>
                <div style={{display:"flex", "flex-direction":"column", "align-items":"center", gap:"4vh", "margin-top":"30px"}}>
                <div>
                    <img src="/src/assets/img/logout.png" alt="" />
                </div>
                <div>
                <p>Apakah anda yakin untuk Keluar?</p>
                </div>
                <div class="logout-btn" style={{display:"flex","flex-direction":"row", gap:"4vh"}}>
                    <button class="btn-tidak">Tidak</button>
                    <button class="lanjut">Lanjut</button>
                </div>
                </div>
            </div>
        </div>
  );
};

export default Logout;
