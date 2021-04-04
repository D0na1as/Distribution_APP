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
import java.util.ArrayList;
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
        int lastPage = userSrv.getLastPage(count);
        List<Item> items;
        if (page>lastPage) {
            items = userSrv.getPage(lastPage, count);
            model.addAttribute("pageSelected", lastPage);
        } else {
            items = userSrv.getPage(page, count);
            model.addAttribute("pageSelected", page);
        }
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

        int lastPage = userSrv.getLastSearchPage(search, count);
        List<Item> items;
        if (lastPage==0 || search.isEmpty()) {
            //return "redirect:/user/";
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
        model.addAttribute("items", items);
        model.addAttribute("searchVal", search);
        model.addAttribute("countSelected", count);
        model.addAttribute("countList", countList);
        model.addAttribute("lastPage", lastPage);

        return "user/search";
    }


}
