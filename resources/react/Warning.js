import React from "react";

export function Warning(props){
	if (!props.warning) return '';
	return (
		<div className="my-4 p-4 shadow-md">
			<h1 className="font-bold text-2xl">Уведомление</h1>
			<p>
				{props.warning}
			</p>
		</div>
	);
}