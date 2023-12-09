import { onCleanup, createEffect, createSignal, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import './unggah_resep.css';
import { resultresep } from '../../api/resep/dataresep';

export async function getLastIdResep(): Promise<number | null> {
    const response = await fetch(`/api/resep/show`);
    const results = await response.json();
    const documents = results as resultresep[];

    if (documents.length > 0) {
        return documents[documents.length - 1].id_resep;
    } else {
        return null;
    }
}

const Unggah_gambar: Component = () => {

    // deklarasi untuk semua function
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [imageUrl, setImageUrl] = createSignal<string | null>(null);
    const navigate = useNavigate();

    // untuk mengambil id resep terakhir
    createEffect(async () => {
        // Mengambil id_resep terakhir saat komponen dipasang
        const lastIdResep = await getLastIdResep();
        // Gunakan lastIdResep sesuai kebutuhan, misalnya, simpan di state komponen
        console.log('Last Id Resep:', lastIdResep);
    });

    // function untuk mengunggah gambar
    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];


        if (file) {
            setSelectedFile(() => file);
            console.log('test', selectedFile());

            // Create a temporary URL for the selected image file
            const url = URL.createObjectURL(file);
            setImageUrl(() => url);
        } else {
            setSelectedFile(null);
            setImageUrl(null);
        }
    };

    // function agar user memasukkan foto (wajib)
    // const isFormValid = () => {
    //     return !!selectedFile();
    // };

    // function untuk kondisi form submit
    const handleSubmit = async () => {
        const idResepValue = 0;
        const idFotoValue = 0;
        const lastIdResep = await getLastIdResep();
        const unggah = new FormData();

        unggah.append('id_resep', '0');
        unggah.append('id_foto', '0');

        if (selectedFile()) {
            unggah.append('foto resep', selectedFile()!);
        }

        console.log("??", selectedFile())

        // event.preventDefault();

        try {
            const response = await fetch('/api/resep/inspic', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: unggah,
            });

            if (response.ok) {
                alert("Gambar berhasil diunggah");
                navigate('/home', { replace: true });
                // window.location.reload();
            } else {
                const errorMessage = await response.text();
                alert(`Gagal mengubah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal mengubah data:', errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        navigate('/unggah_resep', { replace: true }); // Navigate to the home page when cancel button is clicked
    };


    return (
        <div>
            <div class="unggah-resep-container">
                <div class="unggah-resep-title">
                    <Icon icon="ion:chevron-back" color="black" width="38" height="38" />
                    <h2>Unggah Resep</h2>
                </div>

                <div class="unggah-resep-input">
                    {/* <form> */}
                        <div class="unggah-resep-input2">
                            <div class="unggah-foto">
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept=".png, .jpg"
                                    style="display: none"
                                    onChange={handleFileChange}
                                />
                                <label for="file-upload">{imageUrl() ? (
                                    <img src={imageUrl()!} alt="Selected Image" width="100" height="100" />
                                ) : (
                                    <Icon icon="icon-park:upload-one" width="68" height="68" />
                                )}</label>
                                <p style={{ "font-family": "Poppins-Light" }}>Unggah gambar masakan</p>
                            </div>
                        </div>

                        <div class="button-bawah">
                            <button class="button-unggah" onClick={handleSubmit}>
                                Unggah Resep
                            </button>

                            <button class="button-cancel" onClick={handleCancel}>
                                Kembali
                            </button>
                        </div>

                    {/* </form> */}
                </div>
            </div>
        </div>
    );
};

export default Unggah_gambar;

