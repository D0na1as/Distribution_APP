package Distribution.APP.client.Controller;

import Distribution.APP.client.Config.OrderStatus;
import Distribution.APP.client.Model.Account;
import Distribution.APP.client.Model.Cart;
import Distribution.APP.client.Model.Delivery;
import Distribution.APP.client.Model.Item;
import Distribution.APP.client.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/client")
public class ClientController {

    @Value("#{'${count_per_page}'.split(',')}")
    private List<Integer> countList;
    @Autowired
    private ClientService clientSrv;


    @GetMapping( value = "/" )
    public String getStart(Model model)  {

        List<Item> items = clientSrv.getPage(1, 25);
        int lastPage = clientSrv.getLastPage(25);
        List<Cart> cart = clientSrv.getCart();
        model.addAttribute("cartCount", cart.size());
        model.addAttribute("items", items);
        model.addAttribute("countSelected", 25);
        model.addAttribute("countList", countList);
        model.addAttribute("pageSelected", 1);
        model.addAttribute("lastPage", lastPage);

        return "client/client";
    }

    @GetMapping( value = "/page" )
    public String getPage(@RequestParam("page") int page,
                          @RequestParam("count") int count,
                          Model model)  {

        int lastPage = clientSrv.getLastPage(count);
        List<Item> items;
        if (page>lastPage) {
            items = clientSrv.getPage(lastPage, count);
            model.addAttribute("pageSelected", lastPage);
        } else {
            items = clientSrv.getPage(page, count);
            model.addAttribute("pageSelected", page);
        }
        List<Cart> cart = clientSrv.getCart();
        model.addAttribute("cartCount", cart.size());
        model.addAttribute("items", items);
        model.addAttribute("countSelected", count);
        model.addAttribute("countList", countList);
        model.addAttribute("lastPage", lastPage);

        return "client/client";
    }

    @GetMapping( value = "/cart" )
    public String getCart(Model model)  {

        List<Item> cart = clientSrv.getCartItems();
        model.addAttribute("cart", cart);
        model.addAttribute("cartCount", cart.size());

        return "client/cart";
    }


    @GetMapping( value = "/deliveries" )
    public String getDeliveries(Model model)  {

        List<Delivery> pending = clientSrv.getDeliveries(OrderStatus.pending);
        List<Delivery> shipped = clientSrv.getDeliveries(OrderStatus.shipped);
        List<Delivery> received = clientSrv.getDeliveries(OrderStatus.received);
        List<Delivery> canceled = clientSrv.getDeliveries(OrderStatus.canceled);
        List<Delivery> returned = clientSrv.getDeliveries(OrderStatus.returned);
        List<Cart> cart = clientSrv.getCart();

        model.addAttribute("cartCount", cart.size());
        model.addAttribute("pending", pending);
        model.addAttribute("shipped", shipped);
        model.addAttribute("received", received);
        model.addAttribute("canceled", canceled);
        model.addAttribute("returned", returned);

        return "client/deliveries";
    }

    @GetMapping( value = "/account" )
    public String getAccount(Model model)  {

        Account account = clientSrv.getAccount("client@gmail.com");
        List<Cart> cart = clientSrv.getCart();
        model.addAttribute("cartCount", cart.size());
        model.addAttribute("account", account);

        return "client/account";
    }

}
