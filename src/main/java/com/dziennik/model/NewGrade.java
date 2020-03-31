package com.dziennik.model;

public class NewGrade {
	
	private Long idpupil;
	private Long idclass;
	private Long idsubject;
	private double grade;
	
	public NewGrade() {
	}

	public NewGrade(Long idpupil, Long idclass, Long idsubject, double grade) {
		this.idpupil = idpupil;
		this.idclass = idclass;
		this.idsubject = idsubject;
		this.grade = grade;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public Long getIdclass() {
		return idclass;
	}

	public void setIdclass(Long idclass) {
		this.idclass = idclass;
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
		return "NewGrade [idpupil=" + idpupil + ", idclass=" + idclass + ", idsubject=" + idsubject + ", grade=" + grade
				+ "]";
	}
}
