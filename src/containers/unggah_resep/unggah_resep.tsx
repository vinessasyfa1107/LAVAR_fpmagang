import { onCleanup, createEffect, createSignal, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';
import './unggah_resep.css';

interface Ingredient {
    id: number;
    name: string;
}

interface Steps {
    id: number;
    desc: string;
}

const Unggah_resep: Component = () => {

    // deklarasi untuk semua function
    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);
    const [ingredients, setIngredients] = createSignal<Ingredient[]>([
        { id: 1, name: '' }, // Initial input box
    ]);
    const [steps, setSteps] = createSignal<Steps[]>([
        { id: 1, desc: '' }, // Initial input box
    ]);
    const navigate = useNavigate();

    // function untuk iterasi ingredients
    const handleIngredientChange = (id: number, value: string) => {
        setIngredients((prevIngredients) =>
            prevIngredients.map((ingredient) =>
                ingredient.id === id ? { ...ingredient, name: value } : ingredient
            )
        );
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

    // function untuk mengecek user minimal memasukkan 1 bahan atau langkah
    const isFormValid = () => {
        // Check if at least one ingredient and one step are entered
        return ingredients().some((ingredient) => ingredient.name.trim() !== '') && steps().some((step) => step.desc.trim() !== '');

    };

    // function untuk kondisi form submit
    const handleSubmit = (event: Event) => {
        event.preventDefault();
        if (isFormValid()) {
            navigate('/unggah_gambar', { replace: true });
        } else {
            alert('Isi kotak yang sudah Anda tambahkan');
        }
    };

    const handleCancel = () => {
        navigate('/home', { replace: true }); // Navigate to the home page when cancel button is clicked
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
                        <input style={{ "margin-left": "18px" }} type="text" placeholder="Masukkan nama masakan" />
                        <div class="unggah-resep-input2">
                            <div class="bahan-resep">
                                <label>Bahan-bahan</label>
                                {ingredients().map((ingredient, index) => (
                                    <div class="ingredient-input">
                                        <span>{index + 1}</span>
                                        <input
                                            type="text"
                                            value={ingredient.name}
                                            placeholder="Masukkan bahan"
                                            onChange={(e) => handleIngredientChange(ingredient.id, e.target.value)}
                                        />
                                        <button type="button" onClick={() => removeIngredient(ingredient.id)}>
                                            <Icon icon="ep:remove-filled" color="red" width="30" height="30" />
                                        </button>
                                    </div>
                                ))}
                                <div class="button-add">
                                    <button type="button" style={{}} onClick={addIngredient}>
                                        <Icon icon="gridicons:add" color="#ffbe1a" width="30" height="30" />
                                    </button>
                                </div>

                            </div>

                            <div class="langkah-masak">
                                <label>Langkah-langkah</label>
                                {steps().map((steps, index) => (
                                    <div class="steps-input">
                                        <span>{index + 1}</span>
                                        <textarea
                                            placeholder="Masukkan langkah masakan"
                                            onChange={(e) => handleStepsChange(steps.id, e.target.value)}>
                                        </textarea>
                                        <button type="button" onClick={() => removeSteps(steps.id)}>
                                            <Icon icon="ep:remove-filled" color="red" width="30" height="30" />
                                        </button>
                                    </div>
                                ))}
                                <div class="button-add2">
                                    <button type="button" style={{}} onClick={addSteps}>
                                        <Icon icon="gridicons:add" color="#ffbe1a" width="30" height="30" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="button-bawah">
                            <button class="button-unggah" onClick={handleSubmit}>
                                Lanjut
                            </button>

                            <button class="button-cancel" onClick={handleCancel}>
                                Batal
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Unggah_resep;

