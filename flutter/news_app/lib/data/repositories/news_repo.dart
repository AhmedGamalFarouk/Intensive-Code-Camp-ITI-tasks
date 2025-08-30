import 'package:news_app/data/api_service.dart';
import 'package:news_app/data/modals/news_model.dart';

//! https://newsapi.org/v2/everything?q=tesla&from=2025-04-21&sortBy=publishedAt&apiKey=647c58a2ad1c47e1a192ad1b4f1cd059

class NewsRepo {
  final ApiService _apiService = ApiService();

  Future<NewsModel?> getNews({String query = 'tesla'}) async {
    try {
      final List<Article> articles = await _apiService.fetchNews(query);

      return NewsModel(
        articles: articles,
        totalResults: articles.length,
        status: 'ok',
      );
    } catch (e) {
      print('Error fetching news: $e');
      return null;
    }
  }
}
