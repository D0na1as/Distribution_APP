package Distribution.APP.client.Repository;

import Distribution.APP.client.Config.OrderStatus;
import Distribution.APP.client.Model.Account;
import Distribution.APP.client.Model.Cart;
import Distribution.APP.client.Model.Delivery;
import Distribution.APP.client.Model.Item;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class ClientRepo {

    @Value("${CLIENT_URL}")
    private  String BASE_URL;

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    RestTemplate restTemplate;

    //Getting page from API
    public List<Item> getPage(int page, int count) {
        String buildURL = BASE_URL + "/storage/page/"+ page +"?count="+ count;
        List<Item> items = getItemsReq(buildURL);
        return items;
    }

    public List<Item> getPage(int page, int count, String search) {
        String buildURL = BASE_URL + "/storage/page/"+ search +"/"+ page +"?count="+ count;
        return getItemsReq(buildURL);
    }

    //Get Item Count
    public long getItemCount() {
        String buildURL = BASE_URL + "/storage/item/count";
        return getLong(buildURL);
    }

    //Get Item Count
    public long getItemCount(String search) {
        String buildURL = BASE_URL + "/storage/item/count/"+search;
        return getLong(buildURL);
    }

    //Get Item
    public Item getItem(long itemId) {
        String buildURL = BASE_URL + "/storage/item/"+ itemId;
        return getItemReq(buildURL);
    }

    //Get orders cart
    public List<Cart> getCart() {
        String buildURL = BASE_URL + "/cart/";
        return getCartItemsReq(buildURL);
    }
    public List<Delivery> getDelivery(String username, OrderStatus status) {
        String buildURL = BASE_URL + "/order/status/"+status+"?client="+username;
        return getDeliveryReq(buildURL);
    }

    //Get user Account
    public Account getAccount(String user) {
        String buildUrl =  BASE_URL + "/account/"+user;
        return getAccountReq(buildUrl);
    }

    //Call API to get items list
    private List<Item> getItemsReq(String url) {
        ResponseEntity<Item[]> response = restTemplate.getForEntity(url, Item[].class);
        ArrayList<Item> list = new ArrayList<>(Arrays.asList(response.getBody()));
        return list;
    }

    //Call API to get int
    private long getLong(String url) {
        ResponseEntity<Long> response = restTemplate.getForEntity(url, Long.class, 1);
        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            return 0;
        }
    }

    //Call API to get int
    private Item getItemReq(String url) {
        ResponseEntity<Item> response = restTemplate.getForEntity(url, Item.class, 1);
        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            return null;
        }
    }

    //Call API to get cart list
    private List<Cart> getCartItemsReq(String url) {
        ResponseEntity<Cart[]> response = restTemplate.getForEntity(url, Cart[].class);
        ArrayList<Cart> list = new ArrayList<>(Arrays.asList(response.getBody()));
        return list;
    }

    //Call API to get cart list
    private List<Delivery> getDeliveryReq(String url) {
        ResponseEntity<Delivery[]> response = restTemplate.getForEntity(url, Delivery[].class);
        ArrayList<Delivery> list = new ArrayList<>(Arrays.asList(response.getBody()));
        return list;
    }


    //Call API to get account
    private Account getAccountReq(String url) {
        ResponseEntity<Account> response = null;
        try {
            response = restTemplate.getForEntity(url, Account.class, 1);
        } catch (HttpClientErrorException ex) {
            return null;
        }
        return response.getBody();
    }
}
