package Distribution.APP.client.Controller;

import Distribution.APP.client.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    ClientService clientSrv;

    @GetMapping("/")
    public String check(Model model) {
        return "user/user";
    }

}
