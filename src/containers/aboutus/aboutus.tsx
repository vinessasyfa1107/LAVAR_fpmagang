import { createSignal, type Component, onMount } from 'solid-js';
import './aboutus.css'
import Logout from '../logout/logout';
import { DataUlasan } from '../../api/ulasan';

const AboutUs: Component = () => {

  const [resepUser, setResepUser] = createSignal([{}])
  const [jumlahUlasan, setJumlahUlasan] = createSignal(0)

  onMount(async () => {
      const resepsaya = await DataUlasan("ULASAAAN");
      console.log("rea, ", resepsaya)
      setResepUser(resepsaya)
      setJumlahUlasan(resepsaya.length)
  })

  const [logout, setLogout] = createSignal(false);

  function showLogout(){
    setLogout(true);
  };
  function closeLogout(){
    setLogout(true);
  };
  
  return (
    <div class="about-us-page">
      {jumlahUlasan()}
        <div class="title">
            <h1>Tentang Kami</h1>
            <p>Kami adalah tim yang bersemangat dalam mengembangkan solusi untuk memudahkan kehidupan sehari-hari, 
              khususnya dalam dunia masak-memasak. <b>Laver</b> adalah hasil dari pemahaman kami tentang pasar kuliner di Indonesia dan kebutuhan pengguna di seluruh negeri.</p>
        </div>
        <div class="info-card">
          <div class="card">
            <h2>Jumlah Pengguna Bergabung dengan Kami</h2>
            <h1 style={{color:"#4F48ED"}}>2023</h1>
          </div>
          <div class="card">
            <h2>Jumlah Resep yang Telah Diunggah</h2>
            <h1 style={{color:"#FFBE1A"}}>2023</h1>
          </div>
        </div>
        <div>
          <p>Ketika kami memulai <b>Laver</b>, kami mengidentifikasi peluang bisnis yang sangat menarik dalam pasar kuliner Indonesia. Kami menyadari bahwa banyak orang, termasuk remaja yang tinggal sendiri, ibu muda, dan ibu-ibu di seluruh Indonesia, seringkali harus memasak dengan bahan terbatas di dapur mereka sendiri. Itulah sebabnya kami membuat <b>Laver</b> sebagai alat yang dapat membantu Anda dalam menghadapi tantangan tersebut.</p>
          <p style={{"line-height":"3"}}><b>Laver</b> memiliki fitur-fitur unik yang menjadikannya alat yang tak tergantikan dalam dunia kuliner Anda:</p>
        </div>

        <div class="info-card" style={{"margin-bottom":"40px"}}>
          <div class="info-card-1">
            <img src="/src/assets/img/aboutus1.jpg" alt="" />
            <div class="desc"><p>Mencari resep berdasarkan bahan yang ada di dapur Anda</p></div>
          </div>
          <div class="info-card-1">
            <img src="/src/assets/img/aboutus2.jpg" alt="" />
            <div class="desc"><p>Nikmati menjelajahi resep berdasarkan kategori bahan</p></div>
          </div>
          <div class="info-card-1">
            <img src="/src/assets/img/aboutus3.jpg" alt="" />       
            <div class="desc"><p>Rencanakan makanan anda dengan Lavar </p></div> 
          </div>
        </div>
        
        <div>
          <p>Anda dapat mengakses <b>Laver</b> melalui browser Anda secara gratis. Untuk menggunakan fitur-fitur lengkap, Anda dapat mendaftarkan diri dan membuat profil pengguna Anda. Setelah itu, mulailah menjelajahi dunia kuliner yang lebih seru dan praktis bersama <b>Laver</b>.</p>
          <br />
          <p>Kami berkomitmen untuk terus mengembangkan aplikasi ini, meningkatkan fungsionalitasnya, dan menjadikannya alat yang lebih berguna dalam dunia kuliner Anda. Kami berterima kasih atas dukungan Anda dan berharap <b>Laver</b> dapat membantu Anda dalam petualangan masak-memasak Anda.</p>
          <br />
          <p>Terima kasih telah bergabung dengan kami, dan selamat memasak!</p>
        </div>
    </div>
  );
};

export default AboutUs;
