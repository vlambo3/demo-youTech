package NoCountry.YouTech.security.jwt;

import NoCountry.YouTech.util.CustomResponse;
import NoCountry.YouTech.util.Util;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Object attribute = request.getAttribute("exception");

        String exception = "";
        if (attribute instanceof JwtError) {
            exception = attribute.toString();
        } else {
            exception = (String) attribute;
        }
        if (exception == null) {
            setResponse(response, JwtError.UNKNOWN_ERROR);
        } else if (exception.equals(JwtError.WRONG_TYPE_TOKEN)) {
            setResponse(response, JwtError.WRONG_TYPE_TOKEN);
        } else if (exception.equals(JwtError.EXPIRED_TOKEN)) {
            setResponse(response, JwtError.EXPIRED_TOKEN);
        } else if (exception.equals(JwtError.UNSUPPORTED_TOKEN)) {
            setResponse(response, JwtError.UNSUPPORTED_TOKEN);
        } else {
            setResponse(response, JwtError.ACCESS_DENIED);
        }
    }

    private void setResponse(HttpServletResponse response, JwtError code) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        CustomResponse customResponse = new CustomResponse(false, code.toString());
        response.getWriter().print(Util.OBJECT_STATIC.writeValueAsString(customResponse));
    }
}
