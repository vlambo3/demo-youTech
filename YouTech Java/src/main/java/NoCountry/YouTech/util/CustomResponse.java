package NoCountry.YouTech.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class CustomResponse {
    private boolean success;
    private String error;
    private Object data;

    public CustomResponse(boolean status, Object data) {
        this.success = status;
        this.data = data;
    }
    public CustomResponse(boolean status) {
        this.success = status;
    }
    public CustomResponse(boolean success, String error) {
        this.success = success;
        this.error = error;
    }
}

