import React from 'react'; // Import React
import styles from './style';
import {Footer, Navbar} from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Singup from './components/Signup';
import Guild from './components/Guild';
import Home from './components/Home';
import Profile from './components/Profile';
import CompleteProfile from './components/CompleteProfile';
import Members from './components/Members';
import OtherProfile from './components/OtherProfile';
import Apply from './components/Apply';
const App = () => (
  <BrowserRouter>
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Singup />} />
            <Route exact path="/members" element={<Members />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<OtherProfile />} />
            <Route exact path="/completeProfile" element={<CompleteProfile />} />
            <Route exact path="/guild" element={<Guild />} />
            <Route exact path="/apply" element={<Apply/>} />
          </Routes>
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
