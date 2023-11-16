import { createSignal, type Component, onMount } from 'solid-js';
import RouteData from './routes/route.data';
import { useNavigate } from '@solidjs/router';
import { useStore } from './store';
import Navbar from './containers/navbar/navbar';
import Login from './containers/login/login';
import NavbarOut from './containers/navbar/navbar-visit/navbar-out';


const App: Component = () => {
  const [{ sessionStore }] = useStore();
  const navigate = useNavigate();
  const [needLogin, setNeedLogin] = createSignal(true);
  
  onMount(() => {
    console.log('session ', sessionStore.sessionData);
    if (sessionStore.sessionData) {
      setNeedLogin(!needLogin());
    }
    console.log('need login ' + needLogin());
    if (needLogin()) {
      navigate('/dashboard/admin', { replace: true });
    }
  });

  const [currentPath, setCurrentPath] = createSignal(window.location.pathname);
  const [hiddenNavbar, setHiddenNavbar] = createSignal(true);

  onMount(() => {
    console.log('current path: ' + currentPath());
    console.log('hidden navbar '+ hiddenNavbar());

    if (currentPath() === "/login" || currentPath() === "/signup" ) {
      setHiddenNavbar(false);
    }
  })
  return (
    <>
      {!needLogin() ? <Navbar><RouteData /></Navbar> : <NavbarOut><RouteData/></NavbarOut>}
    </>
  );
};

export default App;
