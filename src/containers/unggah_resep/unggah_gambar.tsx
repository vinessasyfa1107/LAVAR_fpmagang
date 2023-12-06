import { onCleanup, createEffect, createSignal, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import './unggah_resep.css';

const Unggah_gambar: Component = () => {

    // deklarasi untuk semua function
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [imageUrl, setImageUrl] = createSignal<string | null>(null);
    const navigate = useNavigate();

    // function untuk mengunggah gambar
    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];

        if (file) {
            setSelectedFile(() => file);

            // Create a temporary URL for the selected image file
            const url = URL.createObjectURL(file);
            setImageUrl(() => url);
        } else {
            setSelectedFile(null);
            setImageUrl(null);
        }
    };
    
    // function agar user memasukkan foto (wajib)
    const isFormValid = () => {
        return !!selectedFile();
    };

    // function untuk kondisi form submit
    const handleSubmit = (event: Event) => {
        event.preventDefault();
        if (isFormValid()) {
            // Handle form submission logic here
            alert('Unggahan resep Anda berhasil diunggah!');
            navigate('/home', { replace: true });
        } else {
            alert('Masukkan gambar masakan sesuai resep yang Anda ketik di halaman sebelumnya!');
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
                    <form>
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

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Unggah_gambar;

