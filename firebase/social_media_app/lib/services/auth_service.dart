import 'package:firebase_auth/firebase_auth.dart';

class AuthService {
  Future<bool> signUp(String email, String password, String userName) async {
    try {
      UserCredential user = await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: email, password: password);

      await user.user!.updateDisplayName(userName);
      return true;
    } catch (e) {
      print("Error signing in: $e");
      return false;
    }
  }

  Future<bool> signIn(String email, String password) async {
    try {
      await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return true;
    } catch (e) {
      print("Error signing in: $e");
      return false;
    }
  }

  Future<void> signOut() async {
    try {
      await FirebaseAuth.instance.signOut();
    } catch (e) {
      print("Error signing out: $e");
    }
  }
}
