import React from "react";

export function NewsCard(props){
	return (
		<div
			className="
				w-[20%] h-[50vh]
				flex flex-col justify-end
				bg-cover bg-center bg-no-repeat
				shadow-md hover:shadow-lg
				duration-100
			"
			style={{backgroundImage: `url("${props.news.image}")`}}
		>
			<a className="w-full block p-2 bg-black/50 text-white backdrop-blur-lg border-t" href={props.news.url}>
				<h1 className="font-bold">{props.news.title}</h1>
				<p>{props.news.subtitle}</p>
			</a>
		</div>
	);
}