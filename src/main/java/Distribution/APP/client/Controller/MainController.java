package Distribution.APP.client.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @GetMapping( value = "/" )
    public String index(@RequestParam(value = "error", required = false) boolean error,
                        Model model)  {

        model.addAttribute("error", error);

        return "login";
    }
}
