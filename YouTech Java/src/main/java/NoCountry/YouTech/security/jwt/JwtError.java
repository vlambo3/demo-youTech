package NoCountry.YouTech.security.jwt;

public enum JwtError {
    UNKNOWN_ERROR("UNKNOWN_ERROR"),
    EXPIRED_TOKEN("EXPIRED_TOKEN"),
    WRONG_TYPE_TOKEN("WRONG_TYPE_TOKEN"),
    UNSUPPORTED_TOKEN("UNSUPPORTED_TOKEN"),
    ACCESS_DENIED("ACCESS_DENIED");

    public final String code;

    private JwtError(String code) {
        this.code = code;
    }
}
