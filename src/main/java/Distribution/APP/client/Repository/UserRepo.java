package Distribution.APP.client.Repository;

import Distribution.APP.client.Config.OrderStatus;
import Distribution.APP.client.Model.Account;
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
public class UserRepo {

    @Value("${BASE_URL}")
    private  String BASE_URL;

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    RestTemplate restTemplate;

    //Getting page from API
    public List<Item> getPage(int page, int count) {
        String buildURL = BASE_URL + "/storage/page/"+ page +"?count="+ count;
        List<Item> items = getAllItemsReq(buildURL);
        return items;
    }

    public List<Item> getPage(int page, int count, String search) {
        String buildURL = BASE_URL + "/storage/page/"+ search +"/"+ page +"?count="+ count;
        return getAllItemsReq(buildURL);
    }

    //Get Item Count
    public long getItemCount() {
        String buildURL = BASE_URL + "/storage/item/count";
        return getInt(buildURL);
    }

    //Get Item Count
    public long getItemCount(String search) {
        String buildURL = BASE_URL + "/storage/item/count/"+search;
        return getInt(buildURL);
    }

    //Get Delivery list
    public List<Delivery> getDelivery(OrderStatus status) {
        String buildUrl =  BASE_URL + "/order/status/"+status;
        return getDeliveryReq(buildUrl);
    }

    //Get user Account
    public Account getAccount(String user) {
        String buildUrl =  BASE_URL + "/account/"+user;
        return getAccountReq(buildUrl);
    }

    //Call API to get items list
    private List<Item> getAllItemsReq(String url) {
        ResponseEntity<Item[]> response = restTemplate.getForEntity(url, Item[].class);
        ArrayList<Item> list = new ArrayList<>(Arrays.asList(response.getBody()));
        return list;
    }

    //Call API to get int
    private long getInt(String url) {
        ResponseEntity<Long> response = restTemplate.getForEntity(url, Long.class, 1);
        if(response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else {
            return 0;
        }
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

    //Call API to get delivery list
    private List<Delivery> getDeliveryReq(String url) {
        ResponseEntity<Delivery[]> response = restTemplate.getForEntity(url, Delivery[].class);
        ArrayList<Delivery> list = new ArrayList<>(Arrays.asList(response.getBody()));
        return list;
    }

}
