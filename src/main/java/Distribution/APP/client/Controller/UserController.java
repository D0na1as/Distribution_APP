package Distribution.APP.client.Controller;

import Distribution.APP.client.Model.Item;
import Distribution.APP.client.Service.ClientService;
import Distribution.APP.client.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.util.List;

@Controller
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
        List<Item> items = userSrv.getPage(page, count);
        int lastPage = userSrv.getLastPage(count);
        model.addAttribute("items", items);
        model.addAttribute("countSelected", count);
        model.addAttribute("countList", countList);
        model.addAttribute("pageSelected", page);
        model.addAttribute("lastPage", lastPage);

        return "user/user";
    }

}
