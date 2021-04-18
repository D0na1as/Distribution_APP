package Distribution.APP.client.Config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

@Component
public class SecurityHandler implements AuthenticationSuccessHandler {

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

        if (roles.contains(Roles.user.name())) {
            redirectStrategy.sendRedirect(request, response, "/user/");
        } else if (roles.contains(Roles.client.name())) {
            redirectStrategy.sendRedirect(request, response, "/client/");
        }
    }

}
