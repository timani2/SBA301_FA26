package fu.se.sba301.phongtt.a3tatanphong_se18d04.services.impl;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomResponse;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomInformation;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.entity.RoomType;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.enums.RoomStatus;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.AppException;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.exception.ErrorCode;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.mapper.RoomMapper;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.reposirories.RoomTypeRepository;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomTypeRepository roomTypeRepository;

    @Override
    public List<RoomResponse> getAll() {
        return roomRepository.findAll()
                .stream()
                .map(RoomMapper::toResponse)
                .toList();
    }

    @Override
    public RoomResponse create(RoomRequest request) {

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() ->new AppException(ErrorCode.ROOMTYPE_NOT_FOUND));

        RoomInformation room = RoomMapper.toEntity(request, roomType);

        roomRepository.save(room);

        return RoomMapper.toResponse(room);
    }

    @Override
    public RoomResponse update(Long id, RoomRequest request) {

        RoomInformation room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOMTYPE_NOT_FOUND));

        room.setRoomNumber(request.getRoomNumber());
        room.setRoomType(roomType);

        roomRepository.save(room);

        return RoomMapper.toResponse(room);
    }

    @Override
    public void delete(Long id) {

        RoomInformation room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (room.getBookingDetails().isEmpty()) {
            roomRepository.delete(room);
        } else {
            room.setStatus(RoomStatus.UNAVAILABLE);
            roomRepository.save(room);
        }
    }
}