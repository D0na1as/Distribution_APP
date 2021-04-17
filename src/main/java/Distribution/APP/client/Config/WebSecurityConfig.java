//package Distribution.APP.client.Config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import javax.sql.DataSource;
//
//@Configuration
//@EnableWebSecurity
////@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Autowired
//    DataSource dataSource;
//    @Value("${users.table}")
//    private String table;
//    @Autowired
//    SecurityHandler successHandler;
//    @Autowired
//    UnauthenticatedHandler unAuthHandler;
//
//    @Override
//    protected void configure(final HttpSecurity http) throws Exception {
////        http
////                .authorizeRequests()
////                .antMatchers("/user*").hasRole(Roles.user.name())
////                .antMatchers("/client*").hasRole(Roles.client.name())
////                .antMatchers("/*").permitAll()
////                .antMatchers("/css/**").permitAll()
////                .antMatchers("/script/**").permitAll()
////                .anyRequest().authenticated()
////                .and().exceptionHandling().accessDeniedPage("/error/403.html")
////                .and().exceptionHandling().authenticationEntryPoint(unAuthHandler)
////                .and()
////                    .formLogin()
////                    .loginPage("/")
////                        .usernameParameter("username").passwordParameter("password")
////                .successHandler(successHandler)
////                .failureUrl("/?error=true")
////                .and()
////                .logout()
////                .permitAll()
////                .and();
//
//        http.authorizeRequests().antMatchers("/").permitAll();
//    }
//
//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
////        auth.jdbcAuthentication().dataSource(dataSource)
////                .usersByUsernameQuery("SELECT username, password, enabled FROM "+table+" WHERE username=?")
////                .authoritiesByUsernameQuery("SELECT username, role FROM "+table+" WHERE username=?");
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//
//}
