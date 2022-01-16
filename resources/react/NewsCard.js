import React from "react";

export function NewsCard(props){
	return (
		<div
			className="
				w-[20%] h-[50vh]
				flex flex-col justify-end
				bg-cover bg-center bg-no-repeat
				shadow-md hover:shadow-lg
				border border-black/15 hover:border-black/25
				duration-100
			"
			style={{backgroundImage: `url("${props.news.image}")`}}
		>
			<div className="w-full bg-white/70">
				<h1>{props.news.title}</h1>
				<p>{props.news.subtitle}</p>
			</div>
		</div>
	);
}