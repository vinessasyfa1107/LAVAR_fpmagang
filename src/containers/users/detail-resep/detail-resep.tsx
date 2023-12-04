import type { Component } from 'solid-js';
import './detail-resep.css'
import { Icon } from '@iconify-icon/solid';

const DetailResep: Component = () => {
  return (
    <div class="detail-resep-page">
      <div class="head-detail-resep">
        <img src="/src/assets/img/jamur_enoki.png" alt="" />
        <div>
          <h1>Judul</h1>
          <h2>Username</h2>
          <h3>Total</h3>
          <button><Icon icon="material-symbols:edit-calendar" width="23" style={{"margin-right":"7px"}}/>Tambah Rencana Masak</button>
        </div>
      </div>
      <div class="detail-resep-ctn">

      </div>
    </div>
  );
};

export default DetailResep;
