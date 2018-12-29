import React, { Component, Fragment } from 'react'
import Header from './components/header/header'
import Nav from './components/nav/nav'
import { BrowserRouter, Route } from 'react-router-dom'
import PageIndex from './pages/index/index'
import PageSearch from './pages/search/index'
import PageRank from './pages/rank/index'
import PageBookcase from './pages/bookcase/index'
import PageCategory from './pages/category/index'
import 'amfe-flexible/index.min.js'
import 'normalize.css'
import './assets/iconfont/iconfont.css'
import './App.scss'

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<Header />
					<Nav />
						<Route path='/' exact component={PageIndex} />
						<Route path='/search' exact component={PageSearch} />
						<Route path='/rank' exact component={PageRank} />
						<Route path='/category/:type' exact component={PageCategory} />
						<Route path='/bookcase' exact component={PageBookcase} />
				</Fragment>
			</BrowserRouter>
		)
	}
}

export default App
