import React from "react";

export class Carousel extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			news: ['a', 'b']
		}
	}

	componentDidMount(){
		this.getNews();
	}

	getNews(page = 0){
		this.setState({
			news: ['c', 'd']
		});
	}

	render(){
		return (
			<div>
				Test
				{this.state.news.map((news, index) => {
					return (
						<div key={index}>
							#{index} {news}
						</div>
					);
				})}
			</div>
		);
	}
}
