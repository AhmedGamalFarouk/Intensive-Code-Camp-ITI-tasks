import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:news_app/data/modals/news_model.dart'; // Changed import to use Article from news_model.dart

class ApiService {
  final String _apiKey = '647c58a2ad1c47e1a192ad1b4f1cd059';
  final String _baseUrl = 'https://newsapi.org/v2/everything';

  Future<List<Article>> fetchNews(String query) async {
    final String fromDate =
        DateTime.now()
            .subtract(Duration(days: 3))
            .toIso8601String()
            .split('T')
            .first;
    final String toDate = DateTime.now().toIso8601String().split('T').first;
    final url =
        '$_baseUrl?q=$query&from=$fromDate&to=$toDate&sortBy=publishedAt&apiKey=$_apiKey&pageSize=30';
    print('Fetching news from: $url'); // Debug print
    final response = await http.get(Uri.parse(url));

    print('Status code: ${response.statusCode}'); // Debug print
    print('Response body: ${response.body}'); // Debug print

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = json.decode(response.body);
      if (data['articles'] != null) {
        final List<dynamic> articlesJson = data['articles'];
        print(
          'Number of articles fetched: ${articlesJson.length}',
        ); // Debug print
        return articlesJson
            .map((json) => Article.fromJson(json as Map<String, dynamic>))
            .toList();
      } else {
        print('No articles found in response.'); // Debug print
        throw Exception('No articles found');
      }
    } else {
      print(
        'Failed to load news: Status code ${response.statusCode}',
      ); // Debug print
      throw Exception('Failed to load news: ${response.statusCode}');
    }
  }
}
