// Removed import for NewsArticle

class NewsModel {
  final String? status;
  final int? totalResults;
  final List<Article> articles;

  NewsModel({this.status, this.totalResults, required this.articles});

  // Update factory constructor if needed, or remove if not used for direct API parsing
  factory NewsModel.fromJson(Map<String, dynamic> json) {
    return NewsModel(
      status: json['status'] as String?,
      totalResults: json['totalResults'] as int?,
      articles:
          (json['articles'] as List)
              .map(
                (articleJson) =>
                    Article.fromJson(articleJson as Map<String, dynamic>),
              )
              .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "status": status,
      "totalResults": totalResults,
      "articles": articles.map((article) => article.toJson()).toList(),
    };
  }
}

class Article {
  final String? author;
  final String title;
  final String? description;
  final String? url;
  final String? urlToImage;
  final String? publishedAt;
  final String? content;

  Article({
    this.author,
    required this.title,
    this.description,
    this.url,
    this.urlToImage,
    this.publishedAt,
    this.content,
  });

  // Removed Article.fromNewsArticle factory

  // Keep fromJson if you still need to parse Article from a different JSON structure elsewhere
  factory Article.fromJson(Map<String, dynamic> json) {
    return Article(
      author: json['author'] as String?,
      title:
          json['title']
              as String, // Ensure title is non-nullable as per your original model
      description: json['description'] as String?,
      url: json['url'] as String?,
      urlToImage: json['urlToImage'] as String?,
      publishedAt: json['publishedAt'] as String?,
      content: json['content'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "author": author,
      "title": title,
      "description": description,
      "url": url,
      "urlToImage": urlToImage,
      "publishedAt": publishedAt,
      "content": content,
    };
  }
}
