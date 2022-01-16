import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';

export default class ApiController {

	private static API = 'https://api.thenewsapi.com/v1/news/top/';
	private static LANGUAGE = 'en';
	private static TEST_REQUEST = false;
	private static NEWS_PER_PAGE = 5;

	// @ts-ignore
	private static TEST_DATA_1 = [
		{ title: 'Заголовок новости', subtitle: 'Описание новости', image: 'https://xpro.pw/puzzle/images/retrowave.jpg', url: 'example.org', },
		{ title: 'Заголовок новости', subtitle: 'Описание новости', image: 'https://xpro.pw/puzzle/images/keyboard2.jpg', url: 'example.org', },
		{ title: 'Заголовок новости', subtitle: 'Описание новости', image: 'https://xpro.pw/puzzle/images/water.jpg', url: 'example.org,' },
		{ title: 'Заголовок новости', subtitle: 'Описание новости', image: 'https://xpro.pw/puzzle/images/hesburger.jpg', url: 'example.org', },
		{ title: 'Заголовок новости', subtitle: 'Описание новости', image: 'https://xpro.pw/puzzle/images/kotiki.jpg', url: 'example.org', },
	];

	// @ts-ignore
	private static TEST_DATA_2 = [
		{
			title: 'Салливан анонсировал новые дипломатические шаги США в переговорах с Россией',
			subtitle: 'Американская администрация в начале следующей недели сможет представить дополнительн...',
			image: 'https://cdnn21.img.ria.ru/images/sharing/article/1768125304.jpg?15859838281642357352',
			url: 'https://ria.ru/20220116/peregovory-1768125304.html'
		},
		{
			title: 'Франция вводит вакцинные пропуска',
			subtitle: 'В соответствии с документом, вакцинный пропуск будет нужен для посещения кафе, рестора?...',
			image: 'https://cdnn11.img.sputnik.by/img/07e5/0b/19/1058234288_0:512:2730:2048_2072x0_60_0_0_fa4c566c0fa7c629b9588c0b3cab98e8.jpg',
			url: 'https://sputnik.by/20220116/frantsiya-vvodit-vaktsinnye-propuska-1059540098.html'
		},
		{
			title: 'Парламент Франции в окончательном чтении принял законопроект о вакцинных пропусках',
			subtitle: 'Парламент Франции в окончательном чтении принял законопроект о введении вакцинных про...',
			image: 'https://cdnn21.img.ria.ru/images/sharing/article/1768125008.jpg?15815604711642356772',
			url: 'https://ria.ru/20220116/frantsiya-1768125008.html'
		},
		{
			title: 'СК возбудил дело о разжигании вражды или ненависти после инцидента в московском автобусе',
			subtitle: 'Уголовное дело по статье о возбуждении ненависти или вражды возбуждено после того, как ...',
			image: 'https://cdnn21.img.ria.ru/images/sharing/article/1768124698.jpg?15958599501642356509',
			url: 'https://ria.ru/20220116/vrazhda-1768124698.html'
		},
		{
			title: 'The Bell — деньги, бизнес, власть',
			subtitle: 'Все важное для деловых людей на одном сайте. Закрытые встречи BellClub. Вдохновляющие истор...',
			image: 'https://thebell.io/wp-content/uploads/2018/03/thebell-cover.png',
			url: 'https://thebell.io/talks-stall-fears-rise'
		}
	];

	/* Метод получения новостей */
	public async news({ request, response }: HttpContextContract) {
		try {
			const data = await this.getNewsData(request);
			return response.status(200).json(data);
		}
		catch (e) {
			const error = e.toString();
			console.log('Ошибка', e, error);
			return response.status(500).json({ error });
		}
	}

	private async getNewsData(request: RequestContract) {
		if (ApiController.TEST_REQUEST) return { news: ApiController.TEST_DATA_2 };
		else return this.getNewsFromAPI(request);
	}

	private async getNewsFromAPI(request: RequestContract) {

		const token = this.getToken();
		const category = String(this.getParam(request, 'category'));
		const page = parseInt(this.getParam(request, 'page'), 10) + 1;
		console.log('Параметры', category, page);

		const response = await axios({
			method: 'GET',
			url: ApiController.API,
			params: {
				page: page,
				categories: category,
				api_token: token,
				language: ApiController.LANGUAGE,
			}
		});

		if (response.status !== 200) throw new Error(`Статус ${response.status}`);
		if (!response.data) throw new Error('Отсутствуют новости');

		console.log('Дата', response?.data?.data);

		const news = (response?.data?.data || []).map(one => {
			return {
				title: one.title,
				subtitle: one.description,
				image: one.image_url,
				url: one.url,
			}
		});

		console.log('Новости', news);
		news.length = ApiController.NEWS_PER_PAGE;
		return { news };
	}

	private getToken(): string {
		const token = Env.get('NEWS_TOKEN');
		if (!token) throw new Error('Отсутствует токен');
		return token;
	}

	private getParam(request: RequestContract, paramName: string): string {
		const param = decodeURI(request.param(paramName));
		if (!param) throw new Error('Отсутствует категория');
		return param;
	}
}
