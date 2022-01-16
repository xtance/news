import "./App.css";
import React from "react";
import ReactDom from "react-dom";
import { Header } from "./Header";
import { Container } from "./Container";
import { Carousel } from "./Carousel";


class App extends React.Component {
	render(){
		return (
			<div>
				<Header />
				<Container>
					<Carousel />
				</Container>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));