import React, { Component } from 'react'
import { getCategories } from '../../API/API'
import CategoryItem from '../../components/category-item/category-item'
import './index.scss'

class PageIndex extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categories: []
		}
	}
	componentDidMount() {
		const { sex } = this.props.match.params
		getCategories(sex).then(data => this.setState({ categories: data.data }))
	}
	render() {
		const { categories } = this.state
		return (
			<div className={`categories ${categories.length % 2 === 1 && 'fix'}`}>
				{categories.length !== 0 &&
					categories.map(category => (
						<CategoryItem
							category={category}
							key={category.cateID}
							count={category.count}
							onClick={this.handleCategoryClick.bind(this, category)}
						/>
					))}
			</div>
		)
	}
	handleCategoryClick(a) {
		console.log(a)
	}
}

export default PageIndex
