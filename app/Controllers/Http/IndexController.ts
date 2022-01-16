import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexController {

	public async show({ view }: HttpContextContract){
		return view.render('index');
	}

}