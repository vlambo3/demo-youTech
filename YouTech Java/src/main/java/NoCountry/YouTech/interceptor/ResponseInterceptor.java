package NoCountry.YouTech.interceptor;


import NoCountry.YouTech.exception.*;
import NoCountry.YouTech.util.CustomResponse;
import NoCountry.YouTech.util.Util;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@RestControllerAdvice
public class ResponseInterceptor implements ResponseBodyAdvice {
    @ExceptionHandler(value = {AlreadyExistsException.class, BadRequestException.class, EmptyListException.class, NotFoundException.class, UnableToUpdateEntityException.class, UsernameNotFoundException.class})
    @ResponseStatus()
    public CustomResponse processCustomException(Exception e) {
        return new CustomResponse(false, e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus()
    public CustomResponse processException(Exception e) {
        e.printStackTrace();
        return new CustomResponse(false, e.getMessage());
    }


    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return returnType.getParameterType() != CustomResponse.class;
    }

    @SneakyThrows
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType, Class selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {

        if (body == null) {
            return new CustomResponse(true);
        }

        return new CustomResponse(true, body);

    }

}
