package NoCountry.YouTech.service.impl;

import NoCountry.YouTech.dto.broadCastType.BroadCastTypeDTO;
import NoCountry.YouTech.dto.broadCastType.BroadcastTypeResponseMaintenanceDTO;
import NoCountry.YouTech.dto.tag.TagResponseDTO;
import NoCountry.YouTech.exception.EmptyListException;
import NoCountry.YouTech.exception.NotFoundException;
import NoCountry.YouTech.exception.UnableToUpdateEntityException;
import NoCountry.YouTech.mapper.GenericMapper;
import NoCountry.YouTech.model.BroadcastType;
import NoCountry.YouTech.model.Tag;
import NoCountry.YouTech.model.User;
import NoCountry.YouTech.repository.BroadcastTypeRepository;
import NoCountry.YouTech.repository.UserRepository;
import NoCountry.YouTech.service.IBroadCastType;
import NoCountry.YouTech.util.Util;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BroadCastTypeImpl implements IBroadCastType {
    private final BroadcastTypeRepository broadcastTypeRepository;
    private final MessageSource messageSource;
    private final GenericMapper mapper;
    private final UserRepository repository;

    @Override
    public List<BroadCastTypeDTO> getBroadCastTypeActive(short status) {
        List<BroadcastType> broadcastTypes = this.broadcastTypeRepository.findByStatus(status);

        if (broadcastTypes.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }
        return broadcastTypes.stream().map(item -> new BroadCastTypeDTO(item.getIdBroadcastType(), item.getDescription())).collect(Collectors.toList());
    }

    @Override
    public List<BroadcastTypeResponseMaintenanceDTO> getAll() {
        List<BroadcastType> broadcastTypes = this.broadcastTypeRepository.findAll();
        if (broadcastTypes.isEmpty()) {
            throw new EmptyListException(messageSource.getMessage("empty-list", null, Locale.US));
        }
        return mapper.mapAll(broadcastTypes, BroadcastTypeResponseMaintenanceDTO.class);
    }

    @Transactional
    @Override
    public String update(String email, BroadcastTypeResponseMaintenanceDTO dto, Long id) {

        repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );

        BroadcastType updatedBCT = getBCTById(id);
        updatedBCT.setStatus((short) dto.getStatus());
        updatedBCT.setDescription(dto.getDescription());

        broadcastTypeRepository.save(updatedBCT);

        return messageSource.getMessage("info-success", null, Locale.US);
    }

    @Transactional
    @Override
    public String save(String email, BroadcastTypeResponseMaintenanceDTO dto) {
        repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );

        BroadcastType broadcastType = new BroadcastType();
        broadcastType.setDescription(dto.getDescription());
        broadcastType.setStatus((short) dto.getStatus());
        broadcastTypeRepository.save(broadcastType);

        return messageSource.getMessage("info-success", null, Locale.US);
    }


    private BroadcastType getBCTById(Long id) {
        return broadcastTypeRepository.findById(id.intValue()).orElseThrow(
                () -> new NotFoundException(
                        messageSource.getMessage("tag-not-found", new Object[]{id}, Locale.US))
        );
    }

    public boolean delete(String email, Long id) {
        repository.findByEmail(email).orElseThrow(() ->
                new EntityNotFoundException(messageSource.getMessage("user-not-found",
                        null, Locale.US))
        );

        BroadcastType bctToDelete = getBCTById(id);
        bctToDelete.setStatus(Util.STATUS_INACTIVE);
        broadcastTypeRepository.save(bctToDelete);

        return true;

    }
}
