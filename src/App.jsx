import React, { Fragment } from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

// import Preloader from './components/Preloader';
import Header from './containers/Header'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import ExploreAll from './pages/explore/ExploreAll'
import Auctions from './pages/explore/Auctions'
import Activity from './pages/Activity'
import BlackVeMarketNews from './pages/news/BlackMarketNews'
import VeThugsNews from './pages/news/VeThugsNews'
import ItemDetail from './pages/explore/ItemDetail'
import Author from './pages/Author'
import Blog from './pages/news/Blog'
import ForgotPassword from './pages/ForgotPassword'
import Wallet from './pages/Wallet'
import AuthorAll from './pages/AuthorAll'
import Create from './pages/Create'
import Preloader from './containers/Preloader'
import ProtectedRoute from './helpers/ProtectedRoute'
import NonProtectedRoute from './helpers/NonProtectedRoute'

function App() {
  return (
    <Fragment>
      {/* <Preloader/> */}
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='explore'>
          <Route path='all' element={<ExploreAll />} />
          <Route path='all/:category/:collection' element={<ExploreAll />} />
          <Route path=':contract/:tokenId' element={<ItemDetail />} />
          <Route path='auctions' element={<Auctions />} />
        </Route>
        <Route path='activity' element={<Activity />} />
        <Route path='news'>
          <Route path='market' element={<BlackVeMarketNews />} />
          <Route path='vethugs' element={<VeThugsNews />} />
          <Route path=':id' element={<Blog />} />
        </Route>
        <Route path='author/all' element={<AuthorAll />} />
        <Route path='author/:id' element={<ProtectedRoute><Author /></ProtectedRoute>} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='wallet' element={<NonProtectedRoute><Wallet /></NonProtectedRoute>} />
        <Route path='create' element={<Create />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <Preloader />
    </Fragment>
  );
}

export default App
