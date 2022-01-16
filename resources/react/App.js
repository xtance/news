import "./App.css";

import React from "react";
import ReactDom from "react-dom";

import { Header } from "./Header";
import { Container } from "./Container";
import { Carousel } from "./Carousel";
import { Warning } from "./Warning";
import { Flex } from "./Flex";
import { PageButton } from "./PageButton";
import { Status } from "./Status";
import { Categories } from "./Categories";


class App extends React.Component {

	static NEWS_PER_PAGE = 5;
	static WARNING_TIME_MS = 5000;
	static DEFAULT_CATEGORY = 'general';

	constructor(props){
		super(props);
		this.state = {
			warning: '',
			page: 0,
			category: '',
			allNews: [],
			currentNews: [],
		}
	}

	componentDidMount () {
		this.setCategory(App.DEFAULT_CATEGORY);
	}

	/* Показать уведомление, уберётся само собой */
	setWarning = (warning) => {
		this.setState({ warning });
		setTimeout(() => {
			if (this.state.warning !== warning) return;
			this.setState({ warning: '' });
		}, App.WARNING_TIME_MS);
	}

	/* Выбрать категорию, обнулить все предыдущие новости */
	setCategory = (category) => {
		const page = 0;
		const allNews = [];
		const currentNews = [];
		this.setState({ category, page, allNews, currentNews });
		setTimeout(() => this.getNews());
	}

	/* Выбрать страницу и подгрузить с неё новости */
	selectPage = (b) => {
		const page = this.state.page + (b ? 1 : -1);
		if (page < 0) this.setWarning('Нельзя туда листать.');
		else if (this.isPageLoaded(page)) this.setNews(page);
		else this.getNews(page);
	}

	/* Проверяет, были ли загружены новости с этой страницы */
	isPageLoaded = (page) => {
		return this.state.allNews.length > (page * App.NEWS_PER_PAGE);
	}

	/* Получает новости с сервера */
	getNews = async (page = 0) => {
		this.setWarning('Загружаем новости...');
		try {
			const response = await fetch(`${window.location.href}api/news/${this.state.category}/${page}`, { method: 'POST' });
			const json = await response.json();

			if (json.error) throw new Error(json.error);
			if (response.status !== 200) throw new Error(response.statusText);

			this.setState({ allNews: this.state.allNews.concat(json.news) });
			if (this.isPageLoaded(page)) this.setNews(page);
			else this.setWarning(`Не удалось загрузить страницу ${page}`);
		}
		catch (e) {
			this.setWarning(e.toString());
			console.log(e);
		}
	}

	/* Устанавливает новости в соответствии с данной страницей */
	setNews = (page) => {
		const allNews = this.state.allNews;
		const currentNews = allNews.slice(page * App.NEWS_PER_PAGE, page * App.NEWS_PER_PAGE + App.NEWS_PER_PAGE);
		this.setState({ currentNews });
		this.setState({ page });
	}

	render(){
		return (
			<div>
				<Header />
				<Container>

					<Categories setCategory={this.setCategory} />
					
					<Flex>
						<PageButton selectPage={this.selectPage} isNext={false} />
						<Carousel news={this.state.currentNews} />
						<PageButton selectPage={this.selectPage} isNext={true} />
					</Flex>

					<Status page={this.state.page} category={this.state.category} />

					<Warning warning={this.state.warning} />
					
				</Container>
			</div>
		);
	}
}

ReactDom.render(<App />, document.getElementById('app'));