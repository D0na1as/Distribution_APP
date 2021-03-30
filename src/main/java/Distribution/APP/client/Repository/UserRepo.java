package Distribution.APP.client.Repository;

import Distribution.APP.client.Model.Item;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
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
        String buildURL = BASE_URL + "/page/"+ page +"?count="+ count;
        List<Item> items = getAllItemsReq(buildURL);
        return items;
    }

    //Get Item Count
    public long getItemCount() {
        String buildURL = BASE_URL + "/item/count";
        return getInt(buildURL);
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

}
