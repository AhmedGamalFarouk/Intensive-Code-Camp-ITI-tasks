import 'package:flutter/material.dart';
import 'package:social_media_app/constants.dart';

class PrimaryButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isDisabled;

  const PrimaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isDisabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: AppSpacing.buttonHeight,
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isDisabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: isDisabled
              ? AppColors.disabledInput
              : AppColors.primaryBlue,
          shape: RoundedRectangleBorder(borderRadius: AppRadii.buttonRadius),
          elevation: 0,
        ),
        child: Text(text, style: AppTextStyles.button),
      ),
    );
  }
}

class SecondaryButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isDisabled;

  const SecondaryButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isDisabled = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: AppSpacing.buttonHeight,
      width: double.infinity,
      child: ElevatedButton(
        onPressed: isDisabled ? null : onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: isDisabled
              ? AppColors.disabledInput
              : AppColors.pinkAccent,
          shape: RoundedRectangleBorder(borderRadius: AppRadii.buttonRadius),
          elevation: 0,
        ),
        child: Text(text, style: AppTextStyles.button),
      ),
    );
  }
}
