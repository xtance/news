import React from "react";

export class Categories extends React.Component {

	static cats = {
		'Общее': 'general',
		'Наука': 'science',
		'Спорт': 'sports',
		'Здоровье': 'health',
		'Технологии': 'tech',
		'Путешествия': 'travel',
	}

	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="flex flex-grow justify-center gap-4 z-10 border-b mb-8 cursor-pointer">
				{Object.keys(Categories.cats).map((cat, index) => {
					return (
						<div
							key={index}
							className="p-2 hover:font-bold"
							onClick={() => this.props.setCategory(Categories.cats[cat])}>
							{cat}
						</div>
					);
				})}
			</div>
		);
	}
}