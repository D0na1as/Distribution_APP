package Distribution.APP.client.Service;

import Distribution.APP.client.Config.OrderStatus;
import Distribution.APP.client.Model.Account;
import Distribution.APP.client.Model.Cart;
import Distribution.APP.client.Model.Delivery;
import Distribution.APP.client.Model.Item;
import Distribution.APP.client.Repository.ClientRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClientService {


    @Autowired
    private ClientRepo clientRepo;

    public List<Item> getPage(int page, int count) {
        return clientRepo.getPage(page, count);
    }

    public List<Item> getPage(int page, int count, String search) {
        return clientRepo.getPage(page, count, search);
    }

    public int getLastPage(int count) {
        long items = clientRepo.getItemCount();
        if ( items < count) {
            return 1;
        } else if ( items % count == 0) {
            return (int) (items/count);
        } else return (int) (items/count)+1;
    }

    public int getLastSearchPage(String search, int count) {
        long items = clientRepo.getItemCount(search);
        if (items==0) {
            return 0;
        }else if ( items < count) {
            return 1;
        } else if ( items % count == 0) {
            return (int) (items/count);
        } else return (int) (items/count)+1;
    }

    public List<Cart> getCart() {
        return clientRepo.getCart();
    }

    public List<Item> getCartItems() {
        List<Cart> cart = getCart();
        List<Item> cartItems = new ArrayList<>();
        Item temp;
        for (Cart item:cart) {
            temp = clientRepo.getItem(item.getItemId());
            temp.setQuantity(item.getCount());
            cartItems.add(temp);
        }
        return cartItems;
    }

    public List<Delivery> getDeliveries(OrderStatus status) {
        return clientRepo.getDelivery(status);
    }

    public Account getAccount(String user) {
        return clientRepo.getAccount(user);
    }
}
