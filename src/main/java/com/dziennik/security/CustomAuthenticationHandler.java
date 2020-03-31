package com.dziennik.security;

import java.io.IOException;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

@Configuration
public class CustomAuthenticationHandler extends SimpleUrlAuthenticationSuccessHandler {
	 
	 @Override
	 public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
	      String pupilTargetUrl = "/pupil/setsession";
	      String teacherTargetUrl = "/teacher/setsession";
	      Set<String> roles = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
	      if (roles.contains("ROLE_TEACHER")) {
	         getRedirectStrategy().sendRedirect(request, response, teacherTargetUrl);
	      } else if (roles.contains("ROLE_PUPIL")) {
	         getRedirectStrategy().sendRedirect(request, response, pupilTargetUrl);
	      } else {
	         super.onAuthenticationSuccess(request, response, authentication);
	         return;
	      }
	   }
	}