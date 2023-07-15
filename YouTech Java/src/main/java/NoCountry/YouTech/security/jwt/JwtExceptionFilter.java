package NoCountry.YouTech.security.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            request.setAttribute("exception", JwtError.EXPIRED_TOKEN);
            throw e;
        } catch (MalformedJwtException e) {
            request.setAttribute("exception", JwtError.WRONG_TYPE_TOKEN);
            throw e;
        } catch (SignatureException e) {
            request.setAttribute("exception", JwtError.WRONG_TYPE_TOKEN);
            throw e;
        }
    }
}
