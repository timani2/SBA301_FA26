package fu.se.sba301.phongtt.lab4orchid.services;

import fu.se.sba301.phongtt.lab4orchid.pojos.Orchid;
import fu.se.sba301.phongtt.lab4orchid.repositories.OrchidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OrchidService implements IOrchidService {

    @Autowired
    private OrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(int orchidID, Orchid orchid) {
        Optional<Orchid> existing = orchidRepository.findById(orchidID);
        if(existing.isPresent()){
            Orchid o = existing.get();
            o.setOrchidName(orchid.getOrchidName());
            o.setOrchidDescription(orchid.getOrchidDescription());
            o.setOrchidCategory(orchid.getOrchidCategory());
            o.setOrchidURL(orchid.getOrchidURL());
            o.setIsNatural(orchid.getIsNatural());
            o.setIsAttractive(orchid.getIsAttractive());
            return orchidRepository.save(o);
        }
        return null;
    }

    @Override
    public void deleteOrchid(int orchidID) {
        orchidRepository.deleteById(orchidID);
    }

    @Override
    public Orchid getOrchidByID(int id) {
        return orchidRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy hoa lan với ID: " + id));
    }
}
