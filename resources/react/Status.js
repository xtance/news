import React from "react";

export function Status(props){
	return (
		<div className="p-4 mt-8 border-t text-center">
			<b>{props.category}</b> | стр. <b>#{props.page}</b>
		</div>
	);
}