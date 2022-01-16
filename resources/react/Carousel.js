import React from "react";
import { NewsCard } from "./NewsCard";

export class Carousel extends React.Component {

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="flex flex-grow gap-4 z-10">
				{this.props.news.map((news, index) => {
					return (
						<NewsCard key={index} news={news} />
					);
				})}
			</div>
		);
	}
}
