class UserValidator {
  public static validateUsername(username: string) {
    // The username
    /* must have
     *   letters
     *   numbers
     *   at least 3 characters
     */

    /* can have
     *   underscores
     */

    /* cannot have
     *   two underscores in a row
     *   a underscore at the start or the end
     */

    const usernameRegexp = /^[A-Za-z0-9]+(?:[_][A-Za-z0-9]+)*$/;
    const invalidUsername = !usernameRegexp.test(username) || username.length < 3;

    if (invalidUsername) {
      return false;
    }
    return true;
  }

  public static validatePasswords(password1: string, password2: string) {
    const invalidPasswordLength = password1.length < 8 || password2.length < 8;
    const differentPasswords = password1 !== password2;

    if (invalidPasswordLength || differentPasswords) {
      return false;
    }

    return true;
  }
}

export default UserValidator;
