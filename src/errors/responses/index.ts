import { ErrorMessages } from "../enums";

export const handleInvalidInputResponse = (res) => res.status(400).json({ message: ErrorMessages.INVALID_INPUT });

export const handleUnauthorizedResponse = (res) => res.status(401).json({ message: ErrorMessages.UNAUTHORIZED });

export const handleInvalidTokenResponse = (res) => res.status(401).json({ message: "Invalid token" });

export const handleForbiddenResponse = (res) => res.status(403).json({ message: ErrorMessages.FORBIDDEN });

export const handleWrongCredentialsResponse = (res) => res.status(404).json({ message: ErrorMessages.WRONG_CREDENTIALS });

export const handleDuplicateCategoryResponse = (res) => res.status(409).json({ message: ErrorMessages.DUPLICATE_CATEGORY });

export const handleServerErrorResponse = (res) => res.status(500).json({ message: ErrorMessages.SERVER_ERROR });
