import { createSignal, type Component, onMount } from 'solid-js';
import './login.css'
import { A } from '@solidjs/router';
import { Icon } from '@iconify-icon/solid';


const Login: Component = () => {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    onMount(() => {
    console.log('ini halaman Login');
    });

    const ActionLogin = () => {
    console.log('hallo login button clicked');
    const dataUser = { username: "bubbles", email: "bubbles_puff@gmail.com" };
    sessionStorage.setItem('userData', JSON.stringify(dataUser));
    window.location.assign('/');
    }

    const fetchLogin = async () => {
        try {
        const response = await fetch(`/api/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: username(),
            password: password(),
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to login');
        }
        } catch (error) {
        console.error(error);
        throw error;
        }
    };

    const ActionLogin1 = async () => {
        try {
        const data = await fetchLogin();
        // Cek apakah data login berhasil atau tidak
        if (data) {
            // Login berhasil, Anda dapat menyimpan data pengguna di sessionStorage atau localStorage
            sessionStorage.setItem('userData', JSON.stringify(data));
            // Redirect ke halaman utama atau halaman lain yang sesuai
            window.location.assign('/');
        } else {
            // Handle login gagal di sini
            console.error('Login failed');
        }
        } catch (error) {
        // Handle kesalahan saat melakukan permintaan login
        console.error(error);
        }
    };

    const [showPassword, setShowPassword] = createSignal(false);

    const PasswordVisibility = () => {
    setShowPassword(!showPassword());
    };

  return (
    <div class="container-login">
        <div class='login-content'>
            <h1>Selamat Datang</h1>
            <p>Temukan ribuan resep lezat dan inspirasi kuliner di Lavar. Mari mulai menjelajahi dunia rasa yang memikat!</p>
            <img src="/src/assets/img/NasiAyamBakar.PNG" alt="" width="400" style={{margin: "auto", display: "block"}}/>
        </div>
        <div class='login-card'>
            <div>

                <h1>Masuk</h1>
                <p>Ayo masuk dan mulailah pengalaman anda!</p>
            

            
                <label for="email">Email</label>
                <br />
                <input type="text" placeholder='Masukkan email Anda' name='email'/>

                <div style={{position:"relative"}}>
                    <label for="password">Password</label>
                    <br />
                    <input type={showPassword() ? 'text' : 'password'} placeholder='Masukkan Password Anda' name="password"/>
                    <Icon onClick={PasswordVisibility} class="pass-icon" icon="mdi:eye" color="rgba(187, 187, 187, 0.7333333333333333)" width="28" />
                </div>
                <br />


                <div>
                    <button onClick={ActionLogin}>MASUK</button>
                </div>

                <div class="buat-akun">
                    Apakah anda belum punya akun? <A href='/signup'>Buat Akun</A>
                </div>

            </div>
        </div>

    </div>
  );
};

export default Login;
