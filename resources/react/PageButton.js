import React from "react";

export function PageButton(props){
	return (
		<div
			onClick={() => props.selectPage(props.isNext)}
			className="
				p-4 m-2
				rounded-full
				shadow hover:shadow-md
				border border-transparent hover:border-black/25
				cursor-pointer duration-100
			"
		>
			{props.isNext ? '❯❯' : '❮❮'}
		</div>
	);
}