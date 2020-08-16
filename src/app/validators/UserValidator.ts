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

    return invalidUsername;
  }

  public static validateEmail(email: string) {
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const invalidEmail = !emailRegexp.test(email);

    return invalidEmail;
  }

  public static validatePasswords(password1: string, password2: string) {
    const invalidPasswordLength = password1.length < 8 || password2.length < 8;
    const differentPasswords = password1 !== password2;

    return invalidPasswordLength || differentPasswords;
  }
}

export default UserValidator;
