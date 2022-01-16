import React from "react";

export function Notify(props){
	return (
		<div className="my-2 p-4 shadow-md">
			<h1 className="font-bold text-2xl">Уведомление</h1>
			<p>
				{props.text}
			</p>
		</div>
	);
}