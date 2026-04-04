import { body, param } from "express-validator";
import { validationResult } from "express-validator";

/* ================= AUTH ================= */

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("displayName").trim().notEmpty().withMessage("Display name is required"),

  body("avatarUrl")
    .optional()
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("themeColor")
    .optional()
    .notEmpty()
    .withMessage("Theme color cannot be empty"),
];

export const validateLogin = [
  body("username").trim().notEmpty().withMessage("Email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];

/* ================= USER ================= */

export const validateUpdateProfile = [
  body("displayName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Display name cannot be empty"),

  body("avatarUrl")
    .optional()
    .isURL()
    .withMessage("Avatar must be a valid URL"),

  body("themeColor")
    .optional()
    .notEmpty()
    .withMessage("Theme color cannot be empty"),
];

export const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

/* ================= ERROR HANDLER ================= */

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}
