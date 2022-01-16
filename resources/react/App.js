import "./App.css";
import React from "react";
import ReactDom from "react-dom";
import { Header } from "./Header";
import { Container } from "./Container";
import { Carousel } from "./Carousel";
import { Warning } from "./Warning";
import { Flex } from "./Flex";
import { PageButton } from "./PageButton";


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			warning: '',
			page: 0,
		}
	}

	setWarning = (warning) => {
		this.setState({ warning });
	}

	setPage = (b) => {

	}

	render(){
		return (
			<div>
				<Header />
				<Container>
					<Warning warning={this.state.warning} />
					<Flex>
						<PageButton setPage={this.setPage} isNext={false} />
						<Carousel setWarning={this.setWarning} />
						<PageButton setPage={this.setPage} isNext={true} />
					</Flex>
					
				</Container>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));