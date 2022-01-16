import React from "react";

export function Container(props){
	return (
		<div className="
			mx-auto my-4 p-2
			w-full md:w-[90%] xl:w-[80%]
		">
			{props.children}
		</div>
	)
}