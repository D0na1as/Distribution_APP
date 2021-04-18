package Distribution.APP.client.Controller;

import Distribution.APP.client.Config.OrderStatus;
import Distribution.APP.client.Model.Account;
import Distribution.APP.client.Model.Delivery;
import Distribution.APP.client.Model.Item;
import Distribution.APP.client.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@PreAuthorize("hasAuthority('user')")
@RequestMapping("/user")
public class UserController {

    @Value("#{'${count_per_page}'.split(',')}")
    private List<Integer> countList;
    @Autowired
    private UserService userSrv;


    @GetMapping( value = "/" )
    public String getStart(Model model)  {
        List<Item> items = userSrv.getPage(1, 25);
        int lastPage = userSrv.getLastPage(25);
        List<Delivery> orders = userSrv.getDeliveries(OrderStatus.pending);
        model.addAttribute("ordersCount", orders.size());
        model.addAttribute("items", items);
        model.addAttribute("countSelected", 25);
        model.addAttribute("countList", countList);
        model.addAttribute("pageSelected", 1);
        model.addAttribute("lastPage", lastPage);
        return "user/user";
    }

    @GetMapping( value = "/page" )
    public String getPage(@RequestParam("page") int page,
                          @RequestParam("count") int count,
                          Model model)  {
        int lastPage = userSrv.getLastPage(count);
        List<Item> items;
        if (page>lastPage) {
            items = userSrv.getPage(lastPage, count);
            model.addAttribute("pageSelected", lastPage);
        } else {
            items = userSrv.getPage(page, count);
            model.addAttribute("pageSelected", page);
        }
        List<Delivery> orders = userSrv.getDeliveries(OrderStatus.pending);
        model.addAttribute("ordersCount", orders.size());
        model.addAttribute("items", items);
        model.addAttribute("countSelected", count);
        model.addAttribute("countList", countList);
        model.addAttribute("lastPage", lastPage);

        return "user/user";
    }

    @GetMapping( value = "/page/search" )
    public String getSearchResult(@RequestParam("page") int page,
                                  @RequestParam("count") int count,
                                  @RequestParam("value") String search,
                                  Model model)  {

        if (search.isEmpty()) {
            return "redirect:/user/";
        }
        int lastPage = userSrv.getLastSearchPage(search, count);
        List<Item> items;
        if (lastPage==0 || search.isEmpty()) {
            lastPage = 1;
            items = new ArrayList<>();
            model.addAttribute("pageSelected", lastPage);
        } else if (page>lastPage) {
            items = userSrv.getPage(lastPage, count, search);
            model.addAttribute("pageSelected", lastPage);
        } else {
            items = userSrv.getPage(page, count, search);
            model.addAttribute("pageSelected", page);
        }
        List<Delivery> orders = userSrv.getDeliveries(OrderStatus.pending);
        model.addAttribute("ordersCount", orders.size());
        model.addAttribute("items", items);
        model.addAttribute("searchVal", search);
        model.addAttribute("countSelected", count);
        model.addAttribute("countList", countList);
        model.addAttribute("lastPage", lastPage);

        return "user/search";
    }

    @GetMapping( value = "/orders" )
    public String getOrders(Model model)  {

        List<Delivery> list = userSrv.getDeliveries(OrderStatus.pending);

        model.addAttribute("ordersCount", list.size());
        model.addAttribute("orders", list);

        return "user/orders";
    }

    @GetMapping( value = "/deliveries" )
    public String getDeliveries(Model model)  {

        List<Delivery> shipped = userSrv.getDeliveries(OrderStatus.shipped);
        List<Delivery> received = userSrv.getDeliveries(OrderStatus.received);
        List<Delivery> canceled = userSrv.getDeliveries(OrderStatus.canceled);
        List<Delivery> returned = userSrv.getDeliveries(OrderStatus.returned);
        List<Delivery> orders = userSrv.getDeliveries(OrderStatus.pending);

        model.addAttribute("ordersCount", orders.size());
        model.addAttribute("shipped", shipped);
        model.addAttribute("received", received);
        model.addAttribute("canceled", canceled);
        model.addAttribute("returned", returned);

        return "user/deliveries";
    }

    @GetMapping( value = "/account" )
    public String getAccount(Model model)  {

        List<Delivery> list = userSrv.getDeliveries(OrderStatus.pending);
        Account account = userSrv.getAccount(getUsername());

        model.addAttribute("ordersCount", list.size());
        model.addAttribute("account", account);

        return "user/account";
    }

    //Get current username
    private static String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
