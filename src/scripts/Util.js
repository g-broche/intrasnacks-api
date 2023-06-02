class Util {
    static regex = {
        "noun": "/^[\wÀ-ÖØ-öø-ÿ]+( [\wÀ-ÖØ-öø-ÿ]+)*$/u",
        "email": "/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/",
        "password": "/^.{8,100}$/",
        "phone": "/^\d{10}$/",
        "monetaryBase": "/^(-?(\d*(.\d{2})?)|(.\d{2})?)$/"
    }

    static isStringPassword(string) {
        return regex.password.test(string);
    }
}