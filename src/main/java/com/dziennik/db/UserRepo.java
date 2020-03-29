package com.dziennik.db;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dziennik.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

}
