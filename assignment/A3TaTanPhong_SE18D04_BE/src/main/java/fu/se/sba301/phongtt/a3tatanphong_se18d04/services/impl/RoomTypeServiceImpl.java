package fu.se.sba301.phongtt.a3tatanphong_se18d04.services.impl;


import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomTypeRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomTypeResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomType;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.AppException;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.ErrorCode;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper.RoomTypeMapper;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomTypeRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.RoomTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomTypeServiceImpl implements RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;

    @Override
    public List<RoomTypeResponse> getAll() {
        return roomTypeRepository.findAll()
                .stream()
                .map(RoomTypeMapper::toResponse)
                .toList();
    }

    @Override
    public RoomTypeResponse getById(Long id) {
        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOMTYPE_NOT_FOUND));

        return RoomTypeMapper.toResponse(roomType);
    }

    @Override
    public RoomTypeResponse create(RoomTypeRequest request) {

        RoomType roomType = RoomTypeMapper.toEntity(request);

        roomTypeRepository.save(roomType);

        return RoomTypeMapper.toResponse(roomType);
    }

    @Override
    public RoomTypeResponse update(Long id, RoomTypeRequest request) {

        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOMTYPE_NOT_FOUND));

        RoomTypeMapper.updateEntity(roomType, request);

        roomTypeRepository.save(roomType);

        return RoomTypeMapper.toResponse(roomType);
    }

    @Override
    public void delete(Long id) {

        RoomType roomType = roomTypeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOMTYPE_NOT_FOUND));

        // Không cho xóa nếu đã có Room sử dụng
        if (!roomType.getRooms().isEmpty()) {
            throw new AppException(ErrorCode.ROOMTYPE_IN_USE);
        }

        roomTypeRepository.delete(roomType);
    }
}