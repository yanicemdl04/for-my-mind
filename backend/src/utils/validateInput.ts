/**
 * Valide une adresse email
 * @param email - Adresse email à valider
 * @returns true si l'email est valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  // Expression régulière simple pour vérifier si l'email contient @ et un point
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Valide un mot de passe (min 6 caractères)
 * @param password - Mot de passe à valider
 * @returns true si le mot de passe est valide, false sinon
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Valide les données d'inscription
 * @param userData - Données d'inscription
 * @returns Un objet contenant les erreurs ou null si tout est valide
 */
export const validateRegistration = (userData: {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}): { [key: string]: string } | null => {
  const errors: { [key: string]: string } = {};

  if (!userData.email || !isValidEmail(userData.email)) {
    errors.email = 'Email invalide';
  }

  if (!userData.password || !isValidPassword(userData.password)) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }

  if (!userData.nom) {
    errors.nom = 'Le nom est requis';
  }

  if (!userData.prenom) {
    errors.prenom = 'Le prénom est requis';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};