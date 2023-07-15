package NoCountry.YouTech.security.auth;

import NoCountry.YouTech.projection.IPContentCreator;
import NoCountry.YouTech.dto.auth.AuthenticationRequestDTO;
import NoCountry.YouTech.dto.auth.AuthenticationResponseDTO;
import NoCountry.YouTech.dto.auth.RegisterResponseDTO;
import NoCountry.YouTech.dto.jwt.JwtDTO;
import NoCountry.YouTech.dto.user.UserRequestDTO;
import NoCountry.YouTech.model.ContentCreator;
import NoCountry.YouTech.model.User;
import NoCountry.YouTech.exception.AlreadyExistsException;
import NoCountry.YouTech.exception.BadRequestException;
import NoCountry.YouTech.mapper.GenericMapper;
import NoCountry.YouTech.repository.ContentCreatorRepository;
import NoCountry.YouTech.repository.UserRepository;

import NoCountry.YouTech.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    private final ContentCreatorRepository creatorRepository;

    private final GenericMapper mapper;

    private final MessageSource messageSource;

    private final PasswordEncoder passwordEncoder;

    private final CustomAuthenticatorManager authenticatorManager;

    private final JwtUtils jwtUtils;

    private final CustomDetailsService userDetailsService;

    @Transactional
    public RegisterResponseDTO save(UserRequestDTO dto) {
        Optional<User> userCheck = repository.findByEmail(dto.getEmail());
        if (userCheck.isPresent())
            throw new AlreadyExistsException(messageSource.getMessage("email-already-exists", null, Locale.US));

        User newUser = mapper.map(dto, User.class);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser = repository.save(newUser);

        ContentCreator newContentCreator = mapper.map(dto, ContentCreator.class);
        newContentCreator.setIdUser(newUser);
        creatorRepository.save(newContentCreator);

        RegisterResponseDTO registerResponseDto = mapper.map(newUser, RegisterResponseDTO.class);
        AuthenticationRequestDTO authenticationRequest = new AuthenticationRequestDTO(dto.getEmail(), dto.getPassword());
        AuthenticationResponseDTO token = authenticate(authenticationRequest);
        registerResponseDto.setToken(token.getJwt());
        return registerResponseDto;
    }

    public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO dto) {
        final Authentication authentication = authenticatorManager
                .authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)
                && authentication.isAuthenticated()) {

            SecurityContextHolder.getContext().setAuthentication(authentication);


            userDetailsService.loadUserByUsername(dto.getEmail());
            IPContentCreator ipContentCreator = creatorRepository.findByEmail(dto.getEmail());
            JwtDTO jwtDTO = new JwtDTO(ipContentCreator.getIdContentCreator(), ipContentCreator.getEmail(), ipContentCreator.getName(), ipContentCreator.getLastName(), ipContentCreator.getImageProfile(), ipContentCreator.getIsAdmin());
            final String jwt = jwtUtils.generateToken(jwtDTO);

            return new AuthenticationResponseDTO(jwt);
        } else {
            throw new BadRequestException(messageSource.getMessage("user-not-found", null, Locale.US));
        }
    }

}
