import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import calculator from './components/Calculator'
import SignIn from './components/auth/SignIn';
import register from './components/auth/Register';
import profile from './components/Profile';
import Navbar from './components/Navbar';
import log from './components/Log';
import resetPassword from './components/auth/ResetPassword';
import LogActivity from './components/LogActivity';
import Home from './components/Home';
import Gear from './components/Gear';
import Backpack from './components/Backpack';
import Backpack_V2 from './components/Backpack_V2';
import EditLog from './components/EditLog';
import Footer from './components/Footer'
import AddProduct from './components/AddProduct';
import SiteMap from './components/SiteMap';
import SocialMedia from './components/SocialMedia';
import NotFound from './components/NotFound'
import SubmitGear from './components/SubmitGear';
import Loading from './components/Loading';
import EditDetails from './components/EditDetails';
import LogDetails from './components/LogDetails';
import PhotoEditor from './components/PhotoEditor';
import withSplashScreen from './components/withSplashScreen'

function App() {
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
  }
  return (
    <BrowserRouter>
      <header>
        <Navbar/>
      </header>
      <main className="App">
        <Switch>
            <Route exact path='/' component={ Home }></Route>
            <Route path='/calculator' component={ calculator }></Route>
            <Route path='/gear' component={ Gear }></Route>
            <Route path='/register' component={ register }></Route>
            <Route path='/log' component={ log }></Route>
            <Route path='/account' component={ profile }></Route>
            <Route path='/resetPassword' component={ resetPassword }></Route>
            <Route path='/logActivity' component={ LogActivity }></Route>
            <Route path='/signIn' component={ SignIn }></Route>
            <Route path='/backpack' component={ Backpack }></Route>
            <Route path='/backpackv2' component={ Backpack_V2 }></Route>
            <Route path='/editLog/:id' component={ EditLog }></Route>
            <Route path='/addProduct' component={ AddProduct }></Route>
            <Route path='/submitGear' component={ SubmitGear }></Route>
            <Route path='/loading' component={ Loading }></Route>
            <Route path='/editDetails' component={ EditDetails}></Route>
            <Route path='/logDetails/:id' component={ LogDetails }></Route>
            <Route path='/photoEditor' component={ PhotoEditor }></Route>
            <Route component={NotFound} />
          </Switch>
      </main>
      <SocialMedia />
      <SiteMap />
      <Footer />
    </BrowserRouter>
  );
}

export default withSplashScreen(App);