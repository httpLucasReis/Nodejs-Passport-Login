class UserValidator {
  private static MIN_USERNAME_LENGTH = 3;

  private static MAX_USERNAME_LENGTH = 50;

  private static MIN_PASSWORD_LENGTH = 8;

  private static MAX_PASSWORD_LENGTH = 50;

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
    const isAValidUsernameFormat = usernameRegexp.test(username);
    const isAValidUsernameLength = (
      username.length > UserValidator.MIN_USERNAME_LENGTH
      && username.length < UserValidator.MAX_USERNAME_LENGTH
    );

    const isAValidUsername = isAValidUsernameFormat && isAValidUsernameLength;
    return isAValidUsername;
  }

  public static validateEmail(email: string) {
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isAValidEmail = emailRegexp.test(email);

    return isAValidEmail;
  }

  public static validatePasswords(password1: string, password2: string) {
    const areThePasswordsEqual = password1 === password2;
    const isAValidPasswordLength = (password1.length > UserValidator.MIN_PASSWORD_LENGTH
      || password2.length > UserValidator.MIN_PASSWORD_LENGTH)
    && (password1.length < UserValidator.MAX_PASSWORD_LENGTH
      || password2.length < UserValidator.MAX_PASSWORD_LENGTH);

    const isAValidPassword = isAValidPasswordLength || areThePasswordsEqual;
    return isAValidPassword;
  }
}

export default UserValidator;
