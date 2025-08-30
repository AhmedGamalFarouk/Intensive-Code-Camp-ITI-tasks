import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:social_media_app/components/buttons.dart';
import 'package:social_media_app/constants.dart';
import 'package:social_media_app/utils/time_formatter.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _postController = TextEditingController();
  String _userName = "";
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  void initState() {
    super.initState();
    _loadUserName();
  }

  void _loadUserName() {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null) {
      setState(() {
        _userName = user.displayName ?? "User";
      });
    }
  }

  @override
  void dispose() {
    _postController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.padding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Hello, $_userName!', style: AppTextStyles.heading),
              const SizedBox(height: AppSpacing.padding),
              TextField(
                controller: _postController,
                decoration: appInputDecoration(hint: 'What\'s on your mind?'),
                maxLines: 5,
              ),
              const SizedBox(height: AppSpacing.padding),
              Align(
                alignment: Alignment.centerRight,
                child: PrimaryButton(text: 'Post', onPressed: _createPost),
              ),
              const SizedBox(height: AppSpacing.padding),
              Expanded(
                child: StreamBuilder<QuerySnapshot>(
                  stream: _firestore
                      .collection('posts')
                      .orderBy('timestamp', descending: true)
                      .snapshots(),
                  builder: (context, snapshot) {
                    if (snapshot.hasError) {
                      return Center(child: Text('Error: ${snapshot.error}'));
                    }

                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    }

                    if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                      return const Center(child: Text('No posts yet.'));
                    }

                    final posts = snapshot.data!.docs;

                    return ListView.builder(
                      itemCount: posts.length,
                      itemBuilder: (context, index) {
                        final post = posts[index];
                        final postId = post.id;
                        final postData = post.data() as Map<String, dynamic>;
                        final String postText = postData['text'] ?? 'No text';
                        final String userName =
                            postData['userName'] ?? 'Anonymous';
                        final List<dynamic> likes = postData['likes'] ?? [];
                        final List<dynamic> comments =
                            postData['comments'] ?? [];
                        final Timestamp? timestamp =
                            postData['timestamp'] as Timestamp?;
                        final String timeAgo = timestamp != null
                            ? formatTimeAgo(timestamp.toDate())
                            : 'Unknown time';

                        final bool isLiked = likes.contains(
                          FirebaseAuth.instance.currentUser?.uid,
                        );

                        return Card(
                          margin: const EdgeInsets.only(
                            bottom: AppSpacing.padding,
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(AppSpacing.padding),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      userName,
                                      style: AppTextStyles.subheading,
                                    ),
                                    if (FirebaseAuth
                                            .instance
                                            .currentUser
                                            ?.uid ==
                                        postData['userId'])
                                      PopupMenuButton<String>(
                                        onSelected: (value) {
                                          if (value == 'edit') {
                                            _editPost(postId, postText);
                                          } else if (value == 'delete') {
                                            _deletePost(postId);
                                          }
                                        },
                                        itemBuilder: (BuildContext context) =>
                                            <PopupMenuEntry<String>>[
                                              const PopupMenuItem<String>(
                                                value: 'edit',
                                                child: Text('Edit'),
                                              ),
                                              const PopupMenuItem<String>(
                                                value: 'delete',
                                                child: Text('Delete'),
                                              ),
                                            ],
                                      ),
                                  ],
                                ),
                                Text(
                                  timeAgo,
                                  style: AppTextStyles.body.copyWith(
                                    color: AppColors.grey,
                                  ),
                                ),
                                const SizedBox(height: AppSpacing.small),
                                Text(postText, style: AppTextStyles.body),
                                const SizedBox(height: AppSpacing.small),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Row(
                                      children: [
                                        IconButton(
                                          icon: Icon(
                                            isLiked
                                                ? Icons.favorite
                                                : Icons.favorite_border,
                                            color: isLiked
                                                ? AppColors.red
                                                : AppColors.grey,
                                          ),
                                          onPressed: () =>
                                              _toggleLike(postId, likes),
                                        ),
                                        Text('${likes.length} Likes'),
                                      ],
                                    ),
                                    Row(
                                      children: [
                                        IconButton(
                                          icon: const Icon(Icons.comment),
                                          onPressed: () =>
                                              _showComments(postId, comments),
                                        ),
                                        Text('${comments.length} Comments'),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _createPost() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user != null && _postController.text.isNotEmpty) {
      await _firestore.collection('posts').add({
        'text': _postController.text,
        'timestamp': FieldValue.serverTimestamp(),
        'userId': user.uid,
        'userName': user.displayName ?? user.email,
        'likes': [],
        'comments': [],
      });
      _postController.clear();
    }
  }

  void _toggleLike(String postId, List<dynamic> currentLikes) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) return;

    final postRef = _firestore.collection('posts').doc(postId);
    if (currentLikes.contains(user.uid)) {
      // Unlike
      await postRef.update({
        'likes': FieldValue.arrayRemove([user.uid]),
      });
    } else {
      // Like
      await postRef.update({
        'likes': FieldValue.arrayUnion([user.uid]),
      });
    }
  }

  void _showComments(String postId, List<dynamic> currentComments) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            bottom: MediaQuery.of(context).viewInsets.bottom,
          ),
          child: CommentSheet(postId: postId, currentComments: currentComments),
        );
      },
    );
  }

  void _deletePost(String postId) async {
    await _firestore.collection('posts').doc(postId).delete();
  }

  void _editPost(String postId, String currentText) {
    final TextEditingController editController = TextEditingController(
      text: currentText,
    );
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Edit Post'),
          content: TextField(
            controller: editController,
            decoration: appInputDecoration(hint: 'Edit your post'),
            maxLines: 5,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            PrimaryButton(
              text: 'Update',
              onPressed: () async {
                if (editController.text.isNotEmpty) {
                  await _firestore.collection('posts').doc(postId).update({
                    'text': editController.text,
                    'timestamp': FieldValue.serverTimestamp(),
                  });
                  Navigator.pop(context);
                }
              },
            ),
          ],
        );
      },
    );
  }
}

class CommentSheet extends StatefulWidget {
  final String postId;
  final List<dynamic> currentComments;

  const CommentSheet({
    super.key,
    required this.postId,
    required this.currentComments,
  });

  @override
  State<CommentSheet> createState() => _CommentSheetState();
}

class _CommentSheetState extends State<CommentSheet> {
  final TextEditingController _commentController = TextEditingController();
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  void _addComment() async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('You must be logged in to comment.')),
      );
      return;
    }

    if (_commentController.text.isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Comment cannot be empty.')));
      return;
    }

    final newComment = {
      'text': _commentController.text,
      'timestamp': DateTime.now(), // Use client-side timestamp
      'userId': user.uid,
      'userName': user.displayName ?? user.email,
    };

    try {
      await _firestore.collection('posts').doc(widget.postId).update({
        'comments': FieldValue.arrayUnion([newComment]),
      });
      _commentController.clear();
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Comment added!')));
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Failed to add comment: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.padding),
      height: MediaQuery.of(context).size.height * 0.75,
      child: Column(
        children: [
          Text('Comments', style: AppTextStyles.heading),
          const SizedBox(height: AppSpacing.padding),
          Expanded(
            child: StreamBuilder<DocumentSnapshot>(
              stream: _firestore
                  .collection('posts')
                  .doc(widget.postId)
                  .snapshots(),
              builder: (context, snapshot) {
                if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                }

                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                final postData = snapshot.data?.data() as Map<String, dynamic>?;
                final List<dynamic> comments = postData?['comments'] ?? [];

                if (comments.isEmpty) {
                  return const Center(child: Text('No comments yet.'));
                }

                return ListView.builder(
                  itemCount: comments.length,
                  itemBuilder: (context, index) {
                    final comment = comments[index] as Map<String, dynamic>;
                    final String commentText = comment['text'] ?? 'No text';
                    final String userName = comment['userName'] ?? 'Anonymous';
                    final Timestamp? timestamp =
                        comment['timestamp'] as Timestamp?;
                    final String timeAgo = timestamp != null
                        ? formatTimeAgo(timestamp.toDate())
                        : 'Unknown time';

                    return Card(
                      margin: const EdgeInsets.only(bottom: AppSpacing.small),
                      elevation: 2,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(AppSpacing.radius),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(AppSpacing.padding),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  userName,
                                  style: AppTextStyles.subheading.copyWith(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(width: AppSpacing.small),
                                Text(
                                  timeAgo,
                                  style: AppTextStyles.body.copyWith(
                                    fontSize: 12,
                                    color: AppColors.grey,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: AppSpacing.small),
                            Text(
                              commentText,
                              style: AppTextStyles.body.copyWith(fontSize: 14),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          const SizedBox(height: AppSpacing.padding),
          TextField(
            controller: _commentController,
            decoration: appInputDecoration(hint: 'Add a comment...'),
          ),
          const SizedBox(height: AppSpacing.small),
          Align(
            alignment: Alignment.centerRight,
            child: PrimaryButton(text: 'Add Comment', onPressed: _addComment),
          ),
        ],
      ),
    );
  }
}
