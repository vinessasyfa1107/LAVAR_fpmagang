import { onMount, createSignal, type Component } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import './unggah_resep.css';

const Unggah_resep: Component = () => {
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];

        if (file) {
            setSelectedFile(() => file);
        } else {
            setSelectedFile(null);
        }
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
                        <label>Nama Masakan Anda</label>
                        <br />
                        <input type="text" placeholder="Masukkan nama masakan" />

                        <div class="unggah-resep-input2">
                            <p>Pilih file dengan format .png atau .jpg ke dalam form atau tarik & lepas file tersebut.</p>
                            <label for="file-upload"><Icon icon="ic:baseline-folder" color="white" width="30" height="30" /></label>
                            <input
                                type="file"
                                id="file-upload"
                                accept=".png, .jpg"
                                style="display: none"
                                onChange={handleFileChange}
                            />

                            {selectedFile() && (
                                <p>File yang dipilih: </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Unggah_resep;

