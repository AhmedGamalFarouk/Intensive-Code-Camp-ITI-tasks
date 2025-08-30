import 'package:flutter/material.dart';

/// App Colors
class AppColors {
  static const Color primaryBlue = Color(0xFF005BFF);
  static const Color pinkAccent = Color(0xFFFF5E9A);
  static const Color lightGray = Color(0xFFF5F5F5);
  static const Color textGray = Color(0xFF9E9E9E);
  static const Color black = Color(0xFF000000);
  static const Color white = Color(0xFFFFFFFF);
  static const Color cancelText = Color(0xFF6B6B6B);
  static const Color disabledInput = Color(0xFFEAEAEA);
  static const Color red = Color(0xFFEF5350);
  static const Color grey = Color(0xFF9E9E9E);
}

/// Font Styles
class AppTextStyles {
  static const TextStyle heading = TextStyle(
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: AppColors.black,
  );

  static const TextStyle subheading = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    color: AppColors.black,
  );

  static const TextStyle subtitle = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.normal,
    color: AppColors.textGray,
  );

  static const TextStyle button = TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w500,
    color: AppColors.white,
  );

  static const TextStyle cancel = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: AppColors.cancelText,
  );

  static const TextStyle input = TextStyle(
    fontSize: 16,
    color: AppColors.black,
  );

  static const TextStyle body = TextStyle(fontSize: 16, color: AppColors.black);
}

/// Border Radius
class AppRadii {
  static const BorderRadius inputRadius = BorderRadius.all(Radius.circular(30));
  static const BorderRadius buttonRadius = BorderRadius.all(
    Radius.circular(12),
  );
  static const BorderRadius avatarRadius = BorderRadius.all(
    Radius.circular(40),
  );
}

/// Spacing
class AppSpacing {
  static const double padding = 16.0;
  static const double inputHeight = 55.0;
  static const double buttonHeight = 50.0;
  static const double small = 8.0;
  static const double extraSmall = 4.0;
  static const double radius = 12.0;
}

/// Input Decoration
InputDecoration appInputDecoration({required String hint}) {
  return InputDecoration(
    hintText: hint,
    hintStyle: AppTextStyles.input.copyWith(color: AppColors.textGray),
    filled: true,
    fillColor: AppColors.disabledInput,
    border: OutlineInputBorder(
      borderRadius: AppRadii.inputRadius,
      borderSide: BorderSide.none,
    ),
    contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 14),
  );
}
