package com.dziennik.view;

public class ClassView {

	private Long idpupil;
	private String name;
	private String grades;
	private double average;
	
	public ClassView() {
	}

	public ClassView(Long idpupil, String name, String grades, double average) {
		super();
		this.idpupil = idpupil;
		this.name = name;
		this.grades = grades;
		this.average = average;
	}

	public Long getIdpupil() {
		return idpupil;
	}

	public void setIdpupil(Long idpupil) {
		this.idpupil = idpupil;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGrades() {
		return grades;
	}

	public void setGrades(String grades) {
		this.grades = grades;
	}

	public double getAverage() {
		return average;
	}

	public void setAverage(double average) {
		this.average = average;
	}

	@Override
	public String toString() {
		return "ClassView [idpupil=" + idpupil + ", name=" + name + ", grades=" + grades + ", average=" + average + "]";
	}
}
