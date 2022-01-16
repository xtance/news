import React from "react";
import { NewsCard } from "./NewsCard";

export class Carousel extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			news: ['a', 'b']
		}
	}

	componentDidMount () {
		this.getNews();
	}

	getNews(page = 0){
		this.setState({
			news: [ { title: 'abc' }, 'c', 'd', 'e', 'f', 'g', 'h', 'i', ]
		});
		//setTimeout(() => this.props.setWarning('test'), 1230);
	}

	render(){
		return (
			<div className="flex flex-grow gap-4 z-10">
				{this.state.news.slice(0, 5).map((news, index) => {
					return (
						<NewsCard key={index} news={news} />
					);
				})}
			</div>
		);
	}
}
