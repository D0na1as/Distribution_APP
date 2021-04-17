package Distribution.APP.client.Model;

import Distribution.APP.client.Config.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Delivery extends Core{

    private String client;
    private OrderStatus status;

    public Delivery() {
    }

    public Delivery(String client, OrderStatus status) {
        this.client = client;
        this.status = status;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }
}
