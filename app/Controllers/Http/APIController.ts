import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { RequestContract } from '@ioc:Adonis/Core/Request';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';

export default class ApiController {

	private static API = 'https://api.thenewsapi.com/v1/news?top';
	private static LANGUAGE = 'ru';
	private static TEST_REQUEST = true;
	private static TEST_DATA = {
		status: 200,
		data: {
			coord: { lon: -0.1257, lat: 51.5085 },
			weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
			base: 'stations',
			main: { temp: 7.82, feels_like: 6.6, temp_min: 5.73, temp_max: 10.31, pressure: 1041, humidity: 87 },
			visibility: 10000,
			wind: { speed: 2.06, deg: 250 },
			clouds: { all: 3 },
			dt: 1641995162,
			sys: { type: 2, id: 2019646, country: 'GB', sunrise: 1641974505, sunset: 1642004119 },
			timezone: 0,
			id: 2643743,
			name: 'London',
			cod: 200,
		}
	}

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
		const response = await this.getRequestResult(request);
		if (response.status !== 200) throw new Error(`Статус ${response.status}`);
		if (!response.data) throw new Error('Отсутствуют данные о погоде');
		return response.data;
	}

	private getRequestResult(request: RequestContract) {

		const token = this.getToken();
		const category = String(this.getParam(request, 'category'));
		const page = parseInt(this.getParam(request, 'page'), 10);
		console.log('Параметры', category, page);
		
		// todo
		if (ApiController.TEST_REQUEST) return ApiController.TEST_DATA;

		return axios({
			method: 'GET',
			url: ApiController.API,
			params: {
				categories: category,
				api_token: token,
				language: ApiController.LANGUAGE,
			}
		});
	}

	private getToken(): string {
		const token = Env.get('OWM_TOKEN');
		if (!token) throw new Error('Отсутствует токен');
		return token;
	}

	private getParam(request: RequestContract, paramName: string): string {
		const param = decodeURI(request.param(paramName));
		if (!param) throw new Error('Отсутствует категория');
		return param;
	}
}
