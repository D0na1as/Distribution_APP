package Distribution.APP.client.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Cart extends Core{

    private long itemId;
    private int count;

    public Cart() {
    }

    public Cart(long itemId, int count) {
        this.itemId = itemId;
        this.count = count;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
