package NoCountry.YouTech.security.auth;

import NoCountry.YouTech.dto.jwt.JwtDTO;
import NoCountry.YouTech.model.User;
import NoCountry.YouTech.repository.UserRepository;
import NoCountry.YouTech.util.Util;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.MessageSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomDetailsService implements UserDetailsService {
    private final UserRepository repository;
    private final MessageSource messageSource;

    @Override
    public UserDetails loadUserByUsername(String dataJson) throws UsernameNotFoundException {
        JwtDTO jwtDTO = Util.convertJsonToPOJO(dataJson, JwtDTO.class);
        String email = "";
        if (jwtDTO == null) {
            email = dataJson;
        } else {
            email = jwtDTO.getEmail();
        }

        Optional<User> user = repository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(messageSource.getMessage("username-not-found", null, Locale.US));
        }
        return new org.springframework.security.core.userdetails.User(user.get().getEmail(), user.get().getPassword(), new ArrayList<>());
    }
}
