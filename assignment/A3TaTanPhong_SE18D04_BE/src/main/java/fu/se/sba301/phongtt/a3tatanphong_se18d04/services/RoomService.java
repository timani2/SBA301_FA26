package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomResponse;

import java.util.List;

public interface RoomService {

    List<RoomResponse> getAll();

    RoomResponse create(RoomRequest request);

    RoomResponse update(Long id, RoomRequest request);

    void delete(Long id);
}