package com.dziennik.db;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dziennik.model.Grade;

@Repository
public interface GradeRepo extends JpaRepository<Grade, Long> {

	List<Grade> findByIdpupil(Long idpupil);
	
	@Query(value = "From Grade where idpupil=:idpupil and idsubject=:idsubject")
	List<Grade> findPupilSubjectGrade(@Param("idpupil")Long idpupil, @Param("idsubject")Long idsubject);
	
	@Query(value = "select distinct g.idsubject From Grade g where idpupil=:idpupil")
	List<Long> getPupilDistinctSubject(Long idpupil);
}
