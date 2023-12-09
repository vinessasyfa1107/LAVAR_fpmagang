import { createSignal, type Component } from 'solid-js';
import DetailResep, { isiResep, isiUlasan } from './detail-resep';
import { dataProfile } from '../../../store/profile/ProfileStore';
import { Icon } from '@iconify-icon/solid';
import './ulasan-resep.css'

const UlasanResep: Component = () => {
    const [tambahUlasan, setTambahUlasan] = createSignal(false);

    function handleTambahUlasan(){
      setTambahUlasan(!tambahUlasan())
      console.log("click")
    }

    const [descUlasan, setDescUlasan] = createSignal('')

    const SubmitUlasan = async () => {
        const DataUlasan = {
            id_ulasan: 0,
            deskripsi_ulasan: descUlasan(),
            id_resep: isiResep().id_resep,
            id_akun: dataProfile().id
        }

        if (descUlasan() !== '') {
            try {
                const response = await fetch (`/api/ulasan/ins`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(DataUlasan)
                });
                if (response.ok) {
                    alert("Ulasan berhasil dikirim")
                    setTambahUlasan(false);
                } else {
                    const errorMessage = await response.text();
                    alert(`Gagal menambah data. Pesan kesalahan: ${errorMessage}`);
                    console.error('Gagal menambah data:', errorMessage);
                }
            } catch (error) {
                console.log("Gagal", error)
            }
        } else {
            alert('Mohon tulis ulasan anda')
        }
        

    };
  return (
    <div>
      <DetailResep/>
      <div style={{"padding-left":"50px","padding-bottom":"35px"}}>
      <div class="ulas-container">
            <div style={{display:"flex","justify-content":"right"}}>
              <button class="add-ulasan" onClick={handleTambahUlasan}><Icon icon={tambahUlasan() ? "mdi:comment-arrow-left-outline":"fluent:comment-add-16-regular"} width="25" /></button>
            </div>
            {tambahUlasan() && 
            <div>
                <div class="ulas-item">
                <div>
                    <h1>{dataProfile().username}</h1>
                </div>
                <div>
                    <input type="text" placeholder='Tambahkan ulasanmu di sini...'
                    value={descUlasan()}
                    onInput={(e) => setDescUlasan(e.currentTarget.value)}
                    />
                </div>
                </div>
                <div>
                    <button class="btn-add-ulasan" onClick={SubmitUlasan}>Simpan</button>
                </div>
            </div>
            }

            {!tambahUlasan() &&   
            <div style={{display:"flex", "flex-direction":"column",gap:"3vh"}}>
            {(isiUlasan() as any[]).map((review: any) => (
                <div class="ulas-item">
                <div>
                    <h1>{review.username}</h1>
                </div>
                <div>
                    <p>{review.deskripsi_ulasan}</p>
                </div>
                </div>
            ))}
            </div>
            }
      </div> 
      </div>

    </div>
  );
};

export default UlasanResep;