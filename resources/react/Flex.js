import React from "react";

export function Flex(props){
	return (
		<div className="flex justify-between items-center">
			{props.children}
		</div>
	);
}