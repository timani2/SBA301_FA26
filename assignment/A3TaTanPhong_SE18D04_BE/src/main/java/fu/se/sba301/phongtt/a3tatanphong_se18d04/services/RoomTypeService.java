package fu.se.sba301.phongtt.a3tatanphong_se18d04.services;

import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.request.RoomTypeRequest;
import fu.se.sba301.phongtt.a3tatanphong_se18d04.dto.response.RoomTypeResponse;

import java.util.List;

public interface RoomTypeService {

    List<RoomTypeResponse> getAll();

    RoomTypeResponse getById(Long id);

    RoomTypeResponse create(RoomTypeRequest request);

    RoomTypeResponse update(Long id, RoomTypeRequest request);

    void delete(Long id);
}