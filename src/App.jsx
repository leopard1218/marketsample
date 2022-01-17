import React, { Fragment } from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

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
import Preloader from './containers/Preloader'
import ProtectedRoute from './helpers/ProtectedRoute'
import NonProtectedRoute from './helpers/NonProtectedRoute'

import Toast from './containers/Toast'

function App() {
  return (
    <Fragment>
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
        <Route path='author' element={<ProtectedRoute><Author /></ProtectedRoute>} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='wallet' element={<NonProtectedRoute><Wallet /></NonProtectedRoute>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Toast />
      <Footer />
      <ScrollToTop />
      <Preloader />
      {/* <Footer />
      <ScrollToTop />
      <Preloader />
      <Toast /> */}
    </Fragment>
  );
}

export default App
