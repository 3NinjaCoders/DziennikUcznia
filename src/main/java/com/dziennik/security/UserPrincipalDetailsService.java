package com.dziennik.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.dziennik.db.UserRepo;
import com.dziennik.model.UserAuth;

@Service
public class UserPrincipalDetailsService implements UserDetailsService {
	private UserRepo userRepo;
	
	public UserPrincipalDetailsService(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
		UserAuth user = this.userRepo.findByUsername(s);
	
		if(user == null)
			throw new UsernameNotFoundException("username " + s +" doesn't exist");
		return new UserAutPrinciple(user);
	}
	
}
