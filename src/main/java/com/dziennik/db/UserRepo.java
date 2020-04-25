package com.dziennik.db;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dziennik.model.UserAuth;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<UserAuth, Long> {
	
	UserAuth findByUsername(String username);
	boolean existsByUsername(String username);

}
