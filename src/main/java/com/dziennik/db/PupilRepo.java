package com.dziennik.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dziennik.model.Pupil;

@Repository
public interface PupilRepo extends JpaRepository<Pupil, Long> {

	List<Pupil> findByIdschoolclass(Long classId);
}
