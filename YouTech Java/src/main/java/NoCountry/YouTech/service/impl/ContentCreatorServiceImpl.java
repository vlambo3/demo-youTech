package NoCountry.YouTech.service.impl;

import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumContentCreatorResponseDTO;
import NoCountry.YouTech.dto.broadcastMedium.BroadcastMediumRequestDTO;
import NoCountry.YouTech.dto.contentCreator.*;
import NoCountry.YouTech.dto.jwt.JwtDTO;
import NoCountry.YouTech.mapper.CreatorMapperAux;
import NoCountry.YouTech.model.*;
import NoCountry.YouTech.exception.EmptyListException;
import NoCountry.YouTech.exception.NotFoundException;
import NoCountry.YouTech.mapper.GenericMapper;
import NoCountry.YouTech.projection.IPContentCreatorForEdition;
import NoCountry.YouTech.repository.*;
import NoCountry.YouTech.repository.specification.CreatorSpecification;
import NoCountry.YouTech.security.jwt.JwtUtils;
import NoCountry.YouTech.service.IContentCreator;
import NoCountry.YouTech.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContentCreatorServiceImpl implements IContentCreator {

    private final ContentCreatorRepository creatorRepository;
    private final UserRepository repository;
    private final BroadcastMediumRepository broadcastMediumRepository;
    private final BroadcastMediumTagRepository broadcastMediumTagRepository;

    private final GenericMapper mapper;
    private final MessageSource messageSource;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final CreatorSpecification creatorSPecification;
    private final CreatorMapperAux creatorMapperAux;

    @Transactional
    public String update(String email, ContentCreator2UpdateDTO dto) {
        User user = repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );

        if (dto.getPassword() != null && user.getPassword() != dto.getPassword()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getEmail() != null && user.getEmail() != dto.getEmail()) {
            user.setEmail(dto.getEmail());
        }


        if (user.getEmail() != null || user.getPassword() != null) {
            repository.save(user);
        }

        ContentCreator updatedContentCreator = user.getContentCreator();
        updatedContentCreator.update(dto);
        creatorRepository.save(updatedContentCreator);

        JwtDTO jwtDTO = new JwtDTO(updatedContentCreator.getIdContentCreator(), user.getEmail(), updatedContentCreator.getName(), updatedContentCreator.getLastName(), updatedContentCreator.getImageProfile(), user.getIsAdmin());
        final String jwt = jwtUtils.generateToken(jwtDTO);

        return jwt;
    }

    public ContentCreatorResponseDTO getById(Integer id) {
        Optional<ContentCreator> contentCreator = creatorRepository.findById(id);
        if (!contentCreator.isPresent()) {
            new NotFoundException(
                    messageSource.getMessage("content-creator-not-found", new Object[]{id}, Locale.US));
        }
        return mapper.map(contentCreator.get(), ContentCreatorResponseDTO.class);

    }

    public List<ContentCreatorResponseDTO> getAllContentCreators() {
        List<ContentCreator> creators = creatorRepository.findAll();
        if (creators.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }

        List<ContentCreatorResponseDTO> contentCreatorResponseDTOList = creators.stream().map(item -> {
            ContentCreatorResponseDTO contentCreatorResponseDTO = mapper.map(item, ContentCreatorResponseDTO.class);
            contentCreatorResponseDTO.setCountBroadcastMedium(item.getBroadcastMediumList().size());
            return contentCreatorResponseDTO;
        }).collect(Collectors.toList());

        return contentCreatorResponseDTOList;
    }

    @Transactional
    public String saveBroadcastMedium(String email, BroadcastMediumRequestDTO dto) {
        User user = repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );
        ContentCreator creator = user.getContentCreator();
        BroadcastMedium broadcastMedium = mapper.map(dto, BroadcastMedium.class);
        broadcastMedium.setStatus((int) Util.STATUS_ACTIVE);
        broadcastMedium.setIdBroadcastType(new BroadcastType(dto.getIdBroadcastType()));
        broadcastMedium.setIdContentCreator(creator);


        List<BroadcastMediumTag> listTags = dto.getBroadcastMediumTagList().stream().map((item) -> {
            BroadcastMediumTag broadcastMediumTag = new BroadcastMediumTag();
            broadcastMediumTag.setIdBroadcastMedium(broadcastMedium);
            broadcastMediumTag.setIdTag(new Tag(item));
            return broadcastMediumTag;
        }).collect(Collectors.toList());

        broadcastMedium.setBroadcastMediumTagList(listTags);
        broadcastMediumRepository.save(broadcastMedium);

        return messageSource.getMessage("info-positive", null, Locale.US);
    }

    @Transactional
    @Override
    public String updateBroadcastMedium(String email, Integer idBroadcastMedium, BroadcastMediumRequestDTO dto) {
        User user = repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );

        BroadcastMedium broadcastMedium = broadcastMediumRepository.findById(idBroadcastMedium).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("broadcast-medium-not-found",
                        new Object[]{idBroadcastMedium}, Locale.US))
        );

        broadcastMedium.setName(dto.getName());
        broadcastMedium.setDescription(dto.getDescription());
        broadcastMedium.setUrl(dto.getUrl());
        broadcastMedium.setIdBroadcastType(new BroadcastType(dto.getIdBroadcastType()));
        broadcastMedium.setNameImage(dto.getNameImage());
        broadcastMedium.setUrImage(dto.getUrImage());

        List listIdTag = dto.getBroadcastMediumTagList().stream().map((item) -> item.longValue()).collect(Collectors.toList());
        broadcastMediumTagRepository.deleteAllById(listIdTag);

        List<BroadcastMediumTag> listBroadcastMediumTag = dto.getBroadcastMediumTagList().stream().map((item) -> new BroadcastMediumTag(item.longValue())).collect(Collectors.toList());
        broadcastMedium.setBroadcastMediumTagList(listBroadcastMediumTag);
        broadcastMediumRepository.save(broadcastMedium);

        return messageSource.getMessage("info-success", null, Locale.US);
    }

    @Transactional
    @Override
    public String deleteBroadcastMedium(String email, Integer idBroadcastMedium) {
        repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );
        broadcastMediumRepository.deleteById(idBroadcastMedium);

        return messageSource.getMessage("info-success", null, Locale.US);

    }

    @Override
    public List<BroadcastMediumContentCreatorResponseDTO> getAllBroadcastMedium(Integer idContentCreator) {
        List<BroadcastMedium> broadcastMediumList = broadcastMediumRepository.getAllBroadcastMedium(idContentCreator);
        if (broadcastMediumList.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }

        return broadcastMediumList.stream().map((item) -> {

            List<BroadcastMediumContentCreatorResponseDTO.broadcastMediumTagList> broadcastMediumBroadcastMediumTagListList =
                    item.getBroadcastMediumTagList().stream().limit(5).map(
                                    (itemMediumTag) -> new BroadcastMediumContentCreatorResponseDTO.broadcastMediumTagList(itemMediumTag.getIdTag().getIdTag(), itemMediumTag.getIdTag().getDescription()))
                            .collect(Collectors.toList());

            BroadcastMediumContentCreatorResponseDTO broadcastMediumContentCreatorResponseDTO =
                    new BroadcastMediumContentCreatorResponseDTO(
                            item.getIdBroadcastMedium(), item.getUrImage(), item.getNameImage(),
                            item.getName(), item.getDescription(), item.getIdBroadcastType().getIdBroadcastType(),
                            item.getIdBroadcastType().getDescription(), item.getUrl(),
                            broadcastMediumBroadcastMediumTagListList);

            return broadcastMediumContentCreatorResponseDTO;
        }).collect(Collectors.toList());
    }


    @Override
    public ContentCreatorResponseForEditionDTO getForEdition(Integer idContentCreator) {
        IPContentCreatorForEdition ipContentCreatorForEdition = creatorRepository.findForEdition(idContentCreator);

        if (ipContentCreatorForEdition == null) {
            new NotFoundException(
                    messageSource.getMessage("content-creator-not-found", new Object[]{idContentCreator}, Locale.US));
        }
        return mapper.map(ipContentCreatorForEdition, ContentCreatorResponseForEditionDTO.class);
    }

    public List<ContentCreatorBasicDTO> getByFilters(String name, Integer idTag) {
        ContentCreatorFilters filtersDTO = new ContentCreatorFilters(name, idTag);
        if (creatorMapperAux.creatorList2DTOBasicList(creatorRepository.findAll(creatorSPecification.getByFilters(filtersDTO))).isEmpty()) {
            return creatorMapperAux.creatorList2DTOBasicList(creatorRepository.findAll());
        } else {
            return creatorMapperAux.creatorList2DTOBasicList(creatorRepository.findAll(creatorSPecification.getByFilters(filtersDTO)));
        }

    }

    @Override
    public List<ContentCreatorResponseDTO> findByTags(List<Integer> idTags) {
        List<ContentCreator> list = this.creatorRepository.findByTags(idTags);
        if (list.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }

        List<ContentCreatorResponseDTO> contentCreatorBasicDTOS = list.stream().map(item -> {
            ContentCreatorResponseDTO contentCreatorResponseDTO = mapper.map(item, ContentCreatorResponseDTO.class);
            List mediumList = broadcastMediumRepository.getAllBroadcastMedium(contentCreatorResponseDTO.getIdContentCreator());
            contentCreatorResponseDTO.setCountBroadcastMedium(mediumList.size());

            return contentCreatorResponseDTO;
        }).collect(Collectors.toList());

        return contentCreatorBasicDTOS;
    }

    @Override
    public List<ContentCreatorResponseDTO> findByTagsAndName(List<Integer> idTags, String name) {
        List<ContentCreator> list = this.creatorRepository.findByTagsName(idTags, name);
        if (list.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }

        List<ContentCreatorResponseDTO> contentCreatorBasicDTOS = list.stream().map(item -> {
            ContentCreatorResponseDTO contentCreatorResponseDTO = mapper.map(item, ContentCreatorResponseDTO.class);
            List mediumList = broadcastMediumRepository.getAllBroadcastMedium(contentCreatorResponseDTO.getIdContentCreator());
            contentCreatorResponseDTO.setCountBroadcastMedium(mediumList.size());

            return contentCreatorResponseDTO;
        }).collect(Collectors.toList());

        return contentCreatorBasicDTOS;
    }

}
