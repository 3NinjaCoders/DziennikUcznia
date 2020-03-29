package com.dziennik.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Grade {

	@Id
	@GeneratedValue
	private Long id;
	private Long idpupil;
	private Long idsubject;
	private double grade;
	
	public Grade() {
	}

	public Grade(Long idpupil, Long idsubject, double grade) {
		this.idpupil = idpupil;
		this.idsubject = idsubject;
		this.grade = grade;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public Long getIdsubject() {
		return idsubject;
	}

	public void setIdsubject(Long idsubject) {
		this.idsubject = idsubject;
	}

	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}

	@Override
	public String toString() {
		return "Grade [id=" + id + ", idpupil=" + idpupil + ", idsubject=" + idsubject + ", grade=" + grade + "]";
	}
}
