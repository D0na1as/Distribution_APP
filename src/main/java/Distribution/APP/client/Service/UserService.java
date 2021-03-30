package Distribution.APP.client.Service;

import Distribution.APP.client.Model.Item;
import Distribution.APP.client.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public List<Item> getPage(int page, int count) {
        return userRepo.getPage(page, count);
    }

    public int getLastPage(int count) {
        long items = userRepo.getItemCount();
        if ( items < count) {
            return 1;
        } else if ( items % count == 0) {
            return (int) (items/count);
        } else return (int) (items/count)+1;
    }
}
