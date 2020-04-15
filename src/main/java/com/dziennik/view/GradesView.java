package com.dziennik.view;

public class GradesView {

	private String subject;
	private String grades;
	private double average;
	
	public GradesView() {
	}

	public GradesView(String subject, String grades, double average) {
		this.subject = subject;
		this.grades = grades;
		this.average = average;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
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
		return "GradesView [subject=" + subject + ", grades=" + grades + ", average=" + average + "]";
	}
}
