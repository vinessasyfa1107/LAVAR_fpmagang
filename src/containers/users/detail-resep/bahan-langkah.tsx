import type { Component } from 'solid-js';
import './bahan-langkah.css'
import { dataResep } from '../../../store/Resep/ResepData';
import DetailResep, { isiResep } from './detail-resep';

const BahanLangkah: Component = () => {
    console.log("bahan", dataResep().bahan);

    
  return (
    <div>
      <DetailResep/>
      <div class="bahan-langkah-container">
        <div class="bahan-langkah-box">

          <div>
            <h5>Bahan-bahan</h5>
            <ul>
            {isiResep().bahan.map((bahan, index) => (
                <li>{bahan}</li>
            ))}
            </ul>
          </div>

          <div>
            <h5>Langkah</h5>
            <ol>
            {isiResep().langkah.map((langkah, index) => (
                <li>{langkah}</li>
            ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BahanLangkah;
