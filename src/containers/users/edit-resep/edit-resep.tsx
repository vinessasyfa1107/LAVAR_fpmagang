import { useNavigate } from '@solidjs/router';
import { createSignal, type Component, onMount } from 'solid-js';
import './edit-resep.css'
import { Icon } from '@iconify-icon/solid';
import { isiResep, setIsiResep } from '../detail-resep/detail-resep';
import { DataResep } from '../../../api/resep/dataresep';

interface Ingredient {
    id: number;
    name: string;
}

interface Steps {
    id: number;
    desc: string;
}

const EditResep: Component = () => {
    const navigate = useNavigate();

    //declare variabel buat nyimpen value yang dikirim
    const [namaResep, setNamaResep] = createSignal('');
    const [kategori, setKategori] = createSignal('');
    const [waktuMasak, setWaktuMasak] = createSignal(0);
    const [fotoResep, setFotoResep] = createSignal('');
    const [bahan, setBahan] = createSignal(['']);
    const [langkah, setLangkah] = createSignal(['']);

    const [ingredients, setIngredients] = createSignal<Ingredient[]>(isiResep().bahan.map((b, index) => 
    ({ id: index + 1, name: b})
    ));
    const [steps, setSteps] = createSignal<Steps[]>(isiResep().langkah.map((b, index) => 
        ({ id: index + 1, desc: b})
    ));

    onMount(async () => {
        const storedData = localStorage.getItem('dataResep');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          await setIsiResep(parsedData);
          setFotoResep(`/api/resep/makanan/${parsedData.nama_foto}`);
          setNamaResep(isiResep().nama_resep)
          setKategori(isiResep().kategori)
          setWaktuMasak(isiResep().waktu_masak)
          // Pastikan bahan dan langkah ada sebelum digunakan
          if (parsedData.bahan && parsedData.langkah) {
            setIngredients(
              parsedData.bahan.map((b: any, index: number) => ({ id: index + 1, name: b }))
            );
            setSteps(
              parsedData.langkah.map((l: any, index: number) => ({ id: index + 1, desc: l }))
            );
          } else {
            // Jika bahan atau langkah tidak ada, setiap langkah atau bahan dapat dimulai dengan data kosong
            setIngredients([{ id: 1, name: '' }]);
            setSteps([{ id: 1, desc: '' }]);
          }
        } else {
          // Jika data tidak ada, setiap langkah atau bahan dapat dimulai dengan data kosong
          setIngredients([{ id: 1, name: '' }]);
          setSteps([{ id: 1, desc: '' }]);
        }
        console.log("p", ingredients().map(ingredient => ingredient.name));
        setBahan(ingredients().map(ingredient => ingredient.name));
        setLangkah(steps().map(step => step.desc))
        console.log("hlo", isiResep().id_foto)
    });
      

    const navigateBack = () => {
        navigate(-1)
    }


    console.log("bhn", ingredients().map(ingredient => ingredient.name));


    // function untuk iterasi ingredients
    const handleIngredientChange = (id: number, value: string) => {
        setIngredients((prevIngredients) =>
            prevIngredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, name: value } : ingredient
            )
        );
        setBahan(ingredients().map(ingredient => ingredient.name))
        console.log("add",ingredients().map(ingredient => ingredient.name))
    };


    const addIngredient = () => {
        setIngredients((prevIngredients) => [
            ...prevIngredients,
            { id: prevIngredients.length + 1, name: '' },
        ]);
    };

    const removeIngredient = (id: number) => {
        setIngredients((prevIngredients) =>
            prevIngredients.filter((ingredient) => ingredient.id !== id)
        );
    };

    //function untuk steps
    const handleStepsChange = (id: number, value: string) => {
        setSteps((prevSteps) =>
            prevSteps.map((steps) =>
                steps.id === id ? { ...steps, desc: value } : steps
            )
        );
        setLangkah(steps().map(steps => steps.desc))

    };

    const addSteps = () => {
        setSteps((prevSteps) => [
            ...prevSteps,
            { id: prevSteps.length + 1, desc: '' },
        ]);
    };

    const removeSteps = (id: number) => {
        setSteps((prevSteps) =>
            prevSteps.filter((steps) => steps.id !== id)
        );
    };

    const [fileProfile, setFileProfile] = createSignal<File | null>(null);

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files && target.files[0];

        if (file) {
            setFileProfile(() => file);
        } else {
            setFileProfile(null);
        }
    };

    const handleDeleteFile = () => {
        // Tangani penghapusan file di EditProfile
        setFileProfile(null);
    };

    const handleSubmitFoto = async () => {
        try {
            const response = await fetch (`/api/resep/update_foto`, {
                method: 'PUT',
                // headers: {
                //     'Content-Type':'application/json',
                // },
                body: JSON.stringify({})
            })
        } catch (error) {

        }
    }

    console.log("ppp", isiResep())
    const handleSubmit = async () => {
        const data = {
            id_resep: isiResep().id_resep,
            nama_resep: namaResep(),
            id_kategori: 3,
            total_bahan: bahan().length,
            waktu_masak: waktuMasak(),
            bahan_masak: bahan(),
            cara_buat: langkah(),
        }

        const dataFoto = new FormData;
        dataFoto.append('id_resep', `${isiResep().id_resep}`)
        dataFoto.append('id_foto', `${isiResep().id_foto}`)
        if (fileProfile()) {
            dataFoto.append('nama_foto', fileProfile()!);
        } else {
            dataFoto.append('nama_foto', fotoResep());
        }

        console.log("data", data)
        try {
            const response = await fetch (`/api/resep/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data)
            })
            const response2 = await fetch (`/api/resep/update_foto`, {
                method: 'PUT',
                // headers: {
                //     'Content-Type':'application/json',
                // },
                body: dataFoto
            })
            if (response.ok && response2.ok) {
                alert("Data berhasil diubah")
                navigate(-1);
                // navigate('/detail_resep_bahan_langkah');
            } else {
                const errorMessage = await response.text();
                alert(`Gagal menambah data. Pesan kesalahan: ${errorMessage}`);
                console.error('Gagal menambah data:', errorMessage);
                const errorMessage2 = await response2.text();
                alert(`Gagal menambah data. Pesan kesalahan: ${errorMessage2}`);
                console.error('Gagal menambah data:', errorMessage2);
            }
        } catch (error) {
            console.log("Gagal", error)
        }
    }
    
  return (
    <div style={{padding: "30px"}}>
        <div class="navigate-back-edit"onClick={navigateBack}>
            <svg style={{"margin-right":"15px"}} class="" xmlns="http://www.w3.org/2000/svg" width="15" height="29" viewBox="0 0 17 29" fill="none">
                <path d="M14.8281 1.84375L2.17188 14.5L14.8281 27.1562" stroke="black" stroke-width="3.28125" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>Edit Resep</h1>
        </div>
        <div class="edit-resep-box">
            <div class="edit-resep-head">
                <div class="edit-resep-foto">
                    <div style={{display:"flex"}}>
                        {fileProfile() && fileProfile() instanceof File && (
                            <div>
                            {fileProfile() && <img src={URL.createObjectURL(fileProfile() as Blob)} alt="Selected Profile" />}
                            </div>
                        )}
                        {!fileProfile() && (
                            <img src={fotoResep()} alt="" />
                        )}
                    </div>
                    <div class="btn-resep-foto">
                        <label for="fileInput"><Icon icon="ep:upload-filled" color="white" width="25" /></label>
                        <input type="file" id="fileInput" accept=".png, .jpg" style="display: none;" 
                        onChange={handleFileChange}
                        />
                        {fileProfile() && fileProfile() instanceof File && (
                            <div>
                            {/* <label style={{"margin-top":"12px", "background-color":"#FFBE1A"}}><Icon icon="ep:upload-filled" width="20" /></label> */}
                            <label style={{"margin-top":"12px", "background-color":"gray"}} onClick={handleDeleteFile}><Icon icon="ion:trash-sharp" width="20" /></label>
                            </div>
                        )}
                    </div>
                </div>

                <div class="resep-head-ctn" style={{gap:"2vh", "justify-content":"center","align-items":"left"}}>

                    <div class="resep-head-ctn">
                        <label>Nama Resep</label>
                        <input type="text" 
                        value={namaResep()}
                        onInput={(e) => setNamaResep(e.currentTarget.value)}
                        />
                    </div>

                    <div class="resep-head-ctn">
                        <label>Kategori</label>
                        <select class="py-0"
                        value={kategori()}
                        onInput={(e) => setKategori(e.currentTarget.value)}
                        >
                            <option value="">Pilih Kategori</option>
                        </select>
                    </div >

                    <div class="resep-head-ctn">
                        <label>Waktu Masak</label>
                        <div style={{display:"flex", "align-items":"center"}}>
                        <input type="number" style={{width:"70vh"}}
                        value={waktuMasak()}
                        onInput={(e) => setWaktuMasak(parseFloat(e.currentTarget.value))}
                        />
                        <p>Menit</p>
                        </div>
                    </div>

                </div>

            </div>
            <div class="edit-resep-container">
                <label>Bahan-bahan</label>
                {ingredients().map((ingredient, index) => (
                <div class="edit-ingredient-input">
                    <span>{index + 1}</span>
                    <input
                        type="text"
                        value={ingredient.name}
                        placeholder="Masukkan bahan"
                        onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
                    />
                    <button class="btn-remove-edit" onClick={() => removeIngredient(ingredient.id)}>
                        <Icon icon="ep:remove-filled" color="red" width="30" height="30" />
                    </button>
                </div>
                ))}
                <div class="btn-add-bahan">
                <button type="button" style={{}} onClick={addIngredient}>
                    <Icon icon="gridicons:add" color="#ffbe1a" width="30" height="30" />
                </button>
                </div>
            </div>
            <div class="edit-resep-container">
                <label>Langkah-langkah</label>
                {steps().map((steps, index) => (
                    <div class="edit-ingredient-input">
                        <span>{index + 1}</span>
                        <textarea
                            placeholder="Masukkan langkah masakan"
                            value={steps.desc}
                            onChange={(e) => handleStepsChange(steps.id, e.target.value)}>
                        </textarea>
                        <button class="btn-remove-edit" onClick={() => removeSteps(steps.id)}>
                            <Icon icon="ep:remove-filled" color="red" width="30" height="30" />
                        </button>
                    </div>
                ))}
                <div class="btn-add-bahan">
                    <button type="button" style={{}} onClick={addSteps}>
                        <Icon icon="gridicons:add" color="#ffbe1a" width="30" height="30" />
                    </button>
                </div>
            </div>
            <div style={{display:"flex"}}>
                <button class="edit-resep-button hapus-resep">Hapus</button>
                <button onClick={handleSubmit} class="edit-resep-button simpan-resep">Simpan</button>
            </div>
        </div>
    </div>
  );
};

export default EditResep;
