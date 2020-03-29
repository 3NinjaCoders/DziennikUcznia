package com.dziennik.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dziennik.model.SchoolClass;

@Repository
public interface SchoolClassRepo extends JpaRepository<SchoolClass, Long> {

}
