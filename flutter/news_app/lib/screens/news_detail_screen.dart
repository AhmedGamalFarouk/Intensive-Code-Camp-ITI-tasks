import 'package:flutter/material.dart';
import 'package:news_app/data/modals/news_model.dart';
import 'package:news_app/styles/app_theme.dart';

class NewsDetailScreen extends StatelessWidget {
  final Article article;
  const NewsDetailScreen({super.key, required this.article});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300.0,
            floating: false,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              title: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black.withOpacity(0.8)],
                  ),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  article.title,
                  style: const TextStyle(
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              background:
                  article.urlToImage != null
                      ? Image.network(
                        article.urlToImage!,
                        fit: BoxFit.cover,
                        errorBuilder:
                            (context, error, stackTrace) => Container(
                              color: AppTheme.surfaceColor,
                              child: const Icon(Icons.broken_image, size: 64),
                            ),
                      )
                      : Container(
                        color: AppTheme.surfaceColor,
                        child: const Icon(Icons.newspaper, size: 64),
                      ),
            ),
          ),
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      if (article.author != null && article.author!.isNotEmpty)
                        Expanded(
                          child: Text(
                            'By ${article.author}',
                            style: Theme.of(context).textTheme.bodyMedium
                                ?.copyWith(color: AppTheme.accentColor),
                          ),
                        ),
                      if (article.publishedAt != null)
                        Text(
                          article.publishedAt!.split('T').first,
                          style: Theme.of(context).textTheme.bodyMedium
                              ?.copyWith(color: AppTheme.subtleText),
                        ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  if (article.description != null &&
                      article.description!.isNotEmpty)
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceColor,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        article.description!,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                  if (article.content != null &&
                      article.content!.isNotEmpty) ...[
                    const SizedBox(height: 24),
                    Text(
                      article.content!
                          .replaceAll(RegExp(r'\[\+\d+ chars\]$'), '')
                          .trim(),
                      style: Theme.of(
                        context,
                      ).textTheme.bodyMedium?.copyWith(height: 1.6),
                    ),
                  ],
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
