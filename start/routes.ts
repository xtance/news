import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'IndexController.show');
Route.post('/api/news/:category/:page', 'ApiController.news')